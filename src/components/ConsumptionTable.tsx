import { Box, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material"
import { TruckConsumption } from "../util/truckData"



export const ConsumptionTable = ({ trucksConsumption }: { trucksConsumption: TruckConsumption[] }) => {
	const theme = useTheme()

	return (
		<Box sx={{ overflow: "auto" }}>
			<Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
				<Table size="small" padding="normal">
					<TableHead>
						<TableRow>
							<TableCell>Placa</TableCell>
							<TableCell>Modelo</TableCell>
							<TableCell>Tanque</TableCell>
							<TableCell>Carga Máxima</TableCell>
							<TableCell>Consumo Médio</TableCell>
							<TableCell>Distância percorrida</TableCell>
							<TableCell>Consumo</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{trucksConsumption.map((trucksConsumption, i) => (
							<TableRow key={crypto.randomUUID()} sx={i === 0 ? { bgcolor: theme.palette.secondary.light } : undefined}>
								<TableCell>{trucksConsumption.truck.licensePlate}</TableCell>
								<TableCell>{trucksConsumption.truck.model}</TableCell>
								<TableCell>{trucksConsumption.truck.fuelTankCapacity} l</TableCell>
								<TableCell>{trucksConsumption.truck.maxLoad} t</TableCell>
								<TableCell>{trucksConsumption.truck.avgComsumption} l/100km</TableCell>
								<TableCell>{trucksConsumption.truck.distanceTraveled} km</TableCell>
								<TableCell>{trucksConsumption.consumption.toPrecision(3)} l/t/km</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table >
			</Box>
		</Box >
	)

}
