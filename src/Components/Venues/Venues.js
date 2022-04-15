import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddVenue from './AddVenue';
import axios from 'axios';
import ViewVenue from './ViewVenue';



export default function Venues() {
  //Add new modal
  const [open, setOpen] = useState(false);
  const [venues, setVenues] = useState([])
  const handleOpen = () => setOpen(true);

   //Venue view modal
   const [openVenue, setOpenVenue] = useState(false);
   const handleOpenVenue = () => setOpenVenue(true);
   const [venue, setVenue] = useState()

  useEffect(()=>{
    getVenues()
  },[])

  const getVenues=()=>{
    axios.get(`${process.env.REACT_APP_MG_API}/get-venues`).then(function(res){
      setVenues(res.data)
    })
  }

  const view=  (venue)=>{
    
       setVenue(venue)
      handleOpenVenue()
    
    
    
    
  }

  return (
    <Box sx={{textAlign: 'center'}}>
           {venue && <ViewVenue venue={venue} openVenue={openVenue} setOpenVenue={setOpenVenue} setVenue={setVenue} getVenues={getVenues}/>}

      <Fab color="primary" aria-label="add" sx={{margin: '20px' }} onClick={handleOpen} >
        <AddIcon />
      </Fab>
      <AddVenue open={open} setOpen={setOpen} getVenues={getVenues}/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell>Name</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Artist Fee</TableCell>
            <TableCell align="left">Venue Fee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {venues.map((venue, i) => (

            <TableRow key={i} onClick={()=> view(venue) } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

              <TableCell component="th" scope="row">{venue.name}</TableCell>
              <TableCell align="left">{venue.address}</TableCell>
              <TableCell align="left">£{venue.artistFee}</TableCell>
              <TableCell align="left">£{venue.venueFee}</TableCell>
              
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}