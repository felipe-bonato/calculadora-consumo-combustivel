import { calculateConsumption } from "./consumptionFormula"

test('calculates consumption formula', () => {
	expect(calculateConsumption(10, 175, 1000)).toBe(0.175)
	// expect(calculateConsumption(70, 400, 200)).toBe(0.11)
})
