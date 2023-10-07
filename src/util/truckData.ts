export interface TruckData {
	licensePlate: string,
	model: string,
	fuelTankCapacity: number | undefined,
	maxLoad: number | undefined,
	avgComsumption: number | undefined,
	distanceTraveled: number | undefined

}

export const isEquals = (a: TruckData, b: TruckData): boolean => {
	return a.licensePlate === b.licensePlate
		&& a.model === b.model
		&& a.fuelTankCapacity === b.fuelTankCapacity
		&& a.maxLoad === b.maxLoad
		&& a.avgComsumption === b.avgComsumption
		&& a.distanceTraveled === b.distanceTraveled
}

export const isInstanceOfTruckData = (obj: any): boolean => {
	return typeof obj === "object"
		&& "licensePlate" in obj
		&& "model" in obj
		&& "fuelTankCapacity" in obj
		&& "maxLoad" in obj
		&& "avgComsumption" in obj
		&& "distanceTraveled" in obj
}

export interface TruckDataErrors {
	licensePlate: string,
	model: string,
	fuelTankCapacity: string,
	maxLoad: string,
	avgComsumption: string,
	distanceTraveled: string
}


export interface TruckConsumption {
	truck: TruckData,
	consumption: number,
}

export const isInstanceOfTruckConsumption = (obj: any): boolean => {
	return typeof obj === "object"
		&& "truck" in obj
		&& "consumption" in obj
		&& isInstanceOfTruckData((obj as TruckConsumption).truck)
}

export const areInstancesOfTruckConsumption = (obj: any): boolean => {
	return typeof obj === "object"
		&& Array.isArray(obj)
		&& ((obj as Array<any>).length === 0
			|| (obj as Array<any>).every(isInstanceOfTruckConsumption))
}

export const isTruckDataValid = (truck: TruckData): boolean => {
	return truck.fuelTankCapacity !== undefined &&
		truck.maxLoad !== undefined &&
		truck.avgComsumption !== undefined &&
		truck.distanceTraveled !== undefined
}

export const isValidLicensePlates = (licensePlate: string): boolean => {
	return !/^[A-Za-z]{3}[\d]{4}$/i.test(licensePlate) // Old plates: ABC1234
		&& !/^[A-Za-z]{3}[\d][A-Za-z][\d]{2}$/i.test(licensePlate) // Mercosul plates: ABC1D34
}