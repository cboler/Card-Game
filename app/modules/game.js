import { player } from './player';
import { opponent } from './opponent';
import { playerinfo } from './playerinfo';
import { opponentinfo } from './opponentInfo';

export class game {
    constructor() {
        this.deck = [];
        this.discard = [];
        this.turns = 1;
        this.currentTurn = 0;
        this.inBattle = false;
        this.inChallenge = false;
        this.oBattleCards = [];
        this.pBattleCards = [];
        this.player = new player();
        this.opponent = new opponent();
        this.playerinfo = new playerinfo();
        this.opponentinfo = new opponentinfo();
    }

    init = function() {

    }
}