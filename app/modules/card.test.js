/**
 * @jest-environment jsdom
 */

import { card } from "./card";

test('Creates a valid card.', () => {
    const testCard = new card('spades', 1);
    expect(testCard.suite).toBe('spades');
    expect(testCard.value).toBe(1);
});

test('Attempts to create a card with an invalid value.', () => {
    expect(() => { new card('spades', 15); }).toThrowError('invalid value');
    expect(() => { new card('spades', 0); }).toThrowError('invalid value');
});

test('Attempts to create a card with an invalid suite.', () => {
    expect(() => { new card('blubs', 1); }).toThrowError('invalid suite');
    expect(() => { new card('fpades', 1); }).toThrowError('invalid suite');
});

test('Writes card html to a given element.', () => {
    const testCard = new card('spades', 1);
    var testElement = document.createElement('div');
    testCard.showCard(testElement);
    expect(testElement.innerHTML).toEqual(expect.stringContaining('<div class="index">'));
});

test('Clears a given element.', () => {
    const testCard = new card('spades', 1);
    var testElement = document.createElement('div');
    testCard.hideCard(testElement);
    expect(testElement.innerHTML).toBe('');
});