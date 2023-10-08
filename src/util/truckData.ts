export interface TruckData {
	licensePlate: string,
	model: string,
	fuelTankCapacity: number,
	maxLoad: number,
	avgComsumption: number,
	distanceTraveled: number

}

export const isEquals = (a: TruckData, b: TruckData): boolean => {
	return a.licensePlate === b.licensePlate
		&& a.model === b.model
		&& a.fuelTankCapacity === b.fuelTankCapacity
		&& a.maxLoad === b.maxLoad
		&& a.avgComsumption === b.avgComsumption
		&& a.distanceTraveled === b.distanceTraveled
}

export const isInstanceOfTruckData = (obj: unknown): boolean => {
	return typeof obj === "object"
		&& obj !== null
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

export const isInstanceOfTruckConsumption = (obj: unknown): boolean => {
	return typeof obj === "object"
		&& obj !== null
		&& "truck" in obj
		&& "consumption" in obj
		&& isInstanceOfTruckData((obj as TruckConsumption).truck)
}

export const areInstancesOfTruckConsumption = (obj: unknown): boolean => {
	return typeof obj === "object"
		&& obj !== null
		&& Array.isArray(obj)
		&& ((obj as Array<any>).length === 0
			|| (obj as Array<any>).every(isInstanceOfTruckConsumption))
}

export const isTruckDataValid = (truck: TruckData): boolean => {
	return truck.licensePlate.length > 0
		&& truck.model.length > 0
		&& truck.fuelTankCapacity > 0
		&& truck.maxLoad > 0
		&& truck.avgComsumption > 0
		&& truck.distanceTraveled > 0
}

export const truckTrim = (truck: TruckData): TruckData => {
	return {
		licensePlate: truck.licensePlate.trim(),
		model: truck.model.trim(),
		fuelTankCapacity: truck.fuelTankCapacity,
		maxLoad: truck.maxLoad,
		avgComsumption: truck.avgComsumption,
		distanceTraveled: truck.distanceTraveled
	}

}

const isValidNumber = (value: any): boolean => {
	return typeof value === "number" && !isNaN(value)
}

const isValidLicensePlates = (licensePlate: string): boolean => {
	return !/^[A-Za-z]{3}[\d]{4}$/i.test(licensePlate) // Old plates: ABC1234
		&& !/^[A-Za-z]{3}[\d][A-Za-z][\d]{2}$/i.test(licensePlate) // Mercosul plates: ABC1D34
}

// Due to the requisites not stating any validation library, validation was hand-written
export const validateTruck = (values: TruckData): TruckDataErrors => {
	const errors: TruckDataErrors = {} as TruckDataErrors

	// License plate
	if (!values.licensePlate) {
		errors.licensePlate = "Campo obrigatório"
	} else if (isValidLicensePlates(values.licensePlate)) {
		errors.licensePlate = `A placa "${values.licensePlate}" é invalida. Formatos aceitos são "ABC1234" ou "ABC1D23."`
	}

	// Model
	if (!values.model || values.model.length < 1) {
		errors.model = "Campo obrigatório."
	}

	// Fuel tank capacity
	if (!values.fuelTankCapacity) {
		errors.fuelTankCapacity = "Campo obrigatório."
	} else if (!isValidNumber(values.fuelTankCapacity)) {
		errors.fuelTankCapacity = `Capacidade de tanque "${values.fuelTankCapacity}" não é um número válido`
	} else if (values.fuelTankCapacity <= 0) {
		errors.fuelTankCapacity = `Valor "${values.fuelTankCapacity}" é invalido. Valores aceitos são maiores que 0.`
	}

	// Max load
	if (!values.maxLoad) {
		errors.maxLoad = "Campo obrigatório."
	} else if (!isValidNumber(values.maxLoad)) {
		errors.maxLoad = `Carga máxima "${values.maxLoad}" não é um número válido`
	} else if (values.maxLoad <= 0) {
		errors.maxLoad = `Valor "${values.maxLoad}" é invalido. Valores aceitos são maiores que 0.`
	}

	// Avg consumption
	if (!values.avgComsumption) {
		errors.avgComsumption = "Campo obrigatório."
	} else if (!isValidNumber(values.avgComsumption)) {
		errors.fuelTankCapacity = `Consumo médio "${values.fuelTankCapacity}" não é um número válido`
	} else if (values.avgComsumption <= 0) {
		errors.avgComsumption = `Valor "${values.avgComsumption}" é invalido. Valores aceitos são maiores que 0.`
	}

	// Distance traveled
	if (!values.distanceTraveled) {
		errors.distanceTraveled = "Campo obrigatório."
	} else if (!isValidNumber(values.distanceTraveled)) {
		errors.distanceTraveled = `Distância percorrida "${values.distanceTraveled}" não é um número válido`
	} else if (values.distanceTraveled <= 0) {
		errors.distanceTraveled = `Valor "${values.distanceTraveled}" é invalido. Valores aceitos são maiores que 0.`
	}

	return errors
}
