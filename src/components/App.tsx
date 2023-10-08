import {
	AppBar,
	Button,
	Container,
	CssBaseline,
	Grid,
	Paper,
	ThemeProvider,
	Toolbar,
	Typography,
	createTheme
} from "@mui/material"
import { useEffect, useState } from "react"
import { TruckConsumption, areInstancesOfTruckConsumption } from "../util/truckData"
import { ConsumptionTable } from "./ConsumptionTable"
import { TruckForm } from "./TruckForm"


// Theme info can be found at `https://brandbook.intelbras.com/a-marca/`
const intebrasTheme = createTheme({
	palette: {
		primary: {
			main: "#00a335",
			contrastText: "#fff"
		},
		secondary: {
			main: "#ebeeee",
			light: "#ebeeee"
		},
		text: {
			primary: "#3e5055",
			secondary: "#3e5055"
		}
	},
	typography: {
		fontFamily: [
			"\"Museo Sans\"",
			"\"Segoe UI\"",
			"\"Nunito Sans\""
		].join(","),
	},
})



export const App = () => {
	const [trucksConsumption, setTrucksConsumption] = useState<TruckConsumption[]>([])

	// For persistence between sessions, data is stored in `localStorage`
	// No database was used for simplicity sake
	useEffect(() => {
		const storedTrucks = localStorage.getItem("trucksConsumption")
		if (storedTrucks === null) { return }

		const parsedTrucks = JSON.parse(storedTrucks)
		if (!areInstancesOfTruckConsumption(parsedTrucks)) { return }

		const storedTrucksConsumption = parsedTrucks as TruckConsumption[]
		setTrucksConsumption(storedTrucksConsumption)
	}, [])

	return (
		<ThemeProvider theme={intebrasTheme}>
			<CssBaseline />

			<AppBar elevation={4}>
				<Toolbar>
					<img src="logo_intelbras_branco_cmyk.svg" alt="Intelbras" height="64"></img>
				</Toolbar>
			</AppBar>

			<Container sx={{ mt: 12, mb: 4 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} lg={4}>
						<Paper elevation={2} sx={{ p: 4 }}>
							<Typography component="h1" variant="h6" textAlign="center" mb={4}>
								Calculadora de consumo de combustível
							</Typography>
							<TruckForm
								trucksConsumption={trucksConsumption}
								setTrucksConsumption={setTrucksConsumption}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} lg={8}>
						<Paper elevation={2} sx={{ p: 4 }}>
							<Typography component="div" variant="h6" textAlign="center" mb={4}>
								Resultados
							</Typography>
							{
								trucksConsumption.length > 0 ? <>
									<ConsumptionTable trucksConsumption={trucksConsumption} />
									<Grid container justifyContent="flex-end" mt={1} mb={-2}>
										<Button variant="text" onClick={() => {
											localStorage.clear()
											setTrucksConsumption([])
										}}>Zerar</Button>
									</Grid>
								</> : <Typography textAlign="center">Insira dados e calcula para obter resultados.</Typography>
							}
						</Paper>
					</Grid>
				</Grid>
			</Container>

		</ThemeProvider >
	)
}
