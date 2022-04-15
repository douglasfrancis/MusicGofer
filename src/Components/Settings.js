import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {adminAuth} from '../Firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
  };


export default function Settings() {

    //Modal state
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //form state
    const [img, setImg]=useState("https://caretestresources.s3.eu-west-2.amazonaws.com/avatar.png")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [adminList, setAdminList] = useState([])

    useEffect(()=>{
      getAdmin()
    },[])

    const getAdmin = ()=>{
      axios.get(`${process.env.REACT_APP_MG_API}/get-admin`).then(function (res){
        setAdminList(res.data)
      })
    }

   
    const clearForm =()=>{
      setName("");
      setEmail("")
    }

    const createAdmin = async () => {
      if(!name || !email){
        toast.error("Please add all fields")
      } else {
        
          createUserWithEmailAndPassword(adminAuth, email, "password")
          .then(  (userCredential) => {
            axios.post(`${process.env.REACT_APP_MG_API}/add-admin`, {_id: userCredential.user.uid, img, name, email, role: 'admin'}).then(function (res){
            toast.success(res.data)
             
            setOpen(false)
            clearForm()
            getAdmin()
      })
           
          })
          .catch((error) => { 
              console.log(error)
      
              return toast.error("Error adding artist")
          })
  
    }
  }

  return (
      <div>
        <Button variant='outlined' onClick={handleOpen}>Add Admin</Button>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Admin</TableCell>
            <TableCell align="left">Email</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {adminList.map((admin, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="left">{admin.name}</TableCell>
              <TableCell align="left">{admin.email}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
       
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box  component="form"  sx={{'& > :not(style)': { m: 1, width: '100%' },}} noValidate autoComplete="off">
                    <img style={{height: '80px', width: '80px', display:'block', margin: '0 auto', borderRadius:'50%'}} src={img} alt='Artist'/>

                    <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth value={name} onChange={(e)=> setName(e.target.value)}/>
                    <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <Button variant='contained' onClick={createAdmin}>Add</Button>
                    
                </Box>
            </Box>
        </Modal>
      </div>
  )
}
