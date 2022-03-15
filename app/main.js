button.addEventListener('click', event => {
    button.textContent = `Click count: ${event.detail}`;
});

// todo: Setup click functions
self.pDeck.click(function() {
    if (self.pDeck.hasClass('clickable')) {
        console.log('Player deck clicked.');
        if (self.turns === self.currentTurn && self.pDeck.hasClass('glowRed')) {
            self.pDraw.removeClass('glowGreen').removeClass('clickable');
            self.pDeck.removeClass('glowRed').removeClass('clickable');
            console.log('Player declined to challenge.');
            self.loseHand(self.pDeck);
        } else {
            self.currentTurn = self.turns;
            console.log('turn: ' + self.turns);
            self.turnCount.text(self.turns);

            self.player.currentCard = self.player.hand.shift();
            self.opponent.currentCard = self.opponent.hand.shift();
            self.player.cardsOnTable.push(self.player.currentCard);
            self.opponent.cardsOnTable.push(self.opponent.currentCard);

            self.oCardsInPlay.text(self.opponent.cardsOnTable.length);
            self.pCardsInPlay.text(self.player.cardsOnTable.length);

            self.pDraw.slideDown('slow');
            self.setCard('#pDraw',
                self.player.currentCard.split(' ')[0],
                self.player.currentCard.split(' ')[1]);
            self.oDraw.slideDown('slow');
            self.setCard('#oDraw',
                self.opponent.currentCard.split(' ')[0],
                self.opponent.currentCard.split(' ')[1]);
            self.pDeck.removeClass('glow').removeClass('clickable');

            self.compareCards(self.pDeck);
        }
    }
});

self.pDraw.click(function() {
    if (self.pDraw.hasClass('clickable')) {
        console.log('Drawn card clicked, challenge initiated.');
        self.flavortext.text(self.playerChallengeMessages[Math.floor(Math.random() * self.playerChallengeMessages.length)]);
        self.pDraw.removeClass('glowGreen').removeClass('clickable');
        self.pDeck.removeClass('glowRed').removeClass('clickable');

        self.player.currentCard = self.player.hand.shift();
        self.player.cardsOnTable.push(self.player.currentCard);
        self.oCardsInPlay.text(self.opponent.cardsOnTable.length);
        self.pCardsInPlay.text(self.player.cardsOnTable.length);

        // show card
        self.pChallenge.slideDown('slow');
        self.clearCard('#pChallenge');

        setTimeout(() => {
            // flip card and compare
            self.setCard('#pChallenge',
                self.player.currentCard.split(' ')[0],
                self.player.currentCard.split(' ')[1]);
            self.compareCards(self.pDraw);
        }, 2000);
    }
});

self.oB1.click(function() {
    if (self.oB1.hasClass('clickable')) {
        self.oB1.addClass('glow');
        self.opponent.currentCard = self.oBattleCards[0];
        let choice = Math.floor(Math.random() * self.pBattleCards.length);
        console.log(choice);
        self.player.currentCard = self.pBattleCards[Math.floor(choice)];

        let playerCardValue = self.player.currentCard.split(' ')[1];
        let opponentCardValue = self.opponent.currentCard.split(' ')[1];
        console.log(playerCardValue + ' vs ' + opponentCardValue);

        self.highLightTargetedCard();
        setTimeout(() => {
            self.setCard('#oB1',
                self.opponent.currentCard.split(' ')[0],
                self.opponent.currentCard.split(' ')[1]);
            self.compareCards(self.oB1);
        }, 2000);
    }
});

self.oB2.click(function() {
    if (self.oB2.hasClass('clickable')) {
        self.oB2.addClass('glow');
        self.opponent.currentCard = self.oBattleCards[1];
        let choice = Math.floor(Math.random() * self.pBattleCards.length);
        console.log(choice);
        self.player.currentCard = self.pBattleCards[choice];

        let playerCardValue = self.player.currentCard.split(' ')[1];
        let opponentCardValue = self.opponent.currentCard.split(' ')[1];
        console.log(playerCardValue + ' vs ' + opponentCardValue);

        self.highLightTargetedCard();
        setTimeout(() => {
            self.setCard('#oB2',
                self.opponent.currentCard.split(' ')[0],
                self.opponent.currentCard.split(' ')[1]);
            self.compareCards(self.oB2);
        }, 2000);
    }
});

self.oB3.click(function() {
    if (self.oB3.hasClass('clickable')) {
        self.oB3.addClass('glow');
        self.opponent.currentCard = self.oBattleCards[2];
        let choice = Math.floor(Math.random() * self.pBattleCards.length);
        console.log(choice);
        self.player.currentCard = self.pBattleCards[choice];

        let playerCardValue = self.player.currentCard.split(' ')[1];
        let opponentCardValue = self.opponent.currentCard.split(' ')[1];
        console.log(playerCardValue + ' vs ' + opponentCardValue);

        self.highLightTargetedCard();
        setTimeout(() => {
            self.setCard('#oB3',
                self.opponent.currentCard.split(' ')[0],
                self.opponent.currentCard.split(' ')[1]);
            self.compareCards(self.ob3);
        }, 2000);
    }
});