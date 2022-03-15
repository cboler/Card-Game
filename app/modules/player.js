import { display } from "./display";

export class player {
    constructor(wins, type) {
        this.display = new display(type || 'player');
        this.wins = +wins || 0;
        this.hand = [];
        this.cardsOnTable = [];
        this.battleCards = [];
        this.currentCard = {};
    }
}