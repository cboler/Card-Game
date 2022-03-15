import { player } from './player';
import { opponent } from './opponent';
import { card } from './card';

export class smack {
    constructor() {
        this.deck = [];
        this.discard = [];
        this.turns = 1;
        this.currentTurn = 0;
        this.inBattle = false;
        this.inChallenge = false;
        this.turnCount = document.querySelector('#turn-count');
    }

    updateText = function() {
        this.turnCount.text(this.turns);
    }

    init = function() {
        let playerWins = this.player.wins;
        let opponentWins = this.opponent.wins;
        this.player = new player(playerWins);
        this.opponent = new opponent(opponentWins);

        this.updateText();
        this.player.display.updateText();
        this.player.display.updateHealthBar();
        this.opponent.display.updateText();
        this.opponent.display.updateHealthBar();

        // click events?
    }

    initDeck = function() {
        this.discard = [];
        ['spades', 'clubs', 'diams', 'hearts'].forEach((suite) => {
            for (var i = 1; i < 14; i++) {
                this.deck.push(new card(suite, i));
            }
        });
    }

    deal = function() {
        const half = Math.ceil(this.deck.length / 2);
        const redHalfOfDeck = this.deck.splice(half, half);
        this.player.hand = this.player.hand.concat(redHalfOfDeck);
        this.player.hand = this.shuffle(this.player.hand);
        this.opponent.hand = this.opponent.hand.concat(
            this.deck.splice(0, this.deck.length));
        this.opponent.hand = this.shuffle(this.opponent.hand);
    }

    /**
     * Array shuffling function from
     * http://bost.ocks.org/mike/shuffle/
     * Credit goes to Mike Bostock 
     * (http://bost.ocks.org/mike/)
     * for the implementation
     * of the Fisher-Yates shuffle.
     * @param {array} array: the array to shuffle
     */
    shuffle = function shuffle(array) {
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
    }

    shakeElement = function(n, element) {
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
    }
}