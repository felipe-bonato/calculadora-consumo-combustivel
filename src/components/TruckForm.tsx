import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { calculateConsumption } from "../util/consumptionFormula";
import { TruckConsumption, TruckData, TruckDataErrors, isEquals } from "../util/truckData";

const validate = (values: TruckData) => {
	const errors: TruckDataErrors = {} as TruckDataErrors

	if (!/^[A-Za-z]{3}[\d]{4}$/i.test(values.licensePlate)
		&& !/^[A-Za-z]{3}[\d][A-Za-z][\d]{2}$/i.test(values.licensePlate)
	) {
		errors.licensePlate = `A Placa "${values.licensePlate}" é invalida. Formatos aceitos são "ABC1234" ou "ABC1D23."`
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

export const TruckForm = ({ trucksConsumption, setTrucksConsumption }: { trucksConsumption: TruckConsumption[], setTrucksConsumption: Dispatch<SetStateAction<TruckConsumption[]>> }) => {
	const formik = useFormik({
		initialValues: {
			licensePlate: '',
			model: '',
			fuelTankCapacity: 0,
			maxLoad: 0,
			avgComsumption: 0,
			distanceTraveled: 0
		},
		validate: validate,
		onSubmit: (truck: TruckData, { setSubmitting }: FormikHelpers<TruckData>) => {
			if (trucksConsumption.length === 0 || !isEquals(truck, trucksConsumption[0].truck)) {
				const truckLastCalculated = {
					truck: truck,
					consumption: calculateConsumption(
						truck.maxLoad,
						truck.avgComsumption,
						truck.distanceTraveled)
				}
				const newTrucksConsumption = [truckLastCalculated, ...trucksConsumption]
				setTrucksConsumption(newTrucksConsumption)
				localStorage.setItem("trucksConsumption", JSON.stringify(newTrucksConsumption))
			}
		}
	})


	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<Stack spacing={2}>
					<TextField
						required
						id="licensePlate"
						label="Placa"
						name="licensePlate"
						/*InputProps={{ endAdornment: <InputAdornment position="end">kg</InputAdornment> }}*/
						value={formik.values.licensePlate}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.licensePlate && Boolean(formik.errors.licensePlate)}
						helperText={formik.touched.licensePlate && formik.errors.licensePlate}
					/>
					<TextField
						required
						id="model"
						label="Modelo"
						name="model"
						/*InputProps={{ endAdornment: <InputAdornment position="end">kg</InputAdornment> }}*/
						value={formik.values.model}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.model && Boolean(formik.errors.model)}
						helperText={formik.touched.model && formik.errors.model}
					/>
					<TextField
						required
						id="fuelTankCapacity"
						label="Capacidade do Tanque"
						name="fuelTankCapacity"
						type="number"
						InputProps={{ endAdornment: <InputAdornment position="end">l</InputAdornment> }}
						value={formik.values.fuelTankCapacity}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.fuelTankCapacity && Boolean(formik.errors.fuelTankCapacity)}
						helperText={formik.touched.fuelTankCapacity && formik.errors.fuelTankCapacity}
					/>
					<TextField
						required
						id="maxLoad"
						label="Carga Máxima"
						name="maxLoad"
						type="number"
						InputProps={{ endAdornment: <InputAdornment position="end">t</InputAdornment> }}
						value={formik.values.maxLoad}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.maxLoad && Boolean(formik.errors.maxLoad)}
						helperText={formik.touched.maxLoad && formik.errors.maxLoad}
					/>
					<TextField
						required
						id="avgComsumption"
						label="Consumo Médio"
						name="avgComsumption"
						type="number"
						InputProps={{ endAdornment: <InputAdornment position="end">l/100km</InputAdornment> }}
						value={formik.values.avgComsumption}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.avgComsumption && Boolean(formik.errors.avgComsumption)}
						helperText={formik.touched.avgComsumption && formik.errors.avgComsumption}
					/>
					<TextField
						required
						id="distanceTraveled"
						label="Distância Percorrida na Jornada"
						name="distanceTraveled"
						type="number"
						InputProps={{ endAdornment: <InputAdornment position="end">km</InputAdornment> }}
						value={formik.values.distanceTraveled}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.distanceTraveled && Boolean(formik.errors.distanceTraveled)}
						helperText={formik.touched.distanceTraveled && formik.errors.distanceTraveled}
					/>
					<Button type="submit" variant="contained">
						Calcular
					</Button>
				</Stack>
				{/*<label htmlFor="licensePlate">Placa</label>
				<Field id="licensePlate" name="licensePlate" placeholder="" />

				<label htmlFor="model">Modelo</label>
				<Field id="model" name="model" placeholder="" />

				<label htmlFor="fuelTankCapacity">Capacidade do Tanque</label>
				<Field id="fuelTankCapacity" name="fuelTankCapacity" type="number" placeholder="" />

				<label htmlFor="maxLoad">Carga Máxima ()</label>
				<Field id="maxLoad" name="maxLoad" type="number" placeholder="" />

				<label htmlFor="avgComsumption">Consumo Médio</label>
				<Field id="avgComsumption" name="avgComsumption" type="number" placeholder="" />

				<label htmlFor="distanceTraveled">Distância Percorrida na Jornada</label>
	<Field id="distanceTraveled" name="distanceTraveled" type="number" placeholder="" />*/}


			</form>
		</div>
	)
}