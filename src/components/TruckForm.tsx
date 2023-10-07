import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { Form, Formik, useFormikContext } from "formik";
import { Dispatch, SetStateAction } from "react";
import { calculateConsumption } from "../util/consumptionFormula";
import {
	TruckConsumption,
	TruckData,
	TruckDataErrors,
	isEquals,
	isTruckDataValid,
	isValidLicensePlates
} from "../util/truckData";

// Due to the requisites not stating any validation library, validation was hand-written
const validate = (values: TruckData) => {
	const errors: TruckDataErrors = {} as TruckDataErrors

	if (isValidLicensePlates(values.licensePlate)) {
		errors.licensePlate = `A Placa "${values.licensePlate}" é invalida.Formatos aceitos são "ABC1234" ou "ABC1D23."`
	} else if (values.model.length < 1) {
		errors.model = "Campo obrigatório."
	} else if (!values.fuelTankCapacity) {
		errors.fuelTankCapacity = "Campo obrigatório."
	} else if (values.fuelTankCapacity <= 0) {
		errors.fuelTankCapacity = `Valor "${values.fuelTankCapacity}" é invalido. Valores aceitos são igual ou maiores que 1.`
	} else if (!values.maxLoad) {
		errors.maxLoad = "Campo obrigatório."
	} else if (values.maxLoad <= 0) {
		errors.maxLoad = `Valor "${values.maxLoad}" é invalido. Valores aceitos são maiores que 0.`
	} else if (!values.avgComsumption) {
		errors.avgComsumption = "Campo obrigatório."
	} else if (values.avgComsumption <= 0) {
		errors.avgComsumption = `Valor "${values.avgComsumption}" é invalido. Valores aceitos são maiores que 0.`
	} else if (!values.distanceTraveled) {
		errors.distanceTraveled = "Campo obrigatório."
	} else if (values.distanceTraveled <= 0) {
		errors.distanceTraveled = `Valor "${values.distanceTraveled}" é invalido. Valores aceitos são maiores que 0.`
	}

	return errors
}


const TruckTextField = (
	{
		id,
		prettyName,
		valueType = "text",
		unit = undefined,
	}: {
		id: keyof TruckData,
		prettyName: string,
		valueType: "number" | "text",
		unit: string | undefined,
	}
) => {
	const formik = useFormikContext<TruckData>();
	return <TextField
		required
		id={id}
		label={prettyName}
		name={id}
		type={valueType}
		InputProps={
			unit ? { endAdornment: <InputAdornment position="end">{unit}</InputAdornment> }
				: undefined
		}
		value={formik.values[id]}
		onChange={formik.handleChange}
		onBlur={formik.handleBlur}
		error={formik.touched[id] && Boolean(formik.errors[id])}
		helperText={formik.touched[id] && formik.errors[id]}
	/>
}

export const TruckForm = ({ trucksConsumption, setTrucksConsumption }: {
	trucksConsumption: TruckConsumption[],
	setTrucksConsumption: Dispatch<SetStateAction<TruckConsumption[]>>
}) => {
	const onSubmit = (truck: TruckData) => {
		if ((
			trucksConsumption.length === 0
			|| !isEquals(truck, trucksConsumption[0].truck)
		) && isTruckDataValid(truck)
		) {
			const truckLastCalculated = {
				truck: truck,
				consumption: calculateConsumption(
					// We know that this MUST be of type number because the function
					// `isTruckDataValid` checks for this. So we force this to be a number
					truck.maxLoad as number,
					truck.avgComsumption as number,
					truck.distanceTraveled as number)
			}
			const newTrucksConsumption = [truckLastCalculated, ...trucksConsumption]

			setTrucksConsumption(newTrucksConsumption)
			localStorage.setItem("trucksConsumption", JSON.stringify(newTrucksConsumption))
		}
	}

	return (
		<div>
			<Formik
				initialValues={{
					licensePlate: '',
					model: '',
					fuelTankCapacity: undefined,
					maxLoad: undefined,
					avgComsumption: undefined,
					distanceTraveled: undefined
				}}
				validate={validate}
				onSubmit={onSubmit}
			>

				<Form>
					<Stack spacing={2}>
						<TruckTextField
							id="licensePlate"
							prettyName="Placa"
							valueType="text"
							unit={undefined}
						/>
						<TruckTextField
							id="model"
							prettyName="Modelo"
							valueType="text"
							unit={undefined}
						/>
						<TruckTextField
							id="fuelTankCapacity"
							prettyName="Capacidade do Tanque"
							valueType="number"
							unit="l"
						/>
						<TruckTextField
							id="maxLoad"
							prettyName="Carga Máxima"
							valueType="number"
							unit="t"
						/>
						<TruckTextField
							id="avgComsumption"
							prettyName="Consumo Médio"
							valueType="number"
							unit="l/100km"
						/>
						<TruckTextField
							id="distanceTraveled"
							prettyName="Distância Percorrida na Jornada"
							valueType="number"
							unit="km"
						/>
						<Button type="submit" variant="contained">
							Calcular
						</Button>
					</Stack>
				</Form>
			</Formik>
		</div >
	)
}