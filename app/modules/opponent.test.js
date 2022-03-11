import { opponent } from "./opponent";

test('Creates a new opponent with no wins.', () => {
    const testOpponent = new opponent();
    expect(testOpponent.wins).toBe(0);
});

test('Creates a new opponent with 3 wins.', () => {
    const testOpponent = new opponent(3);
    expect(testOpponent.wins).toBe(3);
});