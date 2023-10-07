import { AppBar, Button, Container, CssBaseline, Grid, Paper, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { TruckConsumption, areInstancesOfTruckConsumption } from '../util/truckData';
import './App.css';
import { Consumption } from './Consumption';
import { TruckForm } from './TruckForm';


const intebrasTheme = createTheme({
  palette: {
    primary: {
      main: "#00A335",
      light: "#FF0"
    },
    secondary: {
      main: "#00F",
      light: "#EBEEEE"
    }
  },
  typography: {
    fontFamily: [
      '"Museo Sans"',
      '"Segoe UI"',
      '"Nunito Sans"'
    ].join(','),
  },
})



function App() {
  const [consumption, setConsumption] = useState(0);
  return (
    <ThemeProvider theme={intebrasTheme}>
      <CssBaseline />

      <AppBar elevation={4}>
            <Toolbar>
          <img src="logo_intelbras_branco_cmyk.svg" alt='Intelbras' height="64"></img>
              <Typography>
            Calculadora de consumo de combustivel
              </Typography>
            </Toolbar>
          </AppBar>

      <Container sx={{ mt: 12 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Paper elevation={2} sx={{ p: 4 }}>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Paper elevation={2} sx={{ p: 4 }}>
              <Button variant="text" onClick={() => {
                localStorage.clear()
                setTrucksConsumption([])
              }}>Zerar</Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

    </ThemeProvider >
  );
}

export default App;
