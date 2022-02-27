/*
 * Author: Chris Boler
 * christopher.boler@gmail.com
 * 8/15/2012
 * The concept of 'smack' was conceived years ago
 * by myself with the help of Joshua Lindsay widerightturns13@yahoo.com
 * Special thanks to Lacy Boler for debugging and rubber ducking
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
    this.currentCard = {};

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
        debug: false,
        game: undefined,
        playerCount: 2
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
    self.turnCount = 0;
    self.oBattleCards = [];
    self.pBattleCards = [];
    self.gameEnd = false;
    self.winMessages = [
        "It appears you've won.",
        "Good show."
    ];
    self.loseMessages = [
        "Ouch.",
        "That looked painful."
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

        self.initDeck();
        self.player = self.initPlayer(new Player());
        self.opponent = self.initOpponent(new Player());

        self.play();

        self.log('[Engine.Init] Done.');
    };

    self.initDeck = function() {
        self.deck = [{
            1: 'spades 1',
            2: 'spades 2',
            3: 'spades 3',
            4: 'spades 4',
            5: 'spades 5',
            6: 'spades 6',
            7: 'spades 7',
            8: 'spades 8',
            9: 'spades 9',
            10: 'spades 10',
            11: 'spades 11',
            12: 'spades 12',
            13: 'spades 13',
            14: 'clubs 1',
            15: 'clubs 2',
            16: 'clubs 3',
            17: 'clubs 4',
            18: 'clubs 5',
            19: 'clubs 6',
            20: 'clubs 7',
            21: 'clubs 8',
            22: 'clubs 9',
            23: 'clubs 10',
            24: 'clubs 11',
            25: 'clubs 12',
            26: 'clubs 13',
            27: 'diams 1',
            28: 'diams 2',
            29: 'diams 3',
            30: 'diams 4',
            31: 'diams 5',
            32: 'diams 6',
            33: 'diams 7',
            34: 'diams 8',
            35: 'diams 9',
            36: 'diams 10',
            37: 'diams 11',
            38: 'diams 12',
            39: 'diams 13',
            40: 'hearts 1',
            41: 'hearts 2',
            42: 'hearts 3',
            43: 'hearts 4',
            44: 'hearts 5',
            45: 'hearts 6',
            46: 'hearts 7',
            47: 'hearts 8',
            48: 'hearts 9',
            49: 'hearts 10',
            50: 'hearts 11',
            51: 'hearts 12',
            52: 'hearts 13'
        }];
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
        self.log('[Engine.play] Starting Smack.');
        self.pwins.text(self.player.wins);
        self.owins.text(self.opponent.wins);

        //while (!self.gameEnd) {
        self.flavortext.text("Click your deck to draw.");
        self.pDeck.addClass('glow');

        console.log("pDeck");
        console.log(self.pDeck);
        //}

        self.pDeck.click(function() {
            // bug here-ish; the deck can't be clicked
            self.log('[Engine.play] Player deck clicked.');
            self.turnCount += 1;
            self.player.currentCard = self.player.hand.shift();
            self.opponent.currentCard = self.opponent.hand.shift();
            self.player.cardsOnTable.push(self.player.currentCard);
            self.opponent.cardsOnTable.push(self.opponent.currentCard);
            self.log(self.player.currentCard);
            self.log(self.opponent.currentCard);

            self.pDraw.slideDown('slow');
            self.setCard('#pDraw', self.player.currentCard.split(' ')[0], self.player.currentCard.split(' ')[1]);
            self.oDraw.slideDown('slow');
            self.setCard('#oDraw', self.opponent.currentCard.split(' ')[0], self.opponent.currentCard.split(' ')[1]);
            self.pDeck.removeClass('glow');

            self.compareCards(self.player.currentCard, self.opponent.currentCard);
        });

        self.pDraw.click(function() {
            // Challenge initiated
            self.player.currentCard = self.player.hand.shift();
            self.player.cardsOnTable.push(self.player.currentCard);
            self.compareCards(self.player.currentCard, self.opponent.currentCard);
        });

        // TODO: refactor the following 3 methods into a single 'battle card selected' method
        self.oB1.click(function() {
            self.opponent.currentCard = self.oBattleCards[0];
            self.player.currentCard = self.pBattleCards[Math.floor(Math.random() * self.pBattleCards.length)];
            self.oB1.removeClass('glow').removeClass('clickable');
            self.oB2.removeClass('glow').removeClass('clickable');
            self.oB3.removeClass('glow').removeClass('clickable');
            self.setCard('#oB1', self.opponent.currentCard.split(' ')[0], self.opponent.currentCard.split(' ')[1]);
            self.compareCards(self.player.currentCard, self.opponent.currentCard);
        });

        self.oB2.click(function() {
            self.opponent.currentCard = self.oBattleCards[1];
            self.player.currentCard = self.pBattleCards[Math.floor(Math.random() * self.pBattleCards.length)];
            self.oB1.removeClass('glow').removeClass('clickable');
            self.oB2.removeClass('glow').removeClass('clickable');
            self.oB3.removeClass('glow').removeClass('clickable');
            self.setCard('#oB2', self.opponent.currentCard.split(' ')[0], self.opponent.currentCard.split(' ')[1]);
            self.compareCards(self.player.currentCard, self.opponent.currentCard);
        });

        self.oB3.click(function() {
            self.opponent.currentCard = self.oBattleCards[2];
            self.player.currentCard = self.pBattleCards[Math.floor(Math.random() * self.pBattleCards.length)];
            self.oB1.removeClass('glow').removeClass('clickable');
            self.oB2.removeClass('glow').removeClass('clickable');
            self.oB3.removeClass('glow').removeClass('clickable');
            self.setCard('#oB3', self.opponent.currentCard.split(' ')[0], self.opponent.currentCard.split(' ')[1]);
            self.compareCards(self.player.currentCard, self.opponent.currentCard);
        });
    };

    /**
     * Initializes and returns a player
     * @param {*} player 
     */
    self.initPlayer = function(player) {
        player.init({ debug: false, color: 'red' });
        self.log('[Engine.initPlayer] Setting up red player.');
        const half = Math.ceil(self.deck / 2);
        player.hand = player.hand.concat(self.deck.slice(half, half))
            // player.hand[0] = 'diams 1';
            // player.hand[1] = 'diams 2';
            // player.hand[2] = 'diams 3';
            // player.hand[3] = 'diams 4';
            // player.hand[4] = 'diams 5';
            // player.hand[5] = 'diams 6';
            // player.hand[6] = 'diams 7';
            // player.hand[7] = 'diams 8';
            // player.hand[8] = 'diams 9';
            // player.hand[9] = 'diams 10';
            // player.hand[10] = 'diams 11';
            // player.hand[11] = 'diams 12';
            // player.hand[12] = 'diams 13';
            // player.hand[13] = 'hearts 1';
            // player.hand[14] = 'hearts 2';
            // player.hand[15] = 'hearts 3';
            // player.hand[16] = 'hearts 4';
            // player.hand[17] = 'hearts 5';
            // player.hand[18] = 'hearts 6';
            // player.hand[19] = 'hearts 7';
            // player.hand[20] = 'hearts 8';
            // player.hand[21] = 'hearts 9';
            // player.hand[22] = 'hearts 10';
            // player.hand[23] = 'hearts 11';
            // player.hand[24] = 'hearts 12';
            // player.hand[25] = 'hearts 13';
        self.log(player.hand);
        player.hand = self.shuffle(player.hand);
        self.log(player.hand);
        return player;
    };

    self.initOpponent = function(player) {
        player.init({ debug: false, color: 'black' });
        self.log('[Engine.initOpponent] Setting up black player.');
        // because it's called after player setup
        player.hand = player.hand.concat(self.deck.slice(0, self.deck.length));
        // player.hand[0] = 'spades 1';
        // player.hand[1] = 'spades 2';
        // player.hand[2] = 'spades 3';
        // player.hand[3] = 'spades 4';
        // player.hand[4] = 'spades 5';
        // player.hand[5] = 'spades 6';
        // player.hand[6] = 'spades 7';
        // player.hand[7] = 'spades 8';
        // player.hand[8] = 'spades 9';
        // player.hand[9] = 'spades 10';
        // player.hand[10] = 'spades 11';
        // player.hand[11] = 'spades 12';
        // player.hand[12] = 'spades 13';
        // player.hand[13] = 'clubs 1';
        // player.hand[14] = 'clubs 2';
        // player.hand[15] = 'clubs 3';
        // player.hand[16] = 'clubs 4';
        // player.hand[17] = 'clubs 5';
        // player.hand[18] = 'clubs 6';
        // player.hand[19] = 'clubs 7';
        // player.hand[20] = 'clubs 8';
        // player.hand[21] = 'clubs 9';
        // player.hand[22] = 'clubs 10';
        // player.hand[23] = 'clubs 11';
        // player.hand[24] = 'clubs 12';
        // player.hand[25] = 'clubs 13';
        self.log(player.hand);
        player.hand = self.shuffle(player.hand);
        self.log(player.hand);
        return player;
    };

    /**
     * Compare two cards and return a result
     * @param {*} cardA : 
     * @param {*} cardB 
     */
    self.compareCards = function(cardA, cardB) {
        self.log('[Engine.compareCards]');
        self.log(cardA);
        self.log(cardB);
        let cardAValue = cardA.split(' ')[1];
        let cardBValue = cardB.split(' ')[1];

        // if card values are the same
        if (cardAValue === cardBValue) {
            // draw the next 3 and put them in the B slots for each player
            self.initBattle();

        }
        // If player 1 pulled an ace
        else if (cardAValue === '1') {
            // if opponent's card is anything other than 2, win
            if (cardBValue === '2') {
                // no challenge--Player loses
                self.loseHand(cardA, cardB);
            }
            self.winHand(cardA, cardB);
        }
        // If player 2 pulled an ace
        else if (cardBValue === '1') {
            // if opponent's card is anything other than 2, win
            if (cardAValue === '2') {
                // no challenge--Opponent loses
                self.winHand(cardA, cardB);
            }
            self.loseHand(cardA, cardB);
        }
        // Player 1 wins, Opponent can challenge 
        else if (cardAValue > cardBValue) {
            // Determine probabilities that Opponent might challenge
            let challengeProbability = Math.floor(Math.random() * (20 - 1) + 1);
            if (cardBValue + challengeProbability > 10) {
                self.flavortext.text("The opponent decided to challenge.");
                const oChallengeCard = self.opponent.hand.shift();
                self.compareCards(cardA, oChallengeCard);
            } else {
                // If no challenge
                self.winHand(cardA, cardB);
            }
        }
        // Player 2 wins, Player 1 can challenge
        else {
            self.flavortext.text("You've an opportunity to challenge, click your deck to ignore.");
            self.pDraw.addClass('glow').addClass('clickable');
            self.pDeck.addClass('glow').addClass('clickable');
        }
    };

    self.winHand = function(pCard, oCard) {
        self.flavortext.text(self.winMessages[Math.floor(Math.random() * self.winMessages.length)]);
        self.shake(2, self.oCardsLeft);
        self.oDraw.fadeOut('slow');
        self.pDraw.fadeOut('slow');
        self.oCardsLeft.attr('width', ((self.opponent.hand.length - 1) * 100).toString() + '%');
        self.oCardsLeft.text(self.opponent.hand.length + '/26');
        self.player.hand = self.player.hand.concat(self.player.cardsOnTable);
        self.discard = self.discard.concat(self.opponent.cardsOnTable);
        if (self.opponent.hand.length < 1) {
            self.winGame();
        }
    };

    self.loseHand = function(pCard, oCard) {
        self.flavortext.text(self.loseMessages[Math.floor(Math.random() * self.loseMessages.length)]);
        self.shake(2, self.oCardsLeft);
        self.oDraw.fadeOut('slow');
        self.pDraw.fadeOut('slow');
        self.pCardsLeft.attr('width', ((self.player.hand.length - 1) * 100).toString() + '%');
        self.pCardsLeft.text(self.player.hand.length + '/26');
        self.opponent.hand = self.opponent.hand.concat(self.opponent.cardsOnTable);
        self.discard = self.discard.concat(self.player.cardsOnTable);
        if (self.player.hand.length < 1) {
            self.loseGame();
        }
    };

    self.winGame = function() {
        self.gameEnd = true;
        self.player.wins += 1;
        self.flavortext.text("You win!");
    };

    self.loseGame = function() {
        self.gameEnd = true;
        self.opponent.wins += 1;
        self.flavortext.text("You lose!");
    };

    self.initBattle = function() {
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

        self.oB1.slideDown('slow', function() {
            $(this).addClass('glow').addClass('clickable');
        });
        self.clearCard('#oB1');

        self.oB2.slideDown('slow', function() {
            $(this).addClass('glow').addClass('clickable');
        });
        self.clearCard('#oB2');

        self.oB3.slideDown('slow', function() {
            $(this).addClass('glow').addClass('clickable');
        });
        self.clearCard('#oB3');

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
        self.log('[Engine.setCard] suite: ' + suite + ' value: ' + value);
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