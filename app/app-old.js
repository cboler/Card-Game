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
    this.wins = 0;
    this.hand = [];
    this.cardsOnTable = [];
    this.currentCard = '';

    this.init = function(wins) {
        var self = this;
        self.wins = wins;
        self.hand = [];
        self.cardsOnTable = [];
        self.currentCard = '';
        return self;
    };
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

    /**
     * The set of unused cards that have yet to be dealt.
     */
    self.deck = [];

    /**
     * The set of used cards removed from play.
     */
    self.discard = [];

    /**
     * Players
     */
    self.player = {};
    self.opponent = {};

    /**
     * UI Elements
     */
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

    /**
     * Game state
     */
    self.turns = 0;
    self.oBattleCards = [];
    self.pBattleCards = [];
    self.turnCount = {};
    self.inBattle = false;
    self.inChallenge = false;

    /**
     * flavortext
     */
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

    /**
     * Shake an element
     * @param {int} n : times to shake
     * @param {Object} element: element to shake
     */
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
     * Initialization function
     */
    self.init = function() {
        // Grab elements with jquery
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

        self.turns = 1;
        self.currentTurn = 0;
        self.inBattle = false;
        self.inChallenge = false;

        self.initDeck();
        self.initPlayers();

        self.updateHealthBars();

        // Setup click functions
        self.pDeck.click(function() {
            if (self.pDeck.hasClass('clickable')) {
                console.log('Player deck clicked.');
                if (self.turns === self.currentTurn && self.pDeck.hasClass('glowRed')) {
                    self.pDraw.removeClass('glowGreen').removeClass('clickable');
                    self.pDeck.removeClass('glowRed').removeClass('clickable');
                    console.log('Player declined to challenge.');
                    self.loseHand(self.pDeck);
                } else {
                    self.currentTurn = self.turns;
                    console.log('turn: ' + self.turns);
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

                    self.compareCards(self.pDeck);
                }
            }
        });

        self.pDraw.click(function() {
            if (self.pDraw.hasClass('clickable')) {
                console.log('Drawn card clicked, challenge initiated.');
                self.flavortext.text(self.playerChallengeMessages[Math.floor(Math.random() * self.playerChallengeMessages.length)]);
                self.pDraw.removeClass('glowGreen').removeClass('clickable');
                self.pDeck.removeClass('glowRed').removeClass('clickable');

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
                    self.compareCards(self.pDraw);
                }, 2000);
            }
        });

        self.oB1.click(function() {
            if (self.oB1.hasClass('clickable')) {
                self.oB1.addClass('glow');
                self.opponent.currentCard = self.oBattleCards[0];
                let choice = Math.floor(Math.random() * self.pBattleCards.length);
                console.log(choice);
                self.player.currentCard = self.pBattleCards[Math.floor(choice)];

                let playerCardValue = self.player.currentCard.split(' ')[1];
                let opponentCardValue = self.opponent.currentCard.split(' ')[1];
                console.log(playerCardValue + ' vs ' + opponentCardValue);

                self.highLightTargetedCard();
                setInterval(() => {
                    self.setCard('#oB1',
                        self.opponent.currentCard.split(' ')[0],
                        self.opponent.currentCard.split(' ')[1]);
                    self.compareCards(self.oB1);
                }, 2000);
            }
        });

        self.oB2.click(function() {
            if (self.oB2.hasClass('clickable')) {
                self.oB2.addClass('glow');
                self.opponent.currentCard = self.oBattleCards[1];
                let choice = Math.floor(Math.random() * self.pBattleCards.length);
                console.log(choice);
                self.player.currentCard = self.pBattleCards[choice];

                let playerCardValue = self.player.currentCard.split(' ')[1];
                let opponentCardValue = self.opponent.currentCard.split(' ')[1];
                console.log(playerCardValue + ' vs ' + opponentCardValue);

                self.highLightTargetedCard();
                setInterval(() => {
                    self.setCard('#oB2',
                        self.opponent.currentCard.split(' ')[0],
                        self.opponent.currentCard.split(' ')[1]);
                    self.compareCards(self.oB2);
                }, 2000);
            }
        });

        self.oB3.click(function() {
            if (self.oB3.hasClass('clickable')) {
                self.oB3.addClass('glow');
                self.opponent.currentCard = self.oBattleCards[2];
                let choice = Math.floor(Math.random() * self.pBattleCards.length);
                console.log(choice);
                self.player.currentCard = self.pBattleCards[choice];

                let playerCardValue = self.player.currentCard.split(' ')[1];
                let opponentCardValue = self.opponent.currentCard.split(' ')[1];
                console.log(playerCardValue + ' vs ' + opponentCardValue);

                self.highLightTargetedCard();
                setInterval(() => {
                    self.setCard('#oB3',
                        self.opponent.currentCard.split(' ')[0],
                        self.opponent.currentCard.split(' ')[1]);
                    self.compareCards(self.ob3);
                }, 2000);
            }
        });

        self.play();

        console.log('Init Done.');
    };

    /**
     * Visually resets the battle cards and makes them unclickable.
     */
    self.resetBattleCards = function() {
        let battleCards = [
            self.oB1,
            self.oB2,
            self.oB3,
            self.pB1,
            self.pB2,
            self.pB3
        ];
        battleCards.forEach((element, index) => {
            element.removeClass('glow')
                .removeClass('glowGreen')
                .removeClass('glowRed')
                .removeClass('clickable');
        });
    };

    /**
     * Highlights the card chosen by an opponent.
     */
    self.highLightTargetedCard = function() {
        let attackedCard = self.pBattleCards.indexOf(self.player.currentCard);
        switch (attackedCard) {
            case 0:
                self.pB1.addClass('glowRed');
                break;
            case 1:
                self.pB2.addClass('glowRed');
                break;
            default:
                self.pB3.addClass('glowRed');
                break;
        }
    };

    /**
     * Updates health bars.
     */
    self.updateHealthBars = function() {
        let playerPercentage = (self.player.hand.length / 26) * 100;
        let opponentPercentage = (self.opponent.hand.length / 26) * 100;
        if (playerPercentage <= 66) {
            self.pCardsLeft.css('background-color', 'orange');
        } else if (playerPercentage <= 33) {
            self.pCardsLeft.css('background-color', 'red');
        } else {
            self.pCardsLeft.css('background-color', 'green');
        }
        if (opponentPercentage <= 66) {
            self.oCardsLeft.css('background-color', 'orange');
        } else if (opponentPercentage <= 33) {
            self.oCardsLeft.css('background-color', 'red');
        } else {
            self.oCardsLeft.css('background-color', 'green');
        }
        self.pCardsLeft.width((playerPercentage).toString() + '%');
        self.pCardsLeft.text(self.player.hand.length + '/26');
        self.oCardsLeft.width((opponentPercentage).toString() + '%');
        self.oCardsLeft.text(self.opponent.hand.length + '/26');
    };

    /**
     * Sets up the deck.
     */
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
     * Updates the screen each step.
     */
    self.play = function() {
        console.log('Updating screen text and clearing up for next turn.');

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
            element.removeClass('glow')
                .removeClass('glowGreen')
                .removeClass('glowRed')
                .removeClass('clickable');
            if (index > 1) {
                element.fadeOut('slow');
            }
        });

        self.updateUIText();
        self.flavortext.text("Click your deck to start the next turn.");
        self.pDeck.addClass('glow').addClass('clickable');
        self.inChallenge = false;
        self.inBattle = false;
    };

    self.updateUIText = function() {
        self.pwins.text(self.player.wins);
        self.owins.text(self.opponent.wins);
        self.oCardsInPlay.text(self.opponent.cardsOnTable.length);
        self.pCardsInPlay.text(self.player.cardsOnTable.length);
        self.turnCount.text(self.turns);
    };

    /**
     * Initializes players.
     */
    self.initPlayers = function() {
        let playerWins = self.player.wins;
        let opponentWins = self.opponent.wins;
        self.player = new Player();
        self.player.init(playerWins ? playerWins : 0);
        const half = Math.ceil(self.deck.length / 2);
        const redHalfOfDeck = self.deck.splice(half, half);
        self.player.hand = self.player.hand.concat(redHalfOfDeck);
        self.player.hand = self.shuffle(self.player.hand);

        self.opponent = new Player();
        self.opponent.init(opponentWins ? opponentWins : 0);
        self.opponent.hand = self.opponent.hand.concat(self.deck.splice(0, self.deck.length));
        self.opponent.hand = self.shuffle(self.opponent.hand);
    };

    /**
     * Compare two cards and return a result, visually shows that result.
     */
    self.compareCards = function(clicked) {
        console.log('[compareCards]');
        let playerCardValue = parseInt(self.player.currentCard.split(' ')[1]);
        let playerHadAnAce = playerCardValue === 1;
        let opponentCardValue = parseInt(self.opponent.currentCard.split(' ')[1]);
        let opponentHadAnAce = opponentCardValue === 1;
        // If player 1 pulled an ace
        if (playerHadAnAce) {
            // if opponent's card is anything other than 2, win
            if (opponentCardValue == 2) {
                // no challenge--Player loses
                self.loseHand(clicked);
            }
            playerCardValue += 13
        }
        // If opponent pulled an ace
        else if (opponentHadAnAce) {
            // if opponent's card is anything other than 2, win
            if (playerCardValue == 2) {
                // no challenge--Opponent loses
                self.winHand(clicked);
            }
            opponentCardValue += 13;
        }
        console.log(playerCardValue + ' vs ' + opponentCardValue);

        // if card values are the same
        if (playerCardValue == opponentCardValue) {
            // draw the next 3 and put them in the B slots for each player
            self.initBattle();
        } else if (playerCardValue > opponentCardValue) {
            self.opponentChallenge();
        } else {
            self.playerChallenge();
        }
    };

    self.opponentChallenge = function() {
        let challengeProbability = Math.floor(Math.random() * (20 - 1) + 1) >= 10;
        if (self.turns === self.currentTurn &&
            !self.inChallenge &&
            !self.inBattle &&
            challengeProbability) {
            console.log('Opponent decided to challenge.');
            self.inChallenge = true;
            self.flavortext.text(self.challengeMessages[Math.floor(Math.random() * self.challengeMessages.length)]);
            setTimeout(() => {
                self.opponent.currentCard = self.opponent.hand.shift();
                self.opponent.cardsOnTable.push(self.opponent.currentCard);
                self.updateUIText();

                // show the opponent's card
                self.oChallenge.slideDown('slow');
                self.clearCard('#oChallenge');
                setTimeout(() => {
                    self.setCard('#oChallenge',
                        self.opponent.currentCard.split(' ')[0],
                        self.opponent.currentCard.split(' ')[1]);
                    self.compareCards(self.oChallenge);
                }, 2000);
            }, 2000);
        } else {
            self.winHand(self.pChallenge);
        }
    };

    self.playerChallenge = function() {
        if (!self.inBattle &&
            !self.inChallenge &&
            self.turns === self.currentTurn) {
            self.flavortext.text("You can challenge, click your deck to ignore and accept defeat.");
            self.pDraw.addClass('glowGreen').addClass('clickable');
            self.pDeck.addClass('glowRed').addClass('clickable');
            console.log('Player can challenge.');
            self.inChallenge = true;
        } else {
            self.loseHand(self.pDeck);
        }
    };

    /**
     * When the player wins
     */
    self.winHand = function(card) {
        console.log('win');
        // apply visual effects
        card.addClass('glowGreen');
        self.oDraw.addClass('glowRed');
        self.flavortext.text(self.winMessages[Math.floor(Math.random() * self.winMessages.length)]);
        self.shake(10, self.playerFrame);
        // give player cards back
        self.player.hand = self.player.hand.concat(self.player.cardsOnTable);
        // discard the opponent's cards
        self.discard = self.discard.concat(self.opponent.cardsOnTable);
        self.player.cardsOnTable = [];
        self.opponent.cardsOnTable = [];
        self.turns += 1;
        self.updateUIText();

        setTimeout(() => {
            self.oDraw.fadeOut('slow');
            self.oChallenge.fadeOut('slow');
            self.pDraw.fadeOut('slow');
            self.pChallenge.fadeOut('slow');
        }, 2000);

        self.updateHealthBars();
        if (self.opponent.hand.length < 1) {
            self.winGame();
        }

        setTimeout(() => {
            self.play();
        }, 3000);
    };

    /**
     * when the player loses
     */
    self.loseHand = function(card) {
        console.log('lose');
        // apply visual effects
        card.addClass('glowRed');
        self.oDraw.addClass('glowGreen');
        self.flavortext.text(self.loseMessages[Math.floor(Math.random() * self.loseMessages.length)]);
        self.shake(10, self.playerFrame);
        // give opponent cards back
        self.opponent.hand = self.opponent.hand.concat(self.opponent.cardsOnTable);
        // discard the player's cards
        self.discard = self.discard.concat(self.player.cardsOnTable);
        self.player.cardsOnTable = [];
        self.opponent.cardsOnTable = [];
        self.turns += 1;
        self.updateUIText();

        setTimeout(() => {
            self.oDraw.fadeOut('slow');
            self.oChallenge.fadeOut('slow');
            self.pDraw.fadeOut('slow');
            self.pChallenge.fadeOut('slow');
        }, 2000);

        self.updateHealthBars();
        if (self.player.hand.length < 1) {
            self.loseGame();
        }

        setTimeout(() => {
            self.play();
        }, 3000);
    };

    /**
     * when the player wins the game
     */
    self.winGame = function() {
        self.player.wins += 1;
        self.flavortext.text("You win!");
        if (confirm('Again?')) {
            self.init();
        }
    };

    /**
     * When the player loses the game
     */
    self.loseGame = function() {
        self.opponent.wins += 1;
        self.flavortext.text("You lose!");
        if (confirm('Again?')) {
            self.init();
        }
    };

    /**
     * Initiates a battle
     */
    self.initBattle = function() {
        console.log('initiating battle');
        console.log(self.player.hand.length);
        console.log(self.opponent.hand.length)
        if (self.opponent.hand.length <= 3) {
            self.winGame();
        }
        if (self.player.hand.length <= 3) {
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

        self.updateUIText();

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
        self.pB1.slideDown('slow', function() {
            self.setCard('#pB1', self.pBattleCards[0].split(' ')[0], self.pBattleCards[0].split(' ')[1]);
        });
        self.pB2.slideDown('slow', function() {
            self.setCard('#pB2', self.pBattleCards[1].split(' ')[0], self.pBattleCards[1].split(' ')[1]);
        });
        self.pB3.slideDown('slow', function() {
            self.setCard('#pB3', self.pBattleCards[2].split(' ')[0], self.pBattleCards[2].split(' ')[1]);
        });
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
                    console.log('[Engine.setCard] Defaulted.');
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
            $(card).empty();
        }
    };

    return self;

}(Engine || {}, jQuery));