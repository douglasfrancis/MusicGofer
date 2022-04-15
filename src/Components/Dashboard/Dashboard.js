import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

//components
import Graph from './Graph'
import EventsCSV from '../Reports/EventsCSV';
import { Button } from '@mui/material';
import axios from 'axios'
import { toast } from 'react-toastify';

export default function Dashboard() {

  const sendSMS =()=>{
    axios.post(`${process.env.REACT_APP_MG_API}/send-sms`, {name: 'Doug'}).then(function(res){
      toast.success(res.data)
    })
  }
  
    return (
      <Grid container spacing={3}>
            {/* Chart */}
              <Graph />
              <Button style={{height: '50px'}} variant='contained' onClick={sendSMS}>Send SMS</Button>

         
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

              

      </Grid>
    )
  
}