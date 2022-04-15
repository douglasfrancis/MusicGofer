import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify'
import {useAuth} from '../../Context/AuthContext'

//Auth
import {  signInWithEmailAndPassword } from "firebase/auth";
import {adminAuth} from '../../Firebase'

const theme = createTheme();

export default function Login() {

    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { resetPassword } = useAuth()

    const handleReset = () =>{
        if(!email){
            toast.error("Please input email to reset password")
        } else {
            resetPassword(email)
        }
    }


    const handleLogin =  (e) =>{
      e.preventDefault();

      if(!email || !password){
        toast.error("Please add all fields")
      } else {
        signInWithEmailAndPassword(adminAuth, email, password)
        .then(() => {
          navigate('/dashboard')
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
         console.log(errorCode, errorMessage)
         toast.error("Invalid Credentials")
        });
      }

      
    
  } 

    return (
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}

            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs sx={{textAlign: 'center'}}>
                <Link href="#" variant="body2" onClick={handleReset}>
                  Forgot password?
                </Link>
              </Grid>
              
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    )
}
