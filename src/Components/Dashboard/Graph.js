import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ReactApexChart from "react-apexcharts";

export default function Graph() {

    const chartData=  {
        chart: {
          type: "line",
          id: "apexchart-example",
        },
        xaxis: {
          categories: ['Jan 21', 'Feb 21', 'Mar 21', 'Apr 21', 'May 21', 'Jun 21', 'Jul 21', 'Aug 21', 'Sep 21', 'Oct 21', 'Nov 21', 'Dec 21', 'Jan 22']
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100]
            // colorStops: []
          }
        },
        legend: {
          // position: '',
          width: 400
          // position: 'top',
        },
        series: [
          {
            name: "Profit",
            type: "line",
            data: [0, 0, 0, 105, 1365, 2610, 2870, 2810, 2915, 4030, 4500, 5600, 3245]
          },
          {
            name: "No. of Gigs",
            type: "line",
            data: [0, 0, 0, 2, 35, 70, 74, 80, 78, 95, 106, 115, 97 ]
          }
        ]
      };
      
   return (
        <Grid item xs={12} sm={12} md={8}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
          }}
        >
        
            <ReactApexChart options={chartData} series={chartData.series} />;
        
        </Paper>
      </Grid>
    )
}
