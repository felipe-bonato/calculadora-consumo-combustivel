import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch } from "react";
import { calculateConsumption } from "./consumptionFormula";

interface TruckData {
	licensePlate: string,
	model: string,
	fuelTankCapacity: number,
	maxLoad: number,
	avgComsumption: number,
	distanceTraveled: number

}

export const TruckForm = ({ setConsumption }: { setConsumption: Dispatch<React.SetStateAction<number>> }) => {
	const formik = useFormik({
		initialValues: {
			licensePlate: '',
			model: '',
			fuelTankCapacity: 0,
			maxLoad: 0,
			avgComsumption: 0,
			distanceTraveled: 0
		},
		onSubmit: (
			values: TruckData,
		) => {
			const consumption = calculateConsumption(
				values.maxLoad,
				values.avgComsumption,
				values.distanceTraveled
			)
			setConsumption(consumption)
			//alert(JSON.stringify(values, null, 2));
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