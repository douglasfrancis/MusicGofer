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
import { red } from '@mui/material/colors';



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

export default function ViewEvent({openEvent, setOpenEvent, event, setEvent, eventDate, getEvents}) {
  const handleClose = () => {
      setOpenEvent(false)
      clearForm()
      setEvent()
  };
//List for Select Options
  const [musicians, setMusicians] = useState([])
  const [venues, setVenues] = useState([])

  //Form state
  const [artist, setArtist] = useState(event.artist);
  const [artistId, setArtistId] = useState(event.artists)
  const [venueName, setVenueName] = useState(event.venueName);
  const [venueId, setVenueId] = useState(event.venueId);
  const [artistFee, setArtistFee] = useState(event.artistFee)
  const [venueFee, setVenueFee] = useState(event.venueFee)
  const [date, setDate] = useState(eventDate);
  const [setTimes, setSetTimes] = useState(event.setTimes)
  const [notes, setNotes] = useState(event.notes);
  const [status, setStatus] = useState(artist ? "Pending":"Unassigned");
  const [backgroundColor, setBackgroundColor] = useState(artist ? "Yellow" : 'red');
  const [borderColor, setBorderColor] = useState("Red")


useEffect(()=>{
    getMusicians();
    getVenues();
}, [])

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

const getMusicians = () =>{
    axios.get(`${process.env.REACT_APP_MG_API}/get-artists`).then(function(res){
        setMusicians(res.data)
    })
}

const getVenues = () =>{
    axios.get(`${process.env.REACT_APP_MG_API}/get-venues`).then(function(res){
        setVenues(res.data)
    })
}

const getVenueById = (id) =>{

  const idPayload = {id}
  axios.post(`${process.env.REACT_APP_MG_API}/get-venue-by-id`, idPayload).then(function(res){
        const {artistFee, venueFee, setTimes, name} = res.data
        setArtistFee(artistFee); setVenueFee(venueFee);setSetTimes(setTimes);setVenueName(name)
})
}

const getArtistById = (id) =>{

  const idPayload = {id}
  axios.post(`${process.env.REACT_APP_MG_API}/get-artist-by-id`, idPayload).then(function(res){
        const {name} = res.data
        setArtist(name); 
})
}
const payload={
    id: event._id,
    payload: {
        title: `${venueName}(${artist})`, artist, artistId, venueName, venueId, artistFee, venueFee, date, setTimes, notes, status, backgroundColor, borderColor, allDay: false, display: 'block'

    }
}
  const clearForm = () =>{
      setArtist("");setArtistId("");setVenueId("");setDate(null); setArtistFee(0);setVenueFee(0);setNotes("");setSetTimes([])
  }

  const updateEvent = () => {
      if(!venueName || !date || !artistFee || !venueFee){
        toast.error("Please add all fields")
      }else{
        axios.post(`${process.env.REACT_APP_MG_API}/update-event`, payload).then(function(res){
            toast.success(res.data)
               {/*axios.post("http://localhost:4000/new-booking", {name: "Test Name", email: "dougiefrancis@gmail.com"}).then(function(res){
              if(res.data.success) toast.success(res.data.msg)
              else toast.error(res.data.msg)
        })*/}
            handleClose()
      })
      }
}

const deleteEvent = () => {
  axios.post(`${process.env.REACT_APP_MG_API}/delete-event`, {id:event._id}).then(function(res){
    toast.success(res.data)
    getEvents()

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
        open={openEvent}
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
                    value={artistId}
                    label="Artist"
                    onChange={(e)=>{getArtistById(e.target.value);setArtistId(e.target.value)}}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {musicians.map((musician, i)=><MenuItem key={i} value={musician._id}>{musician.name}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-required-label">Venue*</InputLabel>
                    <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={venueId}
                    disabled
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
                <DatePicker  format="DD-MM-YYYY" label="Date" value={date} onChange={(newValue) => { setDate(newValue);}} renderInput={(params) => <TextField {...params} />}/>

                {setTimes.map((set, i)=>  <TextField key={i} type='text' id="outlined-basic" label={`Set ${i+1}`} variant="outlined" value={`${set.from} - ${set.to}`} onChange={(e)=> changeSets(i, e)}/>)}

                <TextField multiline rows={4} type='text' id="outlined-basic" label="Notes" variant="outlined" value={notes} onChange={(e)=> setNotes(e.target.value)}/>
                <Button variant="contained" onClick={updateEvent}>Update</Button>
                <Button variant="contained" sx={{backgroundColor:red[800]}} onClick={deleteEvent}>Delete</Button>


            </Box>
        </Box>
      </Modal>
    </div>
  );
}