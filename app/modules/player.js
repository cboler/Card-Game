export class player {
    constructor(wins) {
        this.wins = +wins || 0;
        this.hand = [];
        this.cardsOnTable = [];
        this.battleCards = [];
        this.currentCard = {};
    }
}