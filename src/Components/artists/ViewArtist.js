import React, {useState} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


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

export default function ViewArtist( {artist, openArtist, setOpenArtist, setArtist, getMusicians}) {
  
    const [img, setImg]= useState(artist.img)
    const [name, setName] = useState(artist.name)
    const [number, setNumber] = useState(artist.number)
    const [email, setEmail] = useState(artist.email)
    const [youtube, setYoutube] = useState(artist.youtube)
    const [category, setCategory] = useState(artist.category);


    const handleCloseArtist = () => {
      setOpenArtist(false);
      clearForm()
      setArtist()
    }

    const payload = {
        id: artist._id,
        payload: {
          img, name, category, number, email, youtube
        }
    }

    const updateArtist = () =>{
      axios.post(`${process.env.REACT_APP_MG_API}/update-artist`, payload).then(function(res){
       
          toast.success(res.data)
          getMusicians()
       
      })
    }

    const clearForm = () =>{
      setName("");setNumber("");setCategory("");setEmail("");setYoutube("");setImg("https://caretestresources.s3.eu-west-2.amazonaws.com/avatar.png")
    }
  
  
    return (
        <div>
        <Modal
          open={openArtist}
          onClose={handleCloseArtist}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
         
          <Box sx={style}>
          <Box component="form"
          sx={{'& > :not(style)': { m: 1, width: '40ch' }, textAlign:'center'}} noValidate autoComplete="off">

             <img style={{height: '80px', width: '80px', display:'block', margin: '0 auto', borderRadius:'50%'}} src={img} alt='Artist'/>

              <TextField id="outlined-basic" label="Musician Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>

                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(e)=>setCategory(e.target.value)}
              >
                    <MenuItem value={'Solo'}>Solo</MenuItem>
                    <MenuItem value={'Duo'}>Duo</MenuItem>
                    <MenuItem value={'Drums'}>Drums</MenuItem>
                    <MenuItem value={'Guitar'}>Guitar</MenuItem>
                    <MenuItem value={'Bass'}>Bass</MenuItem>
                    <MenuItem value={'Vocals'}>Vocals</MenuItem>
                    <MenuItem value={'Sax'}>Sax</MenuItem>
                    <MenuItem value={'Keys'}>Keys</MenuItem>



              </Select>
              </FormControl>
              <TextField type='number' id="outlined-basic" label="Phone Number" variant="outlined" value={number} onChange={(e)=>setNumber(e.target.value)}/>
              <TextField type='email' id="outlined-basic" label="Email Address" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} disabled/>
              <TextField id="outlined-basic" label="Youtube Link" variant="outlined" value={youtube} onChange={(e)=>setYoutube(e.target.value)}/>

              <Button variant="contained" onClick={updateArtist} >Update</Button>

          </Box>
      </Box>
          
          
        </Modal>
      </div>
    )
}
