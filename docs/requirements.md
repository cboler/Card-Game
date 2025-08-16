# Smack: Progressive Web App Requirements Specification

## Note:
Obsolete in favor of War-of-Attrition-Requirements.md

A few of the ideas presented here may or may not be feasible. I would like to test the faction idea (including bonuses), and the names for each faction sounded cool. I would not, however, like to use the special circular logic for face cards (the special face card hierarchy).

## 1. Introduction

**Smack** is a digital implementation of a strategic card game where two players battle using faction-based cards with special abilities and combat bonuses. Players receive two suits each from a standard 52-card deck, with each suit representing a different faction with unique tactical advantages.

This document specifies the functional requirements for the Angular Progressive Web App implementation and serves as the single source of truth for development.

---

## 2. Game Setup & Rules

### 2.1. Deck Composition & Factions

**Factions**:
- **Hearts**: The Lovers
- **Clubs**: Fighters  
- **Spades**: Workers
- **Diamonds**: Rich

**Deck Distribution Modes** (selectable in settings):
1. **Fixed Assignment**: Player 1 gets Hearts+Clubs, Player 2 gets Spades+Diamonds
2. **Random Assignment**: Two suits randomly assigned to each player
3. **Player Choice**: Players select their two preferred suits

### 2.2. Card Values & Combat System

**Base Values**:
- Number cards: Face value (2=2, 3=3, ..., 10=10)
- Face cards: All worth 10 base points
- **Special Face Card Hierarchy**: Queen > King > Jack > Queen (circular dominance)
- **Special Rule**: Any 2 gains +10 against any Ace (making 2 = 12 vs Ace)

**Suit Combat Bonuses** (toggle-able setting):
- **Clubs**: +1 vs Spades and Hearts
- **Diamonds**: +1 vs Hearts and Clubs  
- **Spades**: +1 vs Diamonds and Hearts
- **Hearts**: +1 vs Diamonds and Clubs
- *Bonuses stack with all other modifiers*

### 2.3. Round Structure

**Basic Round**:
1. Both players reveal top card from their deck
2. Values are compared (including all bonuses)
3. Higher value wins the round
4. Winner keeps their cards, loser's cards go to "bone yard" (discard)

**Challenge Phase**:
- **Trigger**: Losing player may challenge the result
- **Restriction**: Cannot challenge if losing card was a 2 that beat an Ace
- **Process**: Challenger draws next card from deck and compares it to opponent's original card
- **Result**: If challenger's new card wins, challenger takes the round
- **No Re-challenges**: Challenge results cannot be challenged again

**Battle Situation**:
- **Trigger**: When any two revealed cards have the same base value (regardless of suit)
- **Process**:
  1. Each player draws 3 cards face-down
  2. Each player selects one of their opponent's 3 face-down cards to reveal
  3. The two revealed cards are compared
  4. Higher value wins (cannot be challenged)
- **Stakes**: Winner keeps their cards, loser's cards go to bone yard

### 2.4. Win Conditions

- Player loses when they cannot complete a required action (0 cards remaining)
- Game ends immediately when a player has no cards left

---

## 3. User Interface Requirements

### 3.1. Game Settings Screen

**Deck Distribution**:
- [ ] Fixed Assignment (Hearts+Clubs vs Spades+Diamonds)
- [ ] Random Assignment  
- [ ] Player Choice

**Suit Bonuses**:
- [ ] Classic Mode (no suit bonuses)
- [ ] Tactical Mode (suit combat bonuses enabled)

**General Settings**:
- [ ] Sound effects toggle
- [ ] Animation speed settings
- [ ] Card theme selection

### 3.2. Main Game Interface

**Game Board Layout**:
- **Opponent Area** (top):
  - Deck indicator with card count
  - Drawn card display area
  - Battle card zones (when applicable)
- **Player Area** (bottom):
  - Deck with card count and draw action
  - Drawn card display area  
  - Battle card zones (when applicable)
- **Center Area**:
  - Round result messaging
  - Challenge/Battle status indicators
  - Action buttons (Draw, Challenge, Select Battle Card)

**Information Display**:
- Current faction assignments for each player
- Active bonuses indicator
- Round-by-round result log
- Bone yard card count

