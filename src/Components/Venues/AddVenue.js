import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputAdornment from '@mui/material/InputAdornment';
import { toast} from 'react-toastify'
import axios from 'axios'
import TimePicker from '@mui/lab/TimePicker';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto'
};

export default function AddVenue({open, setOpen, getVenues}) {
  const handleClose = () => {
    setOpen(false);
    clearFields()
  }

  //Form state
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [artistFee, setArtistFee] = useState(0)
  const [venueFee, setVenueFee] = useState(0)
  const [equipment, setEquipment] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactName, setContactName] = useState("") 

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [setTimes, setSetTimes] = useState([])
  

  const addSet =()=>{
      let times = {from: from.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),to: to.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}

      if(!to || !from){
        toast.error("Please add start and end time")
      } else if( to <= from){
        toast.error("Start of set must be before the end")
      } else {
        setSetTimes([...setTimes, times]);
        clearTimes();
      } 
  }

  const payload = {
    name, address, artistFee, venueFee, equipment, contactEmail, contactName, setTimes, startTime: setTimes[0]?.from
  }

  const addVenue =()=>{
    if( !name || !address || !artistFee || !venueFee || !equipment){
      return toast.error("Please add all required fields")

    } else if (!setTimes){
      return toast.error("Please add a set time")
    }else{
      axios.post(`${process.env.REACT_APP_MG_API}/add-venue`, payload).then(function(res){
        toast.success(res.data)
        getVenues()
        axios.post(`${process.env.REACT_APP_MG_API}/send-terms`, {venueName: "test"}).then(function(res){
          toast.success(res.data.msg)
        })
      })
    }
    
    handleClose()
    clearFields()
  }

  const clearTimes = () =>{
      setTo("")
      setFrom("")
  }

  const clearFields = () =>{
    setName("");setSetTimes([]);setAddress("");setArtistFee(0);setVenueFee(0);setEquipment("")
  }

  const removeSet = (i)=>{
    setTimes.splice(i, 1)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box component='div' sx={style}>
            <Box component="form"
            sx={{'& > :not(style)': { m: 1, width: '40ch' }, textAlign:'center'}} noValidate autoComplete="off">
                
                <TextField id="outlined-basic" label="Venue Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} />
                <TextField id="outlined-basic" label="Address" variant="outlined" multiline rows={4} value={address} onChange={(e)=>setAddress(e.target.value)} />
                <TextField type='number' id="outlined-basic" label="Artist Fee" variant="outlined" InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }} value={artistFee} onChange={(e)=>setArtistFee(e.target.value)} />
                <TextField  type='number' id="outlined-basic" label="Venue Fee" variant="outlined" InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}value={venueFee} onChange={(e)=>setVenueFee(e.target.value)} />
                <TextField multiline rows={2} id="outlined-basic" label="Equipment Required" variant="outlined" value={equipment} onChange={(e)=>setEquipment(e.target.value)} />
                <TextField id="outlined-basic" label="Contact Email Address" variant="outlined" value={contactEmail} onChange={(e)=>setContactEmail(e.target.value)}  />
                <TextField id="outlined-basic" label="Contact Name" variant="outlined" value={contactName} onChange={(e)=>setContactName(e.target.value)} />
                   {setTimes.map((set, i)=><div  style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%'}}> <p key={i}>{`${set.from} - ${set.to}`}</p><DeleteOutlineIcon onClick={()=> removeSet(i)}/></div>)}
                   <div  style={{width: '100%'}} >
                      <TimePicker  value={from} label="From" onChange={(newValue) => {setFrom(newValue);}} renderInput={(params) => <TextField sx={{m: '5px'}} {...params} />}/>
                      <TimePicker value={to} label="To" onChange={(newValue) => {setTo(newValue);}} renderInput={(params) => <TextField sx={{m: '5px'}} {...params} />}/>
                   </div>
                    <Button variant="contained" onClick={addSet}>Add Set</Button>
                <Button variant="contained" onClick={addVenue}>Add Venue</Button>

            </Box>
        </Box>
      </Modal>
    </div>
  );
}