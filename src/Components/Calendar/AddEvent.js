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
import {toast} from 'react-toastify'


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

export default function AddEvent({open, setOpen, chosenDate, getEvents}) {
  const handleClose = () => {
      setOpen(false)
      clearForm()
  };
//List for Select Options
  const [musicians, setMusicians] = useState([])
  const [venues, setVenues] = useState([])

  //Form state
  const [artist, setArtist] = useState('');
  const [venueName, setVenueName] = useState('');
  const [venueId, setVenueId] = useState('');
  const [artistFee, setArtistFee] = useState(0)
  const [venueFee, setVenueFee] = useState(0)
  const [date, setDate] = useState(null);
  const [setTimes, setSetTimes] = useState([])
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState("Unassigned");
  const [backgroundColor, setBackgroundColor] = useState("Red");
  const [borderColor, setBorderColor] = useState("Red")
  
  const [eventId, setEventId] = useState("")

useEffect(()=>{
    getMusicians();
    getVenues();
}, [])

useEffect(()=>{
setDate(chosenDate)
}, [chosenDate])

useEffect(()=>{
  if(artist){
    setStatus("Pending");
    setBackgroundColor("#ffd700")
    setBorderColor("#ffd700")
  } else {
    setStatus("Unassigned");
    setBackgroundColor("Red")
    setBorderColor("Red")
  }
}, [artist])

useEffect(()=>{
  if(eventId) sendEmail()
  }, [eventId])

const getMusicians = () =>{
    axios.get('http://localhost:4000/get-artists').then(function(res){
        setMusicians(res.data)
    })
}

const getVenues = () =>{
    axios.get('http://localhost:4000/get-venues').then(function(res){
        setVenues(res.data)
    })
}

const getVenueById = (id) =>{

  const idPayload = {id}
  axios.post('http://localhost:4000/get-venue-by-id', idPayload).then(function(res){
        const {artistFee, venueFee, setTimes, name} = res.data
        setArtistFee(artistFee); setVenueFee(venueFee);setSetTimes(setTimes);setVenueName(name)
})
}
const payload={
    title: `${venueName}(${artist})`, artist, venueName, venueId, artistFee, venueFee, date, setTimes, notes, status, backgroundColor,borderColor, allDay: false, display: 'block'
}
  const clearForm = () =>{
      setArtist("");setVenueId("");setDate(null); setArtistFee(0);setVenueFee(0);setNotes("");setSetTimes([])
  }

  const addEvent = () => {
      if(!venueName || !date || !artistFee || !venueFee){
        toast.error("Please add all fields")
      } else if(!artist) {
          axios.post("http://localhost:4000/add-event", payload).then(function(res){
            toast.success(res.data.msg)
            setEventId(res.data.event._id)
            getEvents()
          handleClose()
        })
      } else if(artist) {
        
        axios.post("http://localhost:4000/add-event", payload).then(function(res){
            toast.success(res.data.msg)
            setEventId(res.data.event._id)
            getEvents()

          handleClose()
        })
      }
  }

  const sendEmail = () =>{
    axios.post("http://localhost:4000/new-event", {eventId: eventId, name: artist, email: "dougiefrancis@gmail.com", venueName, artistFee, setTimes, date, notes}).then(function(res){
      if(res.data.success) {
        toast.success(res.data.msg)
      } else {
        toast.error(res.data.msg)
      }
    })
  }

  const changeSets=(i, e)=>{
    let newSets = [...setTimes]
    newSets[i] = e.target.value
    setSetTimes(newSets)
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
                    <InputLabel id="demo-simple-select-helper-label">Artist</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={artist}
                    label="Artist"
                    onChange={(e)=>setArtist(e.target.value)}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {musicians.map((musician, i)=><MenuItem key={i}  value={musician.name}>{musician.name}</MenuItem>)}
                    </Select>
                </FormControl>

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
                <DatePicker  format="DD/MM/YYYY" label="Date" value={date} onChange={(newValue) => { setDate(newValue);}} renderInput={(params) => <TextField {...params} />}/>

                {setTimes.map((set, i)=>  <TextField key={i} type='text' id="outlined-basic" label={`Set ${i+1}`} variant="outlined" value={set} onChange={(e)=> changeSets(i, e)}/>)}

                <TextField multiline rows={4} type='text' id="outlined-basic" label="Notes" variant="outlined" value={notes} onChange={(e)=> setNotes(e.target.value)}/>
                <Button variant="contained" onClick={addEvent}>Add</Button>

            </Box>
        </Box>
      </Modal>
    </div>
  );
}