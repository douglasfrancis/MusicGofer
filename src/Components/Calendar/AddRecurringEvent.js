import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import DatePicker from '@mui/lab/DatePicker';
import axios from 'axios';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddRecurringEvent({open, setOpen, getEvents}) {
  const handleClose = () => {
      setOpen(false)
      clearForm()
  };
//List for Select Options
  const [venues, setVenues] = useState([])

  //Form state
  const [venueName, setVenueName] = useState('');
  const [venueId, setVenueId] = useState('');
  const [artistFee, setArtistFee] = useState(0)
  const [venueFee, setVenueFee] = useState(0)
  const [date, setDate] = useState(null);
  const [setTimes, setSetTimes] = useState([])
  const [notes, setNotes] = useState('');
  const [weeks, setWeeks] = useState("")
//Recurring events
  const [events, setEvents] = useState([])

    useEffect(()=>{
        getVenues();
    }, [])

    useEffect(()=>{
        if(events){
            events.map(event=>{
                event.venueId = venueId;
                event.venueName = venueName;
                event.venueFee = venueFee;
                event.artistFee = artistFee;
                event.setTimes = setTimes;
                event.notes = notes;
                event.title = `${venueName}(To Be Assigned)`;

            }
            )
        }
    }, [venueName, venueId, artistFee, venueFee, setTimes])

const getVenues = () =>{
    axios.get(`${process.env.REACT_APP_MG_API}/get-venues`).then(function(res){
        setVenues(res.data)
    })
}

const getVenueById = (id) =>{

  const idPayload = {id}
  axios.post(`${process.env.REACT_APP_MG_API}/get-venue-by-id`, idPayload).then(function(res){
        const {artistFee, venueFee, setTimes, name} = res.data
        setArtistFee(artistFee); setVenueFee(venueFee);setSetTimes(setTimes);setVenueName(name);
})
}

  const clearForm = () =>{
    setVenueId("");setDate(null); setArtistFee(0);setVenueFee(0);setNotes("");setSetTimes([])
  }

  const changeSets=(i, e)=>{
    let newSets = [...setTimes]
    newSets[i] = e.target.value
    setSetTimes(newSets)
  }

  const createEvents = (numberOfEvents) =>{
      try{
        setEvents([])
      }catch{

      }finally{
        for (let i = 0; i < numberOfEvents ; i++) {
            setEvents(prevEvents => [...prevEvents, {title: `${venueName}(To Be Assigned)`, venueName, venueId, artistFee, venueFee, date, setTimes, notes, status:"Unassigned", backgroundColor:"red",borderColor:"red", allDay: false, display: 'block'}])
            }
      }
  
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
            <Box component="form"
            sx={{'& > :not(style)': { m: 1, width: '40ch' }, textAlign:'center'}} noValidate autoComplete="off">
                

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">Venue*</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={venueId}
                    label="Venue *"
                    onChange={(e)=>{getVenueById(e.target.value);setVenueId(e.target.value)}}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                        {venues.map((venue, i)=> <MenuItem key={i} value={venue._id}>{venue.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <TextField type='number' id="outlined-basic" label="Artist Fee" variant="outlined" InputProps={{startAdornment: 
                    <InputAdornment position="start">£</InputAdornment>, }} value={artistFee} onChange={(e)=>setArtistFee(e.target.value)} />
                <TextField  type='number' id="outlined-basic" label="Venue Fee" variant="outlined" InputProps={{startAdornment: 
                    <InputAdornment position="start">£</InputAdornment>,}}value={venueFee} onChange={(e)=>setVenueFee(e.target.value)} />
                <DatePicker  format="DD/MM/YYYY" label="First Event Date" value={date} onChange={(newValue) => { setDate(newValue);}} renderInput={(params) => <TextField {...params} />}/>
                <TextField type='number' id="outlined-basic" label="Number of Weeks" variant="outlined" value={weeks} onChange={(e)=>{ setWeeks(e.target.value); setEvents([]); createEvents(e.target.value)}}/>

                {setTimes.map((set, i)=>  <TextField key={i} type='text' id="outlined-basic" label={`Set ${i+1}`} variant="outlined" value={`${set.from} - ${set.to}`} onChange={(e)=> changeSets(i, e)}/>)}

                <TextField multiline rows={4} type='text' id="outlined-basic" label="Notes" variant="outlined" value={notes} onChange={(e)=> setNotes(e.target.value)}/>
                <Button variant="contained" onClick={()=> console.log(events)}>Add Recurring Events</Button>

            </Box>
        </Box>
      </Modal>
    </div>
  );
}