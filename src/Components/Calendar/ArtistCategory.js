import React, {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
export default function ArtistCategory({ setArtists, artists, setArtistName, setArtistEmail}) {
  
  const [musicians, setMusicians] = useState([])

  
  const [category, setCategory] = useState("")

  useEffect(()=>{
    getMusicians();
}, [])

  useEffect(()=>{
    if(!category){
        getMusicians()
    }else{
      getMusiciansByCategory()
    }
  }, [category])

  const getMusicians = () =>{
    axios.get(`${process.env.REACT_APP_MG_API}/get-artists`).then(function(res){
        setMusicians(res.data)
    })
}

/*const addArtist = ()=>{

  if(!category){
    toast.error("Please select category")
  } else{
    setArtists([...artists, { category, artistId, artistName, artistEmail}])
    clearFields()
  }
 
}*/

const clearFields = ()=>{
  setArtists("");setArtistName("");setArtistEmail("");setCategory("")
}

const getMusiciansByCategory = () =>{
  axios.post(`${process.env.REACT_APP_MG_API}/get-artists-by-category`, {category}).then(function(res){
      setMusicians(res.data)
  }).catch(function (e){
    console.log(e)
  })
}
  const getArtistById = (id) =>{
    setArtists(id)

    axios.post(`${process.env.REACT_APP_MG_API}/get-artist-by-id`, {_id: id}).then(function(res){
          const {name, email} = res.data
          setArtistName(name); 
          setArtistEmail(email);
  }).catch(function (e){
    console.log(e)
  })
  }

  return (

    <>
                {/*<Box sx={{ '& > :not(style)': { m: 1 } }}>
                  <Fab color="primary" aria-label="add" variant="extended" onClick={addArtist} >
                    <AddIcon />
                    Add Artist
                  </Fab>
                </Box>*/}
    <FormControl sx={{ m: 1, width: '45%' }}>
                    <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={category}
                    label="Category"
                    onChange={(e)=>{setCategory(e.target.value);}}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
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

                <FormControl sx={{ m: 1, width: '45%' }}>
                    <InputLabel id="demo-simple-select-helper-label">Artist</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={artists}
                    label="Artist"
                    onChange={(e)=>{getArtistById(e.target.value)}}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {musicians.map((musician, i)=><MenuItem key={i}  value={musician._id}>{musician.name}</MenuItem>)}
                    </Select>
                </FormControl>
    </>
  )
  
}
