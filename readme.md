# Smack

## Game Flow



```mermaid

---

config:

&nbsp; layout: elk

---

flowchart TD

&nbsp;   %% Initialization

&nbsp;   init\["Start"] -- "Divide deck by color (Red/Black). Players shuffle." --> startTurn\["Player clicks deck"]



&nbsp;   %% Pre-Turn \& End-Game Check

&nbsp;   startTurn --> checkDrawCards{"Can both players draw a card?"}

&nbsp;   checkDrawCards -- "No" --> determineWinnerOnDeckOut{"Is Player out of cards?"}

&nbsp;   determineWinnerOnDeckOut -- "Yes" --> loseGame\["Lose: No cards to draw"]

&nbsp;   determineWinnerOnDeckOut -- "No (Opponent is out)" --> winGame\["Win! Opponent has no cards"]

&nbsp;   checkDrawCards -- "Yes" --> preCompare\["Draw 1 card each. Increment turn count."]



&nbsp;   %% Main Turn Loop

&nbsp;   preCompare --> compareCards{"Compare cards"}



&nbsp;   %% Special Ace vs. 2 Rule

&nbsp;   compareCards -- "Player has Ace \& Opponent has 2" --> resolveNormalLoss

&nbsp;   compareCards -- "Opponent has Ace \& Player has 2" --> resolveNormalWin



&nbsp;   %% Standard Comparison

&nbsp;   compareCards -- "Player > Opponent" --> opponentChallenge{"Opponent challenges?"}

&nbsp;   compareCards -- "Opponent > Player" --> playerChallenge{"Player challenges?"}

&nbsp;   compareCards -- "Values are Equal" --> battleCheck



&nbsp;   %% Challenge Sub-flow

&nbsp;   opponentChallenge -- "No" --> resolveNormalWin

&nbsp;   opponentChallenge -- "Yes" --> drawOpponentChallenge\["Opponent draws 1 card"]

&nbsp;   drawOpponentChallenge --> compareOpponentChallenge{"P's original vs. O's new card"}

&nbsp;   compareOpponentChallenge -- "Opponent wins" --> resolveChallengeLoss

&nbsp;   compareOpponentChallenge -- "Player wins" --> resolveChallengeWin

&nbsp;   compareOpponentChallenge -- "Cards are equal" --> battleCheck



&nbsp;   playerChallenge -- "No" --> resolveNormalLoss

&nbsp;   playerChallenge -- "Yes" --> drawPlayerChallenge\["Player draws 1 card"]

&nbsp;   drawPlayerChallenge --> comparePlayerChallenge{"O's original vs. P's new card"}

&nbsp;   comparePlayerChallenge -- "Player wins" --> resolveChallengeWin

&nbsp;   comparePlayerChallenge -- "Opponent wins" --> resolveChallengeLoss

&nbsp;   comparePlayerChallenge -- "Cards are equal" --> battleCheck



&nbsp;   %% Battle Sub-flow

&nbsp;   battleCheck --> checkCardsForBattle{"Both have at least 4 cards?"}

&nbsp;   checkCardsForBattle -- "No" --> loseGame\["A player cannot continue battle; game over."]

&nbsp;   checkCardsForBattle -- "Yes" --> setupBattle\["Battle! Each places 3 cards face down."]

&nbsp;   setupBattle --> selectBattleCards\["Both sides select a new card from opponent's 3 cards."]

&nbsp;   selectBattleCards --> compareBattleCards{"Compare the two newly selected cards"}

&nbsp;   compareBattleCards -- "Player > Opponent" --> resolveBattleWin

&nbsp;   compareBattleCards -- "Opponent > Player" --> resolveBattleLoss

&nbsp;   compareBattleCards -- "Equal" --> battleCheck



&nbsp;   %% Resolution Nodes

&nbsp;   subgraph Turn Resolution

&nbsp;       direction LR

&nbsp;       resolveNormalWin("Win Turn: Keep your card; Opponent's card discarded")

&nbsp;       resolveNormalLoss("Lose Turn: Your card discarded; Opponent keeps theirs")

&nbsp;       resolveChallengeWin("Win Challenge: Keep your cards; Opponent's discarded")

&nbsp;       resolveChallengeLoss("Lose Challenge: Your cards discarded; Opponent keeps theirs")

&nbsp;       resolveBattleWin("Win Battle: Keep all your cards; Opponent's discarded")

&nbsp;       resolveBattleLoss("Lose Battle: All your cards discarded; Opponent keeps theirs")

&nbsp;   end



&nbsp;   %% Link Resolutions to Next Turn

&nbsp;   resolveNormalWin \& resolveNormalLoss --> startTurn

&nbsp;   resolveChallengeWin \& resolveChallengeLoss --> startTurn

&nbsp;   resolveBattleWin \& resolveBattleLoss --> startTurn

&nbsp;   

&nbsp;   %% End Game

&nbsp;   winGame --> playAgain{"Play again?"}

&nbsp;   loseGame --> playAgain

&nbsp;   playAgain --> init



&nbsp;   %% Styling

&nbsp;   style init fill:#000000,color:#FFFFFF

&nbsp;   style playAgain fill:#000000,color:#FFFFFF

&nbsp;   style startTurn fill:#FFCDD2

&nbsp;   style checkDrawCards fill:#4CAF50,color:#FFFFFF

&nbsp;   style determineWinnerOnDeckOut fill:#D50000,color:#FFFFFF

&nbsp;   style preCompare fill:#FFD600

&nbsp;   style compareCards fill:#FF6D00,color:#FFFFFF

&nbsp;   style battleCheck fill:#B71C1C,color:#FFFFFF

&nbsp;   style setupBattle fill:#FFD600

&nbsp;   style compareBattleCards fill:#B71C1C,color:#FFFFFF

&nbsp;   style loseGame fill:#D50000,color:#FFFFFF

&nbsp;   style opponentChallenge fill:#BBDEFB

&nbsp;   style playerChallenge fill:#BBDEFB

&nbsp;   style comparePlayerChallenge fill:#42A5F5,color:#FFFFFF

&nbsp;   style compareOpponentChallenge fill:#42A5F5,color:#FFFFFF

&nbsp;   style winGame fill:#00C853,color:#FFFFFF

&nbsp;   style resolveNormalWin fill:#A5D6A7

&nbsp;   style resolveNormalLoss fill:#EF9A9A

&nbsp;   style resolveChallengeWin fill:#66BB6A

&nbsp;   style resolveChallengeLoss fill:#E57373

&nbsp;   style resolveBattleWin fill:#2E7D32,color:#FFFFFF

&nbsp;   style resolveBattleLoss fill:#C62828,color:#FFFFFF

```

