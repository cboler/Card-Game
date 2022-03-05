export class playerinfo {
    constructor() {
        this.wins = document.querySelector('#player-wins');
        this.cardsInPlay = document.querySelector('#player-cards-in-play');
        this.health = document.querySelector('#player-progressbar div');
        this.deck = document.querySelector('#pDeck');
        this.drawnCard = document.querySelector('#pDraw');
        this.challengeCard = document.querySelector('#pChallenge');
        this.battleCard1 = document.querySelector('#pB1');
        this.battleCard2 = document.querySelector('#pB2');
        this.battleCard3 = document.querySelector('#pB3');
        this.turnCount = document.querySelector('#turn-count');
    }
}