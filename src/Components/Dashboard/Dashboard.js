import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

//components
import Graph from './Graph'
import EventsCSV from '../Reports/EventsCSV';

export default function Dashboard() {
  
    return (
      <Grid container spacing={3}>
            {/* Chart */}
              <Graph />

         
            {/*CSV downloads*/}
              <Grid item xs={6} sm={6} md={4} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 220,
                  }}
                >

                  <EventsCSV />
                </Paper>
              </Grid>

              {/* Profit */}
              <Grid item xs={6} sm={6} md={4} >
                <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 220,

                  }}>
                  Current Monthly Profit £3,245
                </Paper>
              </Grid>

      </Grid>
    )
  
}