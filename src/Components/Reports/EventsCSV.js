import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import { CSVLink, CSVDownload } from "react-csv";
import axios from 'axios';



export default function EventsCSV() {

    const [value, setValue] =useState([null, null]);
    const [eventData, setEventData] = useState([])

    useEffect(()=>{
        
            getEvents() 
        
    }, [value])


    const getEvents = async ()=>{
        const response = await axios.post('http://localhost:4000/get-events-by-date-range', {dateFrom: value[0], dateTo: value[1]})
        const data = await response.data
        setEventData(data)

    }

    let headers = [
        { label: "Date", key: "date" },
        { label: "Artist Name", key: "artist" },
        { label: "Venue", key: "venueName" },
        { label: "Artist Fee", key: "artistFee" },
        { label: "Venue Fee", key: "venueFee" }
      ];
      
      
    
    return (
        <div>
                <h3>Event Data</h3>
                    <DateRangePicker
                startText="From"
                endText="To"
                value={value}
                onChange={(newValue) => {
                setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                <>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                </>
                )}
            />
            <CSVLink headers={headers} filename='Music-Gofer.csv' data={eventData}><Button>Download</Button></CSVLink>

        </div>
    )
}
