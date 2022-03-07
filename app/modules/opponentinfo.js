import { display } from "./display";
import { opponent } from "./opponent";

export class opponentinfo {
    constructor() {
        this.opponent = new opponent();
        this.display = new display('opponent');
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

    displayMessage = function(message) {
        this.dialogue.text(message);
    }

    challenge = function() {
        let challengeProbability = Math.floor(Math.random() * (20 - 1) + 1) >= 10;
        if (challengeProbability) {
            console.log('Opponent decided to challenge.');
            this.dialogue.text(this.challengeMessages[
                Math.floor(Math.random() * this.challengeMessages.length)]);
            // TODO: Other refactoring needs to happen first. I'd like 
            // 1) the deck and hand to be arrays of card objects
            // 2) if the card knows it's value, set card should be renamed 
            // and have a different signature
            // I have a reference to the card element here, that needs to be
            // taken into account

            // this.currentCard = this.hand.shift();
            // this.cardsOnTable.push(this.currentCard);
            // this.update();
            // this.currentCard.clearCard('#oChallenge');
            //     setTimeout(() => {
            //         self.setCard('#oChallenge',
            //             self.opponent.currentCard.split(' ')[0],
            //             self.opponent.currentCard.split(' ')[1]);
            //         self.compareCards(self.oChallenge);
            //     }, 2000);
            return true;
        }
        return false;
    }


}