import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { TruckConsumption } from "../util/truckData"


export const Consumption = ({ trucksConsumption }: { trucksConsumption: TruckConsumption[] }) => {

	return (
		<Table size="small" padding="normal">
			<TableHead>
				<TableRow>
					<TableCell>Placa</TableCell>
					<TableCell>Modelo</TableCell>
					<TableCell>Tanque (l)</TableCell>
					<TableCell>Carga Máxima (t)</TableCell>
					<TableCell>Consumo Médio (l/100km)</TableCell>
					<TableCell>Distância percorrida (km)</TableCell>
					<TableCell>Consumo (l/t/km)</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{trucksConsumption.map(trucksConsumption => (
					<TableRow key={crypto.randomUUID()}>
						<TableCell>{trucksConsumption.truck.licensePlate}</TableCell>
						<TableCell>{trucksConsumption.truck.model}</TableCell>
						<TableCell>{trucksConsumption.truck.fuelTankCapacity}</TableCell>
						<TableCell>{trucksConsumption.truck.maxLoad}</TableCell>
						<TableCell>{trucksConsumption.truck.avgComsumption}</TableCell>
						<TableCell>{trucksConsumption.truck.distanceTraveled}</TableCell>
						<TableCell>{trucksConsumption.consumption.toPrecision(3)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table >
	)
}