import React, {useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import AuthContext from '../../Context/AuthContext'
import axios from 'axios'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../Firebase'
import { getStorage, ref, uploadBytes } from "firebase/storage";

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

export default function AddMusician({open, setOpen}) {
  const handleClose = () => {
    setOpen(false);
    clearForm()
  }

 const { setCurrentUser} = useContext(AuthContext)
  //Form state
  const [img, setImg]=useState("https://caretestresources.s3.eu-west-2.amazonaws.com/avatar.png")
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [email, setEmail] = useState("")
  const [youtube, setYoutube] = useState("")

  const storage = getStorage(app);
  //const userRef = ref(storage, img);
  //const userImagesRef = ref(storage, `users/${img}`);
 
const uploadFile=()=>{
 /* uploadBytes(userImagesRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });*/
}
  const auth = getAuth(app);

  const createUser = async () => {
    if(!name || !number || !email){
      toast.error("Please add all required fields")
    } else {
      
        createUserWithEmailAndPassword(auth, email, "password")
        .then((userCredential) => {
          axios.post('http://localhost:4000/add-artist', {_id: userCredential.user.uid, img, name, number, email, youtube, role: 'user'}).then(function(res){
      toast.success(res.data)
    })
          const user = userCredential.user;
         
          setCurrentUser(user)
          setOpen(false)
          clearForm()
         
        })
        .catch((error) => { 
            console.log(error)
    
            return toast.error("Error adding artist")
        })
    

  }
}

  const clearForm = () =>{
    setName("");setNumber("");setEmail("");setYoutube("");setImg("https://caretestresources.s3.eu-west-2.amazonaws.com/avatar.png")
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

                <img style={{height: '80px', width: '80px', display:'block', margin: '0 auto', borderRadius:'50%'}} src={img} alt='Artist'/>
                <input type='file' accept="image/*" onChange={uploadFile}/>
                
                <TextField id="outlined-basic" label="Musician Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} />
                <TextField type='number' id="outlined-basic" label="Phone Number (+44 must be included)" variant="outlined" value={number} onChange={(e)=>setNumber(e.target.value)}/>
                <TextField type='email' id="outlined-basic" label="Email Address" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <TextField id="outlined-basic" label="Youtube Link" variant="outlined" value={youtube} onChange={(e)=>setYoutube(e.target.value)}/>

                <Button variant="contained" onClick={createUser}>Add</Button>

            </Box>
        </Box>
      </Modal>
    </div>
  );
}