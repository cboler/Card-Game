import { player } from "./player";

test('Creates a new player with no wins.', () => {
    const testPlayer = new player();
    expect(testPlayer.wins).toBe(0);
});

test('Creates a new player with 3 wins.', () => {
    const testPlayer = new player(3);
    expect(testPlayer.wins).toBe(3);
});