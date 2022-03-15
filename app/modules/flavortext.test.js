import { flavortext } from "./flavortext";

test('Creates a new flavortext object.', () => {
    const testFlavorText = new flavortext();
    expect(testFlavorText).not.toBeNull();
});