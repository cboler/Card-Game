/*
 * Author: Chris Boler
 * christopher.boler@gmail.com
 * 8/15/2012
 */

/**
 * Player: Class containing information about the player
 */
var Player = {
	
	/**
	 * Default option configuration
	 */
	_options: {
		debug: false,
		color: 'black',
		number: 1
	},
	
	number: 1,
	
	/**
	 * Set of cards in the player's hand
	 */
	hand: [],
	
	/**
	 * Initialization function that sets options
	 * @param {Object} options: { debug, color }
	 */
	init: function(options) {
		var self = this;
		// Apply options
		$.extend(true, self._options, options);
		self.number = self._options.number;
		
		// Enable debug logging
		if(self._options.debug) {
			self.log = function(str) {
				try { // prevent error
					if(typeof window.console !== undefined && typeof window.console.log !== undefined) {
						console.log(str);
					}
				} catch(e) {
					alert('[Player:' + self.number + '.Init Debug] logging not possible.');
				}
			};
			self.log('[Player:' + self.number + '.Init] Debugging enabled.');
		}
		
		self.log('[Player:' + self.number + '.Init] Done.');
		
		return self;
	},
	
	/**
	 * Overridden to perform console logging if options.debug is set to true.
	 */
	log: function() {},
};

/**
 * Engine: generic engine for card games.
 * This engine expects you to lay out the game in HTML prior to initialization.
 * @param {Object} self: Engine
 * @param {Object} $: jQuery
 */
var Engine = (function(self, $) {
	
	/**
	 * Default option configuration
	 */
	var _options = {
		debug: false,
		game: undefined,
		playerCount: 2
	};
	
	/**
	 * The set of unused cards that have yet to be dealt.
	 */
	self.deck = [{
		1 : 'spades 1',
		2 : 'spades 2',
		3 : 'spades 3',
		4 : 'spades 4',
		5 : 'spades 5',
		6 : 'spades 6',
		7 : 'spades 7',
		8 : 'spades 8',
		9 : 'spades 9',
		10 : 'spades 10',
		11 : 'spades 11',
		12 : 'spades 12',
		13 : 'spades 13',
		14 : 'clubs 1',
		15 : 'clubs 2',
		16 : 'clubs 3',
		17 : 'clubs 4',
		18 : 'clubs 5',
		19 : 'clubs 6',
		20 : 'clubs 7',
		21 : 'clubs 8',
		22 : 'clubs 9',
		23 : 'clubs 10',
		24 : 'clubs 11',
		25 : 'clubs 12',
		26 : 'clubs 13',
		27 : 'diams 1',
		28 : 'diams 2',
		29 : 'diams 3',
		30 : 'diams 4',
		31 : 'diams 5',
		32 : 'diams 6',
		33 : 'diams 7',
		34 : 'diams 8',
		35 : 'diams 9',
		36 : 'diams 10',
		37 : 'diams 11',
		38 : 'diams 12',
		39 : 'diams 13',
		40 : 'hearts 1',
		41 : 'hearts 2',
		42 : 'hearts 3',
		43 : 'hearts 4',
		44 : 'hearts 5',
		45 : 'hearts 6',
		46 : 'hearts 7',
		47 : 'hearts 8',
		48 : 'hearts 9',
		49 : 'hearts 10',
		50 : 'hearts 11',
		51 : 'hearts 12',
		52 : 'hearts 13'
	}];
	
	/**
	 * The set of used cards removed from play.
	 */
	self.discard = [];
	
	/**
	 * The set of players, used to keep up with hands.
	 */
	self.players = [];
	
	/**
	 * Initialization function that sets options
	 * @param {Object} options: { debug }
	 */
	self.init = function(options) {
		// Apply options
		$.extend(true, _options, options);

		// Enable debug logging
		if(_options.debug) {
			self.log = function(str) {
				try { // prevent error
					if(typeof window.console !== undefined && typeof window.console.log !== undefined) {
						console.log(str);
					}
				} catch(e) {
					alert('[Engine.Init Debug] logging not possible.');
				}
			};
			self.log('[Engine.Init] Debugging enabled.');
		}
		
		self.play();
		
		self.log('[Engine.Init] Done.');
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
		var m = array.length, t, i;

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
	}

	
	self.play = function(){
		// Set up game options/rules. This is where you would extend for more games.
		switch(_options.game){
			case 'smack':
				self.log('[Engine.Init] Starting Smack.');								
				// Split the deck at 26, give red to one player and black to the other
				if(_options.playerCount !== 2){
					alert('[Engine.play] Invalid player count.');
				}
				var playerColor = _options.color;
				for(var i = 0; i < _options.playerCount; i++){
					// Player 0 is the human
					if (i == 1) {
						playerColor = 'red';
					}					
					self.players[i] = Player.init({ debug: true, number: i });
					// Default to black, allow choosing later
					switch(playerColor){
						case 'red':
							self.players[i].hand = [{
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
								26: 'clubs 13'
							}];
							break;
						default:
							self.players[i].hand = [{
								1 : 'diams 1',
								2 : 'diams 2',
								3 : 'diams 3',
								4 : 'diams 4',
								5 : 'diams 5',
								6 : 'diams 6',
								7 : 'diams 7',
								8 : 'diams 8',
								9 : 'diams 9',
								10 : 'diams 10',
								11 : 'diams 11',
								12 : 'diams 12',
								13 : 'diams 13',
								14 : 'hearts 1',
								15 : 'hearts 2',
								16 : 'hearts 3',
								17 : 'hearts 4',
								18 : 'hearts 5',
								19 : 'hearts 6',
								20 : 'hearts 7',
								21 : 'hearts 8',
								22 : 'hearts 9',
								23 : 'hearts 10',
								24 : 'hearts 11',
								25 : 'hearts 12',
								26 : 'hearts 13'
							}];
							break;
					}
					self.players[i].hand = self.shuffle(self.players[i].hand);
				}
				// Begin turns and check rules for each action
				
				
				break;
			case undefined:
				alert('[Engine.Init] No game type defined, you stupid twonk.');
				break;
			default:
				alert('[Engine.Init] Invalid game type, asshole.');
				break;
		}
	};
	
	/**
	 * Visually sets a card to a specific value in the face-up state.
	 * @param {Object} card: CSS selector for the card element. (#cardId)
	 * @param {Object} suite: 'spades' or 'clubs' or 'diams' or 'hearts'
	 * @param {Object} value: 1-13 or 'ace' - 'king' or 'one' - 'thirteen'
	 */
	self.setCard = function(card, suite, value) {
		self.log('[Engine.setCard] $(card).length:' + $(card).length);
		if ($(card).length > 0 && (suite == 'spades' || suite == 'clubs' || suite == 'diams' || suite == 'hearts')) {
			self.log('[Engine.setCard] card exists and valid suite.');
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
	self.clearCard = function(card){
		if ($(card).length > 0) {
			self.log('[Engine.clearCard] card exists.');
			$(card).empty();
		}
	};
	
	/**
	 * Overridden to perform console logging if options.debug is set to true.
	 */
	self.log = function() {};

	return self;
}(Engine || {}, jQuery));