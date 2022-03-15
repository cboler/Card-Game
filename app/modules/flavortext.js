export class flavortext {
    constructor() {
        this.text = document.querySelector('#flavortext');
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
        this.text.text(message);
    }

    displayRandomWinMessage = function() {
        this.text.text(
            this.winMessages[
                Math.floor(Math.random() * this.winMessages.length)
            ]);
    }

    displayRandomLoseMessage = function() {
        this.text.text(
            this.loseMessages[
                Math.floor(Math.random() * this.loseMessages.length)
            ]);
    }

    displayRandomChallengeMessage = function() {
        this.text.text(
            this.challengeMessages[
                Math.floor(Math.random() * this.challengeMessages.length)
            ]);
    }

    displayRandomPlayerChallengeMessage = function() {
        this.text.text(
            this.playerChallengeMessages[
                Math.floor(Math.random() * this.playerChallengeMessages.length)
            ]);
    }
}