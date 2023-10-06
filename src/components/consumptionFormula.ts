
export const calculateConsumption = (
	maxLoadInTons: number,
	avgConsumptionInLitersPerHundredKm: number,
	distanceTraveledInKm: number,
) => {
	const maxLoadInKg = maxLoadInTons * 1000
	const avgConsumptionInLitersPerKm = avgConsumptionInLitersPerHundredKm / 100

	const loadPerDistanceInKgPerKm = maxLoadInKg / distanceTraveledInKm
	const avgConsumptionPerLoadPerDistanceInLitersPerTonPerKm = avgConsumptionInLitersPerKm / loadPerDistanceInKgPerKm
	return avgConsumptionPerLoadPerDistanceInLitersPerTonPerKm
}