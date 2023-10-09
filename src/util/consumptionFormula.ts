
export const calculateConsumption = (
	maxLoadInTons: number,
	avgConsumptionInLitersPerHundredKm: number,
	distanceTraveledInKm: number,
) => {
	const avgConsumptionInLiterPerKm = avgConsumptionInLitersPerHundredKm / 100

	const avgLoadPerDistanceInKgPerKm = maxLoadInTons / (distanceTraveledInKm * 0.001)
	const avgConsumptionPerLoadPerDistanceInLitersPerTonPerKm = (avgConsumptionInLiterPerKm * distanceTraveledInKm)
		/ (avgLoadPerDistanceInKgPerKm * 1000)
	return avgConsumptionPerLoadPerDistanceInLitersPerTonPerKm
}
