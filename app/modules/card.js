export class card {
    constructor(suite, value) {
        if (this.validateSuite(suite)) {
            this.suite = suite;
        } else {
            throw 'invalid suite';
        }
        if (this.validateValue(value)) {
            this.value = value;
        } else {
            throw 'invalid value';
        }
    }

    validateSuite = function(suite) {
        const validSuites = ['spades', 'clubs', 'diams', 'hearts']
        if (validSuites.includes(suite)) {
            return true;
        }
        return false;
    }

    validateValue = function(value) {
        const validValues = [...Array(14).keys()].map(i => i + 1);
        if (validValues.includes(value)) {
            return true;
        }
        return false;
    }

    showCard = function(cardElement) {
        if (typeof(cardElement) != 'undefined' &&
            cardElement != null &&
            (this.suite == 'spades' ||
                this.suite == 'clubs' ||
                this.suite == 'diams' ||
                this.suite == 'hearts')) {
            switch (this.value) {
                case 'ten':
                case '10':
                case 10:
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        // todo: I could do this in a for loop, but should i?
                        '"><div class="index">10<br/>&' +
                        this.suite +
                        ';</div><div class="spotA1">&' +
                        this.suite +
                        ';</div><div class="spotA2">&' +
                        this.suite +
                        ';</div><div class="spotA4">&' +
                        this.suite +
                        ';</div><div class="spotA5">&' +
                        this.suite +
                        ';</div><div class="spotB2">&' +
                        this.suite +
                        ';</div><div class="spotB4">&' +
                        this.suite +
                        ';</div><div class="spotC1">&' +
                        this.suite +
                        ';</div><div class="spotC2">&' +
                        this.suite +
                        ';</div><div class="spotC4">&' +
                        this.suite +
                        ';</div><div class="spotC5">&' +
                        this.suite +
                        ';</div></div>';
                    break;
                case 'nine':
                case '9':
                case 9:
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        '"><div class="index">9<br/>&' +
                        this.suite +
                        ';</div><div class="spotA1">&' +
                        this.suite +
                        ';</div><div class="spotA2">&' +
                        this.suite +
                        ';</div><div class="spotA4">&' +
                        this.suite +
                        ';</div><div class="spotA5">&' +
                        this.suite +
                        ';</div><div class="spotB3">&' +
                        this.suite +
                        ';</div><div class="spotC1">&' +
                        this.suite +
                        ';</div><div class="spotC2">&' +
                        this.suite +
                        ';</div><div class="spotC4">&' +
                        this.suite +
                        ';</div><div class="spotC5">&' +
                        this.suite +
                        ';</div></div>';
                    break;
                case 'eight':
                case '8':
                case 8:
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        '"><div class="index">8<br/>&' +
                        this.suite +
                        ';</div><div class="spotA1">&' +
                        this.suite +
                        ';</div><div class="spotA3">&' +
                        this.suite +
                        ';</div><div class="spotA5">&' +
                        this.suite +
                        ';</div><div class="spotB2">&' +
                        this.suite +
                        ';</div><div class="spotB4">&' +
                        this.suite +
                        ';</div><div class="spotC1">&' +
                        this.suite +
                        ';</div><div class="spotC3">&' +
                        this.suite +
                        ';</div><div class="spotC5"> &' +
                        this.suite +
                        ';</div></div>';
                    break;
                case 'seven':
                case '7':
                case 7:
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        '"><div class="index">7<br/>&' +
                        this.suite +
                        ';</div><div class="spotA1">&' +
                        this.suite +
                        ';</div><div class="spotA3">&' +
                        this.suite +
                        ';</div><div class="spotA5">&' +
                        this.suite +
                        ';</div><div class="spotB2">&' +
                        this.suite +
                        ';</div><div class="spotC1">&' +
                        this.suite +
                        ';</div><div class="spotC3">&' +
                        this.suite +
                        ';</div><div class="spotC5">&' +
                        this.suite +
                        ';</div></div>';
                    break;
                case 'six':
                case '6':
                case 6:
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        '"><div class="index">6<br/>&' +
                        this.suite +
                        ';</div><div class="spotA1">&' +
                        this.suite +
                        ';</div><div class="spotA3">&' +
                        this.suite +
                        ';</div><div class="spotA5">&' +
                        this.suite +
                        ';</div><div class="spotC1">&' +
                        this.suite +
                        ';</div><div class="spotC3">&' +
                        this.suite +
                        ';</div><div class="spotC5">&' +
                        this.suite +
                        ';</div></div>';
                    break;
                case 'five':
                case '5':
                case 5:
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        '"><div class="index">5<br/>&' +
                        this.suite +
                        ';</div><div class="spotA1">&' +
                        this.suite +
                        ';</div><div class="spotA5">&' +
                        this.suite +
                        ';</div><div class="spotB3">&' +
                        this.suite +
                        ';</div><div class="spotC1">&' +
                        this.suite +
                        ';</div><div class="spotC5">&' +
                        this.suite +
                        ';</div></div>';
                    break;
                case 'four':
                case '4':
                case 4:
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        '"><div class="index">4<br/>&' +
                        this.suite +
                        ';</div><div class="spotA1">&' +
                        this.suite +
                        ';</div><div class="spotA5">&' +
                        this.suite +
                        ';</div><div class="spotC1">&' +
                        this.suite +
                        ';</div><div class="spotC5">&' +
                        this.suite +
                        ';</div></div>';
                    break;
                case 'three':
                case '3':
                case 3:
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        '"><div class="index">3<br/>&' +
                        this.suite +
                        ';</div><div class="spotB1">&' +
                        this.suite +
                        ';</div><div class="spotB3">&' +
                        this.suite +
                        ';</div><div class="spotB5">&' +
                        this.suite +
                        ';</div></div>';
                    break;
                case 'two':
                case '2':
                case 2:
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        '"><div class="index">2<br/>&' +
                        this.suite +
                        ';</div><div class="spotB1">&' +
                        this.suite +
                        ';</div><div class="spotB5">&' +
                        this.suite +
                        ';</div></div>';
                    break;
                case 'ace':
                case 'one':
                case '1':
                case 1:
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        '"><div class="index">A<br/>&' +
                        this.suite +
                        ';</div><div class="ace">&' +
                        this.suite +
                        ';</div></div>';
                    break;
                case 'jack':
                case 'eleven':
                case '11':
                case 11:
                    // TODO: refactor inline styling to a css class for face cards.
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        '"><div class="index">J<br/>&' +
                        this.suite +
                        ';</div><img class="face" src="res/jack.png" alt="" width="80" height="130" /><div class="spotA1">&' +
                        this.suite +
                        ';</div><div class="spotC5">&' +
                        this.suite +
                        ';</div></div>';
                    break;
                case 'queen':
                case 'twelve':
                case '12':
                case 12:
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        '"><div class="index">Q<br/>&' +
                        this.suite +
                        ';</div><img class="face" src="res/queen.png" alt="" width="80" height="130" /><div class="spotA1">&' +
                        this.suite +
                        ';</div><div class="spotC5">&' +
                        this.suite +
                        ';</div></div>';
                    break;
                case 'king':
                case 'thirteen':
                case '13':
                case 13:
                    cardElement.innerHTML = '<div class="front' +
                        ((this.suite == 'diams' || this.suite == 'hearts') ? ' red' : '') +
                        '"><div class="index">K<br/>&' +
                        this.suite +
                        ';</div><img class="face" src="res/king.png" alt="" width="80" height="130" /><div class="spotA1">&' +
                        this.suite +
                        ';</div><div class="spotC5">&' +
                        this.suite +
                        ';</div></div>';
                    break;
                default:
                    console.log('[Engine.setCard] Defaulted.');
                    break;
            }
        }
    }

    hideCard = function(cardElement) {
        if (typeof(cardElement) != 'undefined' && cardElement != null) {
            cardElement.innerHTML = '';
        }
    }
}