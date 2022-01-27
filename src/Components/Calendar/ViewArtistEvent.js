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
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import IosShareIcon from '@mui/icons-material/IosShare';


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

export default function ViewArtistEvent({openEvent, setOpenEvent, event, setEvent, eventDate, getEvents}) {
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
  const [artistId, setArtistId] = useState(event.artistId)
  const [venueName, setVenueName] = useState(event.venueName);
  const [venueId, setVenueId] = useState(event.venueId);
  const [artistFee, setArtistFee] = useState(event.artistFee)
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
    axios.get(`${process.env.REACT_APP_MG_API}/get-venue`).then(function(res){
        setVenues(res.data)
    })
}

const getArtistById = (id) =>{

  const idPayload = {id}
  axios.post(`${process.env.REACT_APP_MG_API}/get-artist-by-id`, idPayload).then(function(res){
        const {name} = res.data
        setArtist(name); 
})
}

  const clearForm = () =>{
      setArtist("");setArtistId("");setVenueId("");setDate(null); setArtistFee(0);setNotes("");setSetTimes([])
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
          {console.log(event)}

                

                <TextField type='text' id="outlined-basic" label="Venue" variant="outlined" disabled value={venueName}/>
                
                <TextField type='number' id="outlined-basic" label="Artist Fee" disabled variant="outlined" InputProps={{startAdornment: 
                    <InputAdornment position="start">£</InputAdornment>, }} value={artistFee} onChange={(e)=>setArtistFee(e.target.value)} />
                
                <DatePicker  format="DD-MM-YYYY" label="Date" value={date} disabled renderInput={(params) => <TextField {...params} />}/>

                {setTimes.map((set, i)=>  <TextField key={i} type='text' id="outlined-basic" label={`Set ${i+1}`} variant="outlined" value={set} disabled/>)}

                <TextField multiline rows={4} type='text' id="outlined-basic" label="Notes" variant="outlined" disabled value={notes} onChange={(e)=> setNotes(e.target.value)}/>

              <Box sx={{justifyContent: 'center'}}>
         {event.status === 'Pending' ? <>
                    <Link to={`/artist/confirm/${event._id}`}><Button variant="contained" >Confirm</Button></Link>
                    <Link to={`/artist/decline/${event._id}`}><Button variant="contained" sx={{backgroundColor:red[800]}} >Decline</Button></Link>
                    </> :
                    <Link to={""}>
                        <Fab variant="extended">
                            <IosShareIcon sx={{ mr: 1 }} />
                            Invoice
                        </Fab>
                    </Link>}


                </Box>

            </Box>
        </Box>
      </Modal>
    </div>
  );
}