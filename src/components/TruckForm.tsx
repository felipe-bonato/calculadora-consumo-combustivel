import { Button, InputAdornment, Stack, TextField } from "@mui/material"
import { Form, Formik, useFormikContext } from "formik"
import { Dispatch, SetStateAction } from "react"
import { calculateConsumption } from "../util/consumptionFormula"
import {
	TruckConsumption,
	TruckData,
	isEquals,
	isTruckDataValid,
	truckTrim,
	validateTruck
} from "../util/truckData"



const TruckTextField = ({
	id,
	prettyName,
	valueType = "text",
	unit = undefined,
}: {
	id: keyof TruckData,
	prettyName: string,
	valueType: "number" | "text",
	unit?: string,
}) => {
	const formik = useFormikContext<TruckData>()
	return <TextField
		id={id}
		label={prettyName}
		name={id}
		type={valueType}
		InputProps={unit ?
			{ endAdornment: <InputAdornment position="end">{unit}</InputAdornment> }
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
				truck: truckTrim(truck),
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
					licensePlate: "",
					model: "",
					// The `as unknown as number` is needed because of this react error:
					// https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
					// The only way that I found to have empty initial values and not cause the
					// above error is this. It's ugly, but I haven't found a better solution.
					fuelTankCapacity: "" as unknown as number,
					maxLoad: "" as unknown as number,
					avgComsumption: "" as unknown as number,
					distanceTraveled: "" as unknown as number
				}}
				validate={validateTruck}
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
							prettyName="Capacidade do tanque"
							valueType="number"
							unit="l"
						/>
						<TruckTextField
							id="maxLoad"
							prettyName="Carga máxima"
							valueType="number"
							unit="t"
						/>
						<TruckTextField
							id="avgComsumption"
							prettyName="Consumo médio"
							valueType="number"
							unit="l/100km"
						/>
						<TruckTextField
							id="distanceTraveled"
							prettyName="Distância percorrida na jornada"
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
