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
        this.winMessages = [
            "It appears you've won.",
            "Good show.",
            "Congratulations.",
            "[POSITIVE ADJECTIVES]",
            "Wonderful.",
            "Amazing.",
            "Impressive.",
            "Awesome.",
            "Beautiful.",
            "ATTAGENDER.",
            "[AUDIBLE CLAPPING]",
            "Applause.",
            "Bravo.",
            "Take a bow.",
            "Encore.",
            "Three cheers.",
            "[VARIOUS EXCLAMATIONS]",
            "Woo - Hoo!",
            "Hooray.",
            "Yippee.",
            "Yee - haw!",
            "Hurrah.",
            "Huzzah.",
            "[GESTURES VAGUELY]",
            "Cheers.",
            "Hats off to you.",
            "Here's to you.",
            "[GOOD]",
            "Good for you.",
            "Good on you.",
            "Good job.",
            "Great job.",
            "Excellent job.",
            "Keep it up.",
            "Keep up the great work.",
            "Keep going.",
            "NICE!",
            "Nice.",
            "Noice!",
            "Noice brah!",
            "Nice work.",
            "Nice job.",
            "Nice one.",
            "Nice going.",
            "Nicely done.",
            "So pleased.",
            "So proud.",
            "So Proud!",
            "So thrilled for you.",
            "So tickled for you.",
            "Positively tickled pink.",
            "Way to go.",
            "Way to be.",
            "Way to shine.",
            "Well done.",
            "Well deserved.",
            "This calls for celebrating! Congratulations!"
        ];
        this.loseMessages = [
            "Ouch.",
            "That looked painful.",
            "You tried.",
            "Loser.",
            "Good luck to you.",
            "You're doing your Best.",
            "God bless you.",
            "Keep up the good work!.",
            "What did we learn?",
            "Your mother also doesn't take losing well.",
            "[VARIOUS EXCLAMATIONS]",
            "[GESTURES VAGUELY]",
            "You lose.",
            "Not very good at this are we?",
            "[DERISIVE QUOTE #3]",
            "Fix your face.",
            "Jealous?"
        ];
        this.challengeMessages = [
            "[GESTURES TRIUMPHANTLY]",
            "Mine.",
            "You only thought you won.",
            "Pick up your jaw.",
            "Let it go.",
            "HA!",
            "Ha Ha!",
            "Eat it, suckah!",
            "You like that!?"
        ];
        this.playerChallengeMessages = [
            "That takes guts.",
            "[GESTURES Angrily]",
            "*GASP* Challenge!?",
            "Just can't let it go, can you?",
            "Is it worth it?",
            "What will it cost you?",
            "You really think you can win?",
            "It's just not in the cards.",
            "Go ahead and try.",
            "Play around and, find out."
        ];

    }

    update = function() {

    }

    displayMessage = function(message) {
        this.dialogue.text(message);
    }
}
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
    ';</div></div>';
break;
case 'nine':
case '9':
case 9:
    card.innerHTML = '<div class="front' +
        ((suite == 'diams' || suite == 'hearts') ? ' red' : '') +
        '"><div class="index">9<br/>&' +
        suite +
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
        ';</div></div>';
    break;
case 'eight':
case '8':
case 8:
    card.innerHTML = '<div class="front' +
        ((suite == 'diams' || suite == 'hearts') ? ' red' : '') +
        '"><div class="index">8<br/>&' +
        suite +
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
        ';</div></div>';
    break;
case 'seven':
case '7':
case 7:
    card.innerHTML = '<div class="front' +
        ((suite == 'diams' || suite == 'hearts') ? ' red' : '') +
        '"><div class="index">7<br/>&' +
        suite +
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
        ';</div></div>';
    break;
case 'six':
case '6':
case 6:
    card.innerHTML = '<div class="front' +
        ((suite == 'diams' || suite == 'hearts') ? ' red' : '') +
        '"><div class="index">6<br/>&' +
        suite +
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
        ';</div></div>';
    break;
case 'five':
case '5':
case 5:
    card.innerHTML = '<div class="front' +
        ((suite == 'diams' || suite == 'hearts') ? ' red' : '') +
        '"><div class="index">5<br/>&' +
        suite +
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
        ';</div></div>';
    break;
case 'four':
case '4':
case 4:
    card.innerHTML = '<div class="front' +
        ((suite == 'diams' || suite == 'hearts') ? ' red' : '') +
        '"><div class="index">4<br/>&' +
        suite +
        ';</div><div class="spotA1">&' +
        suite +
        ';</div><div class="spotA5">&' +
        suite +
        ';</div><div class="spotC1">&' +
        suite +
        ';</div><div class="spotC5">&' +
        suite +
        ';</div></div>';
    break;
case 'three':
case '3':
case 3:
    card.innerHTML = '<div class="front' +
        ((suite == 'diams' || suite == 'hearts') ? ' red' : '') +
        '"><div class="index">3<br/>&' +
        suite +
        ';</div><div class="spotB1">&' +
        suite +
        ';</div><div class="spotB3">&' +
        suite +
        ';</div><div class="spotB5">&' +
        suite +
        ';</div></div>';
    break;
case 'two':
case '2':
case 2:
    card.innerHTML = '<div class="front' +
        ((suite == 'diams' || suite == 'hearts') ? ' red' : '') +
        '"><div class="index">2<br/>&' +
        suite +
        ';</div><div class="spotB1">&' +
        suite +
        ';</div><div class="spotB5">&' +
        suite +
        ';</div></div>';
    break;
case 'ace':
case 'one':
case '1':
case 1:
    card.innerHTML = '<div class="front' +
        ((suite == 'diams' || suite == 'hearts') ? ' red' : '') +
        '"><div class="index">A<br/>&' +
        suite +
        ';</div><div class="ace">&' +
        suite +
        ';</div></div>';
    break;
case 'jack':
case 'eleven':
case '11':
case 11:
    // TODO: refactor inline styling to a css class for face cards.
    card.innerHTML = '<div class="front' +
        ((suite == 'diams' || suite == 'hearts') ? ' red' : '') +
        '"><div class="index">J<br/>&' +
        suite +
        ';</div><img class="face" src="res/jack.png" alt="" width="80" height="130" /><div class="spotA1">&' +
        suite +
        ';</div><div class="spotC5">&' +
        suite +
        ';</div></div>';
    break;
case 'queen':
case 'twelve':
case '12':
case 12:
    card.innerHTML = '<div class="front' +
        ((suite == 'diams' || suite == 'hearts') ? ' red' : '') +
        '"><div class="index">Q<br/>&' +
        suite +
        ';</div><img class="face" src="res/queen.png" alt="" width="80" height="130" /><div class="spotA1">&' +
        suite +
        ';</div><div class="spotC5">&' +
        suite +
        ';</div></div>';
    break;
case 'king':
case 'thirteen':
case '13':
case 13:
    card.innerHTML = '<div class="front' +
        ((suite == 'diams' || suite == 'hearts') ? ' red' : '') +
        '"><div class="index">K<br/>&' +
        suite +
        ';</div><img class="face" src="res/king.png" alt="" width="80" height="130" /><div class="spotA1">&' +
        suite +
        ';</div><div class="spotC5">&' +
        suite +
        ';</div></div>';
    break;
default:
    console.log('[Engine.setCard] Defaulted.');
    break;
    }
    }
    }

    clearCard = function(card) {
        if (typeof(card) != 'undefined' && card != null) {
            card.remove();
        }
    }
    }