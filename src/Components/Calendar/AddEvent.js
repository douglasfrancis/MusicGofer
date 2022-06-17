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
import ArtistCategory from './ArtistCategory';

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
  const [venues, setVenues] = useState([])

  //Form state
  const [artists, setArtists] = useState("");
  const [artistName, setArtistName] = useState("")
  const [artistEmail, setArtistEmail] = useState("")
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
    getVenues();
}, [])

useEffect(()=>{
setDate(chosenDate)
}, [chosenDate])

useEffect(()=>{
  if(artists){
    setStatus("Pending");
    setBackgroundColor("#ffd700")
    setBorderColor("#ffd700")
    
  } else {
    setStatus("Unassigned");
    setBackgroundColor("Red")
    setBorderColor("Red")
  }
}, [artists])



useEffect(()=>{
  if(eventId) sendEmail()
  }, [eventId])

let newDate;

/*useEffect(()=>{
    if(setTimes) {
      newDate = new Date(date)
      const time = setTimes[0]?.from
      const newTime = time?.split(':')
      if(newTime){
        newDate.setHours(newTime[0],newTime[1],0,0);
        setDate(newDate)
      } 
    }
    }, [setTimes])*/

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


const payload={
    title: `${venueName}(${artistName})`, artists, venueName, venueId, artistFee, venueFee, date, setTimes, notes, status, backgroundColor,borderColor, allDay: false, display: 'block'
}
  const clearForm = () =>{
      setArtists("");setVenueId("");setDate(null); setArtistFee(0);setVenueFee(0);setNotes("");setSetTimes([])
  }

  const addEvent = () => {
      if(!venueName || !date ){
        toast.error("Please add all required fields")
      } else if(!artists) {
          axios.post(`${process.env.REACT_APP_MG_API}/add-event`, payload).then(function(res){
            toast.success(res.data.msg)
            setEventId(res.data.event._id)
            getEvents()
          handleClose()
        })
      } else if(artists) {
        
        axios.post(`${process.env.REACT_APP_MG_API}/add-event`, payload).then(function(res){
            toast.success(res.data.msg)
            setEventId(res.data.event._id)
            getEvents()

          handleClose()
        })
      }
  }

  const sendEmail = () =>{
    axios.post(`${process.env.REACT_APP_MG_API}/new-event`, {eventId: eventId, name: artists, email: artistEmail, venueName, artistFee, setTimes, date, notes}).then(function(res){
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
      {console.log(payload)}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
            <Box component="form"
            sx={{'& > :not(style)': { m: 1, width: '40ch' }, textAlign:'center'}} noValidate autoComplete="off">
                
                

                <ArtistCategory setArtists={setArtists} setArtistName={setArtistName} setArtistEmail={setArtistEmail} />

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

                {setTimes.map((set, i)=>  <TextField key={i} type='text' id="outlined-basic" label={`Set ${i+1}`} variant="outlined" value={`${set.from} - ${set.to}`} onChange={(e)=> changeSets(i, e)}/>)}

                <TextField multiline rows={4} type='text' id="outlined-basic" label="Notes" variant="outlined" value={notes} onChange={(e)=> setNotes(e.target.value)}/>
                <Button variant="contained" onClick={addEvent}>Add Event</Button>

            </Box>
        </Box>
      </Modal>
    </div>
  );
}