### 3.3. Interactive Elements

**Card Actions**:
- Click/tap to draw next card
- Challenge button (when applicable)
- Battle card selection (click opponent's face-down cards)

**Visual Feedback**:
- Highlight winning cards
- Show value calculations (base + bonuses)
- Animate card movements and reveals
- Clear messaging for special situations (2 vs Ace, battles, etc.)

### 3.4. Responsive Design

- Mobile-first responsive layout
- Touch-friendly interaction zones
- Landscape and portrait orientation support
- Scalable card graphics and text

---

## 4. Technical Requirements

### 4.1. Angular Architecture

- **Framework**: Angular (latest LTS) with PWA support
- **State Management**: Angular services for game state
- **Routing**: Home, Game, Settings, Rules screens
- **Testing**: Unit tests for all game logic, integration tests for UI flows

### 4.2. Progressive Web App Features

- **Offline Support**: Service worker for offline gameplay
- **Installability**: Web app manifest with icons
- **Performance**: Fast loading, smooth animations
- **Cross-platform**: Works on mobile, tablet, desktop

### 4.3. Game Logic Services

**Core Services**:
- `GameEngineService`: Main game logic and state management
- `DeckService`: Card shuffling, dealing, and deck management  
- `CombatService`: Value calculations, bonus applications
- `SettingsService`: Game mode and preference persistence

**Key Algorithms**:
- Card value calculation with stacking bonuses
- Challenge eligibility checking
- Battle situation detection and resolution
- Win/loss condition evaluation

---

## 5. Edge Case Handling

### 5.1. Insufficient Cards

- **Mid-Battle**: Player with insufficient cards for battle (< 3 cards) loses immediately
- **Mid-Challenge**: Player with no cards to challenge loses immediately
- **Empty Deck**: Player with no cards to draw loses immediately

### 5.2. Special Situations

- **2 vs Ace**: Clear messaging that this cannot be challenged
- **Circular Face Cards**: Proper handling of Queen/King/Jack relationships
- **Multiple Battles**: Handle consecutive battles from repeated ties
- **Bonus Stacking**: Clear display of all active bonuses in calculations

---

## 6. Accessibility & UX

- **WCAG 2.1 AA Compliance**: Screen reader support, keyboard navigation
- **Visual Clarity**: High contrast mode, scalable fonts
- **Help System**: In-game rules reference, tutorial mode
- **Error Prevention**: Clear action confirmations, undo capabilities where appropriate

---

## 7. Future Enhancements (Out of Scope)

- Online multiplayer functionality
- Tournament modes
- AI difficulty levels
- Player statistics and history
- Custom faction themes and abilities

---

*This requirements.md serves as the definitive specification for the Smack PWA development.*

## Upgrades to "Smack"

A standard deck of 52 cards is used. Each suite represents a faction, hearts--the lovers, clubs--fighters, spades--workers, and the diamonds--rich.
Each number and face card will represent a different unit belonging to each faction. Each unit is worth face value, face cards are worth ten points, but a King beats a Jack, a Queen beats a King, and a Jack beats a Queen. Any two gains +10 against any Ace. In addition, Clubs are worth +1 point against Spades and Hearts. Diamonds are worth +1 point against Hearts and Clubs. Spades are worth +1 point against Diamonds and Hearts. Hearts are worth +1 point against Diamonds and Clubs.  

Each player gets two suites of cards in their deck. Decks are shuffled. Each round the top card is revealed of each player's deck and then their values are compared. The player with the higher value wins that round. Unless the losing player's original card was a 2, the losing player can challenge the result by drawing the next card from the top of their deck. If the second card beats their opponents original card, the challenger wins. The results of a challenge can not be challenged themselves, but they may result in a special "battle" situation if they are the same base value (ie. two of any suite same base value). Should both cards be the same base value of any suite, a special "battle situation happens" When a battle happens, each player draws the next three cards from the top of their deck and places them face down in front of them. Each player then selects one of their opponent's 3 cards to reveal the next two cards to compare. The winner of this comparison cannot be challenged. The winner of the round keeps their cards and shuffles them back into their deck. The loser's cards are discarded. If a player doesn't have enough cards to play anymore, they lose the game.