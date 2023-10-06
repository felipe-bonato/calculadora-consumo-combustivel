import { calculateConsumption } from "./consumptionFormula";

test('renders learn react link', () => {
	expect(calculateConsumption(10, 175, 1000)).toBe(0.175);
});
