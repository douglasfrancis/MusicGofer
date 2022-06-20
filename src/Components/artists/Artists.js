import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddMusician from './AddMusician';
import axios from 'axios';
import ViewArtist from './ViewArtist';


export default function Artists() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [artistDb, setArtistDb] = useState([])

  const [artist, setArtist] = useState("")
  const [openArtist, setOpenArtist] = useState(false);
  const handleOpenArtist = () => setOpenArtist(true);
  


  useEffect(()=>{
    getMusicians()
  },[])

  const getMusicians =()=>{

    axios.get(`${process.env.REACT_APP_MG_API}/get-artists`).then(function(res){
      setArtistDb(res.data)
      console.log(res.data)
    })
  }


  const view=  (musician)=>{
    
    setArtist(musician)
   handleOpenArtist()

 
}


  return (
    <Box sx={{textAlign: 'center'}}>

      {artist && <ViewArtist artist={artist} openArtist={openArtist} setOpenArtist={setOpenArtist} setArtist={setArtist} getMusicians={getMusicians}/>}

      <Fab color="primary" aria-label="add" sx={{margin: '20px' }} onClick={handleOpen}>
        <AddIcon  />
      </Fab>

      <AddMusician open={open} setOpen={setOpen} getMusicians={getMusicians}/>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Artists</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Number</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="center">Youtube</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artistDb.map((musician, i) => (
            <TableRow onClick={()=> view(musician) }
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell ><img style={{maxHeight: '60px', maxWidth:'60px', borderRadius:'50%'}} src={musician.img} alt='Artist'/></TableCell>

              <TableCell component="th" scope="artistDb">{musician.name}</TableCell>
              <TableCell align="left">{musician.category}</TableCell>
              <TableCell align="left">{musician.number}</TableCell>
              <TableCell align="left">{musician.email}</TableCell>
              {musician.youtube ? <TableCell align="center"><a href={musician.youtube} target='_blank' ><YouTubeIcon sx={{ color: 'red' }}/></a></TableCell>:<TableCell align="right"></TableCell>}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}