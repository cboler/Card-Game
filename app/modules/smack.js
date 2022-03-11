import { player } from './player';
import { opponent } from './opponent';
import { playerinfo } from './playerinfo';
import { opponentinfo } from './opponentInfo';
import { card } from './card';

export class smack {
    constructor() {
        this.deck = [];
        this.discard = [];
        this.turns = 1;
        this.currentTurn = 0;
        this.inBattle = false;
        this.inChallenge = false;
        this.playerinfo = new playerinfo();
        this.opponentinfo = new opponentinfo();
        this.turnCount = document.querySelector('#turn-count');
    }

    updateText = function() {
        this.turnCount.text(this.turns);
    }

    init = function() {
        let playerWins = this.playerinfo.player.wins;
        let opponentWins = this.opponentinfo.opponent.wins;
        this.playerinfo.player = new player(playerWins);
        this.opponentinfo.opponent = new opponent(opponentWins);

        this.updateText();
        this.playerinfo.display.updateText();
        this.playerinfo.display.updateHealthBar();
        this.opponentinfo.display.updateText();
        this.opponentinfo.display.updateHealthBar();



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
        this.playerinfo.player.hand = this.playerinfo.player.hand.concat(redHalfOfDeck);
        this.playerinfo.player.hand = this.shuffle(this.playerinfo.player.hand);
        this.opponentinfo.opponent.hand = this.opponentinfo.opponent.hand.concat(this.deck.splice(0, this.deck.length));
        this.opponentinfo.opponent.hand = this.shuffle(this.opponentinfo.opponent.hand);
    }

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