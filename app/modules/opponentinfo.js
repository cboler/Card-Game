export class opponentinfo {
    constructor() {
        this.wins = document.querySelector('#opponent-wins');
        this.cardsInPlay = document.querySelector('#opponent-cards-in-play');
        this.health = document.querySelector('#opponent-progressbar div');
        this.deck = document.querySelector('#oDeck');
        this.drawnCard = document.querySelector('#pDeck');
        this.challengeCard = document.querySelector('#oChallenge');
        this.battleCard1 = document.querySelector('#oB1');
        this.battleCard2 = document.querySelector('#oB2');
        this.battleCard3 = document.querySelector('#oB3');
        this.dialogue = document.querySelector('#flavortext');
    }

    update = function() {

    }

    displayMessage = function(message) {
        this.dialogue.text(message);
    }
}