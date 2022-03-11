import slideToggle from './vfx'

export class display {
    constructor(type) {
        if (type != 'player' || type != 'opponent') {
            throw 'type must be player or opponent';
        }
        this.winCount = document.querySelector(`'#${type}-wins'`);
        this.cardsInPlay = document.querySelector(`'#${type}-cards-in-play'`);
        this.health = document.querySelector(`'#${type}-progressbar div'`);
        this.deck = document.querySelector(`'#${type.charAt(0)}Deck'`);
        this.drawnCard = document.querySelector(`'#${type.charAt(0)}Draw'`);
        this.challengeCard = document.querySelector(`'#${type.charAt(0)}Challenge'`);
        this.battleCard1 = document.querySelector(`'#${type.charAt(0)}B1'`);
        this.battleCard2 = document.querySelector(`'#${type.charAt(0)}B2'`);
        this.battleCard3 = document.querySelector(`'#${type.charAt(0)}B3'`);
    }

    resetVisualElements = function() {
        let visualElementsToReset = [
            this.deck,
            this.drawnCard,
            this.challengeCard,
            this.battleCard1,
            this.battleCard2,
            this.battleCard3
        ];
        visualElementsToReset.forEach((element, index) => {
            element.classList.remove('glow');
            element.classList.remove('glowGreen');
            element.classList.remove('glowRed');
            element.classList.remove('clickable');
            if (index > 1) { // don't hide the deck
                slideToggle(element);
            }
        });
    }

    // redundant?
    resetBattleCards = function() {
        let battleCards = [
            this.battleCard1,
            this.battleCard2,
            this.battleCard3
        ];
        battleCards.forEach((element) => {
            element.classList.remove('glow');
            element.classList.remove('glowGreen');
            element.classList.remove('glowRed');
            element.classList.remove('clickable');
        });
    }

    updateHealthBar = function() {
        let percentage = (this.player.hand.length / 26) * 100;
        if (percentage <= 66) {
            this.health.classList.add('orange-background');
        } else if (percentage <= 33) {
            this.health.classList.add('red-background');
        } else {
            this.health.classList.add('green=background');
        }
        this.health.width((percentage).toString() + '%');
        this.health.text(this.hand.length + '/26');
    }

    updateText = function() {
        this.winCount.text(this.wins);
        this.cardsInPlay.text();
    }
}