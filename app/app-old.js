/*
 * Author: Chris Boler
 * christopher.boler@gmail.com
 * 8/15/2012
 * The concept of 'smack' was conceived years ago
 * by myself with the help of Joshua Lindsay widerightturns13@yahoo.com
 * Special thanks to Lacy Boler for help with issues, debugging, and rubber ducking
 * lacy.victoria@gmail.com
 */

/**
 * Player: Class containing information about the player
 */
function Player() {
    /**
     * Default option configuration
     */
    this.opts = {
        debug: false
    };
    this.wins = 0;
    this.hand = [];
    this.cardsOnTable = [];
    this.currentCard = '';

    /**
     * Initialization function that sets options
     * @param {Object} options: { debug }
     */
    this.init = function(options) {
        var self = this;
        // Apply options
        $.extend(true, self.opts, options);
        // Enable debug logging
        if (self.opts.debug) {
            self.log = function(str) {
                try { // prevent error
                    if (window.console !== undefined && window.console.log !== undefined) {
                        console.log(str);
                    }
                } catch (e) {
                    alert('[Player:' + self.number + '.Init Debug] logging not possible.');
                }
            };
            self.log('[Player:' + self.number + '.Init] Debugging enabled.');
        }
        self.log('wins: ' + options.wins);
        self.wins = options.wins;
        self.hand = [];
        self.cardsOnTable = [];
        self.currentCard = '';
        self.log('[Player:' + self.number + '.Init] Done.');
        return self;
    };
    /**
     * Overridden to perform console logging if options.debug is set to true.
     */
    this.log = function() {};
};

/**
 * Engine: engine for smack.
 * This engine expects you to lay out the game in HTML prior to initialization.
 * @param {Object} self: Engine
 * @param {Object} $: jQuery
 */
var Engine = (function(self, $) {
    /**
     * Default option configuration
     */
    var opts = {
        debug: false
    };

    self.setCookie = function(c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    };

    self.getCookie = function(c_name) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1) {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1) {
            c_value = null;
        } else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
    };

    /**
     * The set of unused cards that have yet to be dealt.
     */
    self.deck = [];

    /**
     * The set of used cards removed from play.
     */
    self.discard = [];

    /**
     * Game state variables
     */
    self.player = {};
    self.opponent = {};
    self.oCardsLeft = {};
    self.pCardsLeft = {};
    self.oDeck = {};
    self.pDeck = {};
    self.oDraw = {};
    self.pDraw = {};
    self.oChallenge = {};
    self.pChallenge = {};
    self.oB1 = {};
    self.pB1 = {};
    self.oB2 = {};
    self.pB2 = {};
    self.oB3 = {};
    self.pB3 = {};
    self.flavortext = {};
    self.pwins = {};
    self.owins = {};
    self.oCardsInPlay = {};
    self.pCardsInPlay = {};
    self.turns = 0;
    self.oBattleCards = [];
    self.pBattleCards = [];
    self.gameEnd = false;
    self.turnCount = {};
    self.inBattle = false;
    self.inChallenge = false;
    self.winMessages = [
        "It appears you've won.",
        "Good show.",
        "Congratulations.",
        "[POSITIVE ADJECTIVES]",
        "Wonderful.",
        "Amazing.",
        "Impressive.",
        "Awesome.",
        "Beautiful.",
        "ATTAGENDER.",
        "[AUDIBLE CLAPPING]",
        "Applause.",
        "Bravo.",
        "Take a bow.",
        "Encore.",
        "Three cheers.",
        "[VARIOUS EXCLAMATIONS]",
        "Woo - Hoo!",
        "Hooray.",
        "Yippee.",
        "Yee - haw!",
        "Hurrah.",
        "Huzzah.",
        "[GESTURES VAGUELY]",
        "Cheers.",
        "Hats off to you.",
        "Here's to you.",
        "[GOOD]",
        "Good for you.",
        "Good on you.",
        "Good job.",
        "Great job.",
        "Excellent job.",
        "Keep it up.",
        "Keep up the great work.",
        "Keep going.",
        "NICE!",
        "Nice.",
        "Noice!",
        "Noice brah!",
        "Nice work.",
        "Nice job.",
        "Nice one.",
        "Nice going.",
        "Nicely done.",
        "So pleased.",
        "So proud.",
        "So Proud!",
        "So thrilled for you.",
        "So tickled for you.",
        "Positively tickled pink.",
        "Way to go.",
        "Way to be.",
        "Way to shine.",
        "Well done.",
        "Well deserved.",
        "This calls for celebrating! Congratulations!"
    ];
    self.loseMessages = [
        "Ouch.",
        "That looked painful.",
        "You tried.",
        "Loser.",
        "Good luck to you.",
        "You're doing your Best.",
        "God bless you.",
        "Keep up the good work!.",
        "What did we learn?",
        "Your mother also doesn't take losing well.",
        "[VARIOUS EXCLAMATIONS]",
        "[GESTURES VAGUELY]",
        "You lose.",
        "Not very good at this are we?",
        "[DERISIVE QUOTE #3]",
        "Fix your face.",
        "Jealous?"
    ];
    self.challengeMessages = [
        "[GESTURES TRIUMPHANTLY]",
        "Mine.",
        "You only thought you won.",
        "Pick up your jaw.",
        "Let it go.",
        "HA!",
        "Ha Ha!",
        "Eat it, suckah!",
        "You like that!?"
    ];
    self.playerChallengeMessages = [
        "That takes guts.",
        "[GESTURES Angrily]",
        "*GASP* Challenge!?",
        "Just can't let it go, can you?",
        "Is it worth it?",
        "What will it cost you?",
        "You really think you can win?",
        "It's just not in the cards.",
        "Go ahead and try.",
        "Play around and, find out."
    ];

    self.shake = function(n, element) {
        let me = element;
        if (me.moveBy) {
            for (i = 10; i > 0; i--) {
                for (j = n; j > 0; j--) {
                    me.moveBy(0, i);
                    me.moveBy(i, 0);
                    me.moveBy(0, -i);
                    me.moveBy(-i, 0);
                }
            }
        }
    };

    /**
     * Initialization function that sets options
     * @param {Object} options: { debug }
     */
    self.init = function(options) {
        // Apply options
        $.extend(true, opts, options);

        // Enable debug logging
        if (opts.debug) {
            self.log = function(str) {
                try { // prevent error
                    if (window.console !== undefined && window.console.log !== undefined) {
                        console.log(str);
                    }
                } catch (e) {
                    alert('[Engine.Init Debug] logging not possible.');
                }
            };
            self.log('[Engine.Init] Debugging enabled.');
        }

        self.oCardsLeft = $('#opponent-progressbar div');
        self.pCardsLeft = $('#player-progressbar div');
        self.oDeck = $('#oDeck');
        self.pDeck = $('#pDeck');
        self.oDraw = $('#oDraw');
        self.pDraw = $('#pDraw');
        self.oChallenge = $('#oChallenge');
        self.pChallenge = $('#pChallenge');
        self.oB1 = $('#oB1');
        self.pB1 = $('#pB1');
        self.oB2 = $('#oB2');
        self.pB2 = $('#pB2');
        self.oB3 = $('#oB3');
        self.pB3 = $('#pB3');
        self.flavortext = $('#flavortext');
        self.pwins = $('#player-wins');
        self.owins = $('#opponent-wins');
        self.oCardsInPlay = $('#opponent-cards-in-play');
        self.pCardsInPlay = $('#player-cards-in-play');
        self.turnCount = $('#turn-count');
        self.playerFrame = $('playerframe');
        self.gameEnd = false;
        self.turns = 1;
        self.currentTurn = 0;
        self.inBattle = false;
        self.inChallenge = false;

        self.initDeck();
        self.initPlayers();

        self.pCardsLeft.width(((self.player.hand.length / 26) * 100).toString() + '%');
        self.pCardsLeft.text(self.player.hand.length + '/26');
        self.oCardsLeft.width(((self.opponent.hand.length / 26) * 100).toString() + '%');
        self.oCardsLeft.text(self.opponent.hand.length + '/26');

        self.pDeck.click(function() {
            self.log('Player deck clicked.');
            if (self.turns === self.currentTurn && self.pDeck.hasClass('glowRed')) {
                self.pDraw.removeClass('glowGreen').removeClass('clickable');
                self.pDeck.removeClass('glowRed').removeClass('clickable');
                self.log('Player declined to challenge.');
                self.loseHand();
            } else {
                self.turns += 1;
                self.currentTurn = self.turns;
                self.log('turn: ' + self.turns);
                self.turnCount.text(self.turns);

                self.player.currentCard = self.player.hand.shift();
                self.opponent.currentCard = self.opponent.hand.shift();
                self.player.cardsOnTable.push(self.player.currentCard);
                self.opponent.cardsOnTable.push(self.opponent.currentCard);

                self.oCardsInPlay.text(self.opponent.cardsOnTable.length);
                self.pCardsInPlay.text(self.player.cardsOnTable.length);

                self.pDraw.slideDown('slow');
                self.setCard('#pDraw',
                    self.player.currentCard.split(' ')[0],
                    self.player.currentCard.split(' ')[1]);
                self.oDraw.slideDown('slow');
                self.setCard('#oDraw',
                    self.opponent.currentCard.split(' ')[0],
                    self.opponent.currentCard.split(' ')[1]);
                self.pDeck.removeClass('glow').removeClass('clickable');

                self.compareCards();
            }
        });

        self.pDraw.click(function() {
            self.log('Drawn card clicked.');
            self.flavortext.text(self.playerChallengeMessages[Math.floor(Math.random() * self.playerChallengeMessages.length)]);
            self.pDraw.removeClass('glowGreen').removeClass('clickable');
            self.pDeck.removeClass('glowRed').removeClass('clickable');

            // Challenge initiated
            self.player.currentCard = self.player.hand.shift();
            self.player.cardsOnTable.push(self.player.currentCard);

            self.oCardsInPlay.text(self.opponent.cardsOnTable.length);
            self.pCardsInPlay.text(self.player.cardsOnTable.length);

            // show card
            self.pChallenge.slideDown('slow');
            self.clearCard('#pChallenge');

            setTimeout(() => {
                // flip card and compare
                self.setCard('#pChallenge',
                    self.player.currentCard.split(' ')[0],
                    self.player.currentCard.split(' ')[1]);
                self.compareCards();
            }, 2000);
        });

        self.oB1.click(function() {
            self.opponent.currentCard = self.oBattleCards[0];
            self.player.currentCard = self.pBattleCards[Math.floor(Math.random() * self.pBattleCards.length)];
            self.resetBattleCards();
            self.setCard('#oB1',
                self.opponent.currentCard.split(' ')[0],
                self.opponent.currentCard.split(' ')[1]);
            self.highLightTargetedCard();
            self.compareCards();
        });

        self.oB2.click(function() {
            self.opponent.currentCard = self.oBattleCards[1];
            self.player.currentCard = self.pBattleCards[Math.floor(Math.random() * self.pBattleCards.length)];
            self.resetBattleCards();
            self.setCard('#oB2',
                self.opponent.currentCard.split(' ')[0],
                self.opponent.currentCard.split(' ')[1]);
            self.compareCards();
        });

        self.oB3.click(function() {
            self.opponent.currentCard = self.oBattleCards[2];
            self.player.currentCard = self.pBattleCards[Math.floor(Math.random() * self.pBattleCards.length)];
            self.resetBattleCards();
            self.setCard('#oB3',
                self.opponent.currentCard.split(' ')[0],
                self.opponent.currentCard.split(' ')[1]);
            self.compareCards();
        });

        self.play();

        self.log('Init Done.');
    };

    self.resetBattleCards = function() {
        let battleCards = [
            self.oB1,
            self.oB2,
            self.oB3
        ];
        battleCards.forEach((element, index) => {
            element.removeClass('glowGreen').removeClass('clickable');
        });
    };

    self.highLightTargetedCard = function() {
        let attackedCard = self.pBattleCards.indexOf(self.player.currentCard);
        switch (attackedCard) {
            case 0:
                self.oB1.addClass('glowRed');
                break;
            case 1:
                self.oB2.addClass('glowRed');
                break;
            default:
                self.oB3.addClass('glowRed');
                break;
        }
    };

    self.initDeck = function() {
        self.discard = [];
        self.deck = [
            'spades 1',
            'spades 2',
            'spades 3',
            'spades 4',
            'spades 5',
            'spades 6',
            'spades 7',
            'spades 8',
            'spades 9',
            'spades 10',
            'spades 11',
            'spades 12',
            'spades 13',
            'clubs 1',
            'clubs 2',
            'clubs 3',
            'clubs 4',
            'clubs 5',
            'clubs 6',
            'clubs 7',
            'clubs 8',
            'clubs 9',
            'clubs 10',
            'clubs 11',
            'clubs 12',
            'clubs 13',
            'diams 1',
            'diams 2',
            'diams 3',
            'diams 4',
            'diams 5',
            'diams 6',
            'diams 7',
            'diams 8',
            'diams 9',
            'diams 10',
            'diams 11',
            'diams 12',
            'diams 13',
            'hearts 1',
            'hearts 2',
            'hearts 3',
            'hearts 4',
            'hearts 5',
            'hearts 6',
            'hearts 7',
            'hearts 8',
            'hearts 9',
            'hearts 10',
            'hearts 11',
            'hearts 12',
            'hearts 13'
        ];
    };

    /**
     * Array shuffling function from
     * http://bost.ocks.org/mike/shuffle/
     * Credit goes to Mike Bostock 
     * (http://bost.ocks.org/mike/)
     * for the implementation
     * of the Fisher-Yates shuffle.
     * @param {array} array: the array to shuffle
     */
    self.shuffle = function shuffle(array) {
        var m = array.length,
            t, i;
        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    };

    /**
     * Begins the game
     */
    self.play = function() {
        self.log('Updating screen text and clearing up for next turn.');

        let visualElementsToReset = [
            self.oDeck,
            self.pDeck,
            self.oDraw,
            self.pDraw,
            self.oChallenge,
            self.pChallenge,
            self.oB1,
            self.pB1,
            self.oB2,
            self.pB2,
            self.oB3,
            self.pB3
        ];
        visualElementsToReset.forEach((element, index) => {
            if (index <= 1) {
                element.removeClass('glow')
                    .removeClass('glowGreen')
                    .removeClass('clickable');
            } else {
                element.removeClass('glow')
                    .removeClass('glowGreen')
                    .removeClass('glowRed')
                    .removeClass('clickable')
                    .fadeOut('slow');
            }
        });

        self.pwins.text(self.player.wins);
        self.owins.text(self.opponent.wins);
        self.oCardsInPlay.text(self.opponent.cardsOnTable.length);
        self.pCardsInPlay.text(self.player.cardsOnTable.length);
        self.turnCount.text(self.turns);
        self.flavortext.text("Click your deck to draw.");
        self.pDeck.addClass('glow').addClass('clickable');
        self.inChallenge = false;
        self.inBattle = false;
    };

    /**
     * Initializes and returns a player
     * @param {*} player 
     */
    self.initPlayers = function() {
        let playerWins = self.player.wins;
        let opponentWins = self.opponent.wins;
        self.player = new Player();
        self.player.init({ wins: playerWins || 0 });
        const half = Math.ceil(self.deck.length / 2);
        const redHalfOfDeck = self.deck.splice(half, half);
        self.player.hand = self.player.hand.concat(redHalfOfDeck);
        self.player.hand = self.shuffle(self.player.hand);

        self.opponent = new Player({ wins: opponentWins || 0 });
        self.opponent.init({ wins: opponentWins || 0 });
        self.opponent.hand = self.opponent.hand.concat(self.deck.splice(0, self.deck.length));
        self.opponent.hand = self.shuffle(self.opponent.hand);
    };

    /**
     * Compare two cards and return a result
     */
    self.compareCards = function() {
        self.log('[compareCards]');
        let playerCardValue = self.player.currentCard.split(' ')[1];
        let opponentCardValue = self.opponent.currentCard.split(' ')[1];

        // if card values are the same
        if (playerCardValue === opponentCardValue) {
            // draw the next 3 and put them in the B slots for each player
            self.initBattle();
        }
        // If player 1 pulled an ace
        else if (playerCardValue === '1') {
            // if opponent's card is anything other than 2, win
            if (opponentCardValue === '2') {
                // no challenge--Player loses
                self.loseHand();
            }
            self.winHand();
        }
        // If player 2 pulled an ace
        else if (opponentCardValue === '1') {
            // if opponent's card is anything other than 2, win
            if (playerCardValue === '2') {
                // no challenge--Opponent loses
                self.winHand();
            }
            self.loseHand();
        }
        // Player wins, Opponent can challenge 
        else if (parseInt(playerCardValue) > parseInt(opponentCardValue)) {
            self.log('Opponent can challenge.');
            // Determine probabilities that Opponent might challenge
            let challengeProbability = Math.floor(Math.random() * (20 - 1) + 1);
            if (self.turns === self.currentTurn &&
                !self.inChallenge &&
                !self.inBattle &&
                opponentCardValue + challengeProbability > 10) {

                self.log('Opponent decided to challenge.');
                self.inChallenge = true;
                self.flavortext.text(self.challengeMessages[Math.floor(Math.random() * self.challengeMessages.length)]);
                self.opponent.currentCard = self.opponent.hand.shift();
                self.opponent.cardsOnTable.push(self.opponent.currentCard);

                // show the opponent's card
                self.oChallenge.slideDown('slow');
                self.clearCard('#oChallenge');

                setTimeout(() => {
                    self.setCard('#oChallenge',
                        self.opponent.currentCard.split(' ')[0],
                        self.opponent.currentCard.split(' ')[1]);
                    self.compareCards();
                }, 2000);
            } else {
                // If no challenge
                self.winHand();
            }
        }
        // Opponent wins, Player can challenge
        else {
            if (!self.inBattle &&
                !self.inChallenge &&
                self.turns === self.currentTurn) {

                self.flavortext.text("You can challenge, click your deck to ignore and accept defeat.");
                self.pDraw.addClass('glowGreen').addClass('clickable');
                self.pDeck.addClass('glowRed').addClass('clickable');
                self.log('Player can challenge.');
            } else {
                self.loseHand();
            }
        }
    };

    self.winHand = function() {
        // apply visual effects
        self.pDraw.addClass('glowGreen');
        self.oDraw.addClass('glowRed');
        self.flavortext.text(self.winMessages[Math.floor(Math.random() * self.winMessages.length)]);
        self.shake(2, self.playerFrame);
        self.oDraw.fadeOut('slow');
        self.pDraw.fadeOut('slow');

        self.oCardsLeft.width((((self.opponent.hand.length - 1) / 26) * 100).toString() + '%');
        self.oCardsLeft.text(self.opponent.hand.length + '/26');

        // give player cards back
        self.player.hand = self.player.hand.concat(self.player.cardsOnTable);
        self.discard = self.discard.concat(self.opponent.cardsOnTable);
        self.player.cardsOnTable = [];
        self.opponent.cardsOnTable = [];
        if (self.opponent.hand.length < 1) {
            self.winGame();
        }

        setTimeout(() => {
            self.play();
        }, 5000);
    };

    self.loseHand = function() {
        // apply visual effects
        self.pDraw.addClass('glowRed');
        self.oDraw.addClass('glowGreen');
        self.flavortext.text(self.loseMessages[Math.floor(Math.random() * self.loseMessages.length)]);
        self.shake(2, self.playerFrame);
        self.oDraw.fadeOut('slow');
        self.pDraw.fadeOut('slow');

        self.pCardsLeft.width((((self.player.hand.length - 1) / 26) * 100).toString() + '%');
        self.pCardsLeft.text(self.player.hand.length + '/26');

        // give opponent cards back
        self.opponent.hand = self.opponent.hand.concat(self.opponent.cardsOnTable);
        self.discard = self.discard.concat(self.player.cardsOnTable);
        self.player.cardsOnTable = [];
        self.opponent.cardsOnTable = [];
        if (self.player.hand.length < 1) {
            self.loseGame();
        }

        setTimeout(() => {
            self.play();
        }, 5000);
    };

    self.winGame = function() {
        self.gameEnd = true;
        self.player.wins += 1;
        self.flavortext.text("You win!");
        if (confirm('Again?')) {
            self.init();
        }
    };

    self.loseGame = function() {
        self.gameEnd = true;
        self.opponent.wins += 1;
        self.flavortext.text("You lose!");
        if (confirm('Again?')) {
            self.init();
        }
    };

    self.initBattle = function() {
        // disable challenges
        if (self.opponent.hand.length < 3) {
            self.winGame();
        }
        if (self.player.hand.length < 3) {
            self.loseGame();
        }
        self.inBattle = true;
        self.oBattleCards = [];
        self.oBattleCards.push(self.opponent.hand.shift());
        self.oBattleCards.push(self.opponent.hand.shift());
        self.oBattleCards.push(self.opponent.hand.shift());
        self.opponent.cardsOnTable = self.opponent.cardsOnTable.concat(self.oBattleCards);

        self.pBattleCards = [];
        self.pBattleCards.push(self.player.hand.shift());
        self.pBattleCards.push(self.player.hand.shift());
        self.pBattleCards.push(self.player.hand.shift());
        self.player.cardsOnTable = self.player.cardsOnTable.concat(self.pBattleCards);

        self.oCardsInPlay.text(self.opponent.cardsOnTable.length);
        self.pCardsInPlay.text(self.player.cardsOnTable.length);

        // show opponent cards face down
        self.oB1.slideDown('slow', function() {
            $(this).addClass('glowGreen').addClass('clickable');
        });
        self.clearCard('#oB1');

        self.oB2.slideDown('slow', function() {
            $(this).addClass('glowGreen').addClass('clickable');
        });
        self.clearCard('#oB2');

        self.oB3.slideDown('slow', function() {
            $(this).addClass('glowGreen').addClass('clickable');
        });
        self.clearCard('#oB3');

        // show player cards face up so they can see what's on the line
        self.pB1.slideDown('slow');
        self.setCard('#pB1', self.pBattleCards[0].split(' ')[0], self.pBattleCards[0].split(' ')[1]);

        self.pB2.slideDown('slow');
        self.setCard('#pB2', self.pBattleCards[1].split(' ')[0], self.pBattleCards[1].split(' ')[1]);

        self.pB3.slideDown('slow');
        self.setCard('#pB3', self.pBattleCards[2].split(' ')[0], self.pBattleCards[2].split(' ')[1]);

        // Then wait for decision click done by picking a face-down opponent card
        self.flavortext.text("Select one of your opponent's cards.");
    };


    /**
     * Visually sets a card to a specific value in the face-up state.
     * @param {Object} card: CSS selector for the card element. (#cardId)
     * @param {Object} suite: 'spades' or 'clubs' or 'diams' or 'hearts'
     * @param {Object} value: 1-13 or 'ace' - 'king' or 'one' - 'thirteen'
     */
    self.setCard = function(card, suite, value) {
        if ($(card).length > 0 && (suite == 'spades' || suite == 'clubs' || suite == 'diams' || suite == 'hearts')) {
            $(card).empty();
            switch (value) {
                case 'ten':
                case '10':
                case 10:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">10<br/>&' + suite +
                        ';</div><div class="spotA1">&' +
                        suite +
                        ';</div><div class="spotA2">&' +
                        suite +
                        ';</div><div class="spotA4">&' +
                        suite +
                        ';</div><div class="spotA5">&' +
                        suite +
                        ';</div><div class="spotB2">&' +
                        suite +
                        ';</div><div class="spotB4">&' +
                        suite +
                        ';</div><div class="spotC1">&' +
                        suite +
                        ';</div><div class="spotC2">&' +
                        suite +
                        ';</div><div class="spotC4">&' +
                        suite +
                        ';</div><div class="spotC5">&' +
                        suite +
                        ';</div></div>');
                    break;
                case 'nine':
                case '9':
                case 9:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">9<br/>&' + suite +
                        ';</div><div class="spotA1">&' +
                        suite +
                        ';</div><div class="spotA2">&' +
                        suite +
                        ';</div><div class="spotA4">&' +
                        suite +
                        ';</div><div class="spotA5">&' +
                        suite +
                        ';</div><div class="spotB3">&' +
                        suite +
                        ';</div><div class="spotC1">&' +
                        suite +
                        ';</div><div class="spotC2">&' +
                        suite +
                        ';</div><div class="spotC4">&' +
                        suite +
                        ';</div><div class="spotC5">&' +
                        suite +
                        ';</div></div>');
                    break;
                case 'eight':
                case '8':
                case 8:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">8<br/>&' + suite +
                        ';</div><div class="spotA1">&' +
                        suite +
                        ';</div><div class="spotA3">&' +
                        suite +
                        ';</div><div class="spotA5">&' +
                        suite +
                        ';</div><div class="spotB2">&' +
                        suite +
                        ';</div><div class="spotB4">&' +
                        suite +
                        ';</div><div class="spotC1">&' +
                        suite +
                        ';</div><div class="spotC3">&' +
                        suite +
                        ';</div><div class="spotC5"> &' +
                        suite +
                        ';</div></div>');
                    break;
                case 'seven':
                case '7':
                case 7:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">7<br/>&' + suite +
                        ';</div><div class="spotA1">&' +
                        suite +
                        ';</div><div class="spotA3">&' +
                        suite +
                        ';</div><div class="spotA5">&' +
                        suite +
                        ';</div><div class="spotB2">&' +
                        suite +
                        ';</div><div class="spotC1">&' +
                        suite +
                        ';</div><div class="spotC3">&' +
                        suite +
                        ';</div><div class="spotC5">&' +
                        suite +
                        ';</div></div>');
                    break;
                case 'six':
                case '6':
                case 6:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">6<br/>&' + suite +
                        ';</div><div class="spotA1">&' +
                        suite +
                        ';</div><div class="spotA3">&' +
                        suite +
                        ';</div><div class="spotA5">&' +
                        suite +
                        ';</div><div class="spotC1">&' +
                        suite +
                        ';</div><div class="spotC3">&' +
                        suite +
                        ';</div><div class="spotC5">&' +
                        suite +
                        ';</div></div>');
                    break;
                case 'five':
                case '5':
                case 5:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">5<br/>&' + suite +
                        ';</div><div class="spotA1">&' +
                        suite +
                        ';</div><div class="spotA5">&' +
                        suite +
                        ';</div><div class="spotB3">&' +
                        suite +
                        ';</div><div class="spotC1">&' +
                        suite +
                        ';</div><div class="spotC5">&' +
                        suite +
                        ';</div></div>');
                    break;
                case 'four':
                case '4':
                case 4:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">4<br/>&' + suite +
                        ';</div><div class="spotA1">&' +
                        suite +
                        ';</div><div class="spotA5">&' +
                        suite +
                        ';</div><div class="spotC1">&' +
                        suite +
                        ';</div><div class="spotC5">&' +
                        suite +
                        ';</div></div>');
                    break;
                case 'three':
                case '3':
                case 3:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">3<br/>&' + suite +
                        ';</div><div class="spotB1">&' +
                        suite +
                        ';</div><div class="spotB3">&' +
                        suite +
                        ';</div><div class="spotB5">&' +
                        suite +
                        ';</div></div>');
                    break;
                case 'two':
                case '2':
                case 2:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">2<br/>&' + suite +
                        ';</div><div class="spotB1">&' +
                        suite +
                        ';</div><div class="spotB5">&' +
                        suite +
                        ';</div></div>');
                    break;
                case 'ace':
                case 'one':
                case '1':
                case 1:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">A<br/>&' + suite +
                        ';</div><div class="ace">&' +
                        suite +
                        ';</div></div>');
                    break;
                case 'jack':
                case 'eleven':
                case '11':
                case 11:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">J<br/>&' + suite +
                        ';</div><img class="face" src="res/jack.png" alt="" width="80" height="130" /><div class="spotA1">&' +
                        suite +
                        ';</div><div class="spotC5">&' +
                        suite +
                        ';</div></div>');
                    break;
                case 'queen':
                case 'twelve':
                case '12':
                case 12:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">Q<br/>&' + suite +
                        ';</div><img class="face" src="res/queen.png" alt="" width="80" height="130" /><div class="spotA1">&' +
                        suite +
                        ';</div><div class="spotC5">&' +
                        suite +
                        ';</div></div>');
                    break;
                case 'king':
                case 'thirteen':
                case '13':
                case 13:
                    $(card).html('<div class="front' + ((suite == 'diams' || suite == 'hearts') ? ' red' : '') + '"><div class="index">K<br/>&' + suite +
                        ';</div><img class="face" src="res/king.png" alt="" width="80" height="130" /><div class="spotA1">&' +
                        suite +
                        ';</div><div class="spotC5">&' +
                        suite +
                        ';</div></div>');
                    break;
                default:
                    self.log('[Engine.setCard] Defaulted.');
                    break;
            }
        }
    };

    /**
     * Visually clears a card, returning it to the face-down state.
     * @param {Object} card: CSS selector for the card element. (#cardId)
     */
    self.clearCard = function(card) {
        if ($(card).length > 0) {
            self.log('[Engine.clearCard] card cleared.');
            $(card).empty();
        }
    };

    /**
     * Overridden to perform console logging if options.debug is set to true.
     */
    self.log = function() {};

    return self;

}(Engine || {}, jQuery));