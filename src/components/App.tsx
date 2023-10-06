import { AppBar, Grid, Stack, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import './App.css';
import { Consumption } from './Consumption';
import { TruckForm } from './TruckForm';

function App() {
  const [consumption, setConsumption] = useState(0);
  return (
    <div className="App">
      <Stack spacing="64px">
        <Grid>
          <AppBar>
            <Toolbar>
              <Typography>
                Intelbras - Calculadora de consumo de combustivel
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TruckForm setConsumption={setConsumption} />
          </Grid>
          <Grid item xs={6}>
            <Consumption consumptionPerTon={consumption} />
          </Grid>
        </Grid>
      </Stack>


    </div>
  );
}

export default App;
