import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import {signOut} from 'firebase/auth'
import Button from '@mui/material/Button';
import RequireAuth from './Auth/RequireAuth'
import auth from '../Firebase'

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './ListItems';

//pages
import Calendar from './Calendar/Calendar'
import Dashboard from './Dashboard/Dashboard';
import ArtistDashboard from './Dashboard/ArtistDashboard'
import Artists from './artists/Artists';
import Venues from './Venues/Venues';
import Login from './Auth/Login';
import Confirm from './Calendar/Confirm';
import Decline from './Calendar/Decline';
import ArtistCalendar from './Calendar/ArtistCalendar';
import UserProfile from './Profile/UserProfile';
import { useAuth } from '../Context/AuthContext';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      
        Frantech Web Solutions Ltd
     {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}




const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor:'white',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      backgroundColor: '#3496d1',
      color: 'white',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

export default function Template() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };


  function handleLogout(){
    signOut(auth)
  }

  const {role} = useAuth()


  return (
    <ThemeProvider theme={mdTheme}>
        <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ color: 'black',
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box flexGrow={1} justifyContent={'space-between'} display={'flex'}>
              
              <img style={{height: '40px'}} src={require('../images/MusicGofer_logo2_black.png')} alt='Music Gofer Logo' />

             
              <Button align='right'  onClick={handleLogout} variant="outlined" >Logout</Button>


              </Box>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
         
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        
            <Routes>
                <Route exact path='/' element={<RequireAuth><Dashboard/></RequireAuth>} />
                <Route exact path='/dashboard' element={<RequireAuth><ArtistDashboard/></RequireAuth>} />

                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/calendar' element={<RequireAuth > 
                                                         {role==='user' ?<ArtistCalendar/> :<Calendar/>} 
                                                       </RequireAuth>} />
                <Route exact path='/artist-calendar' element={<RequireAuth><Calendar/></RequireAuth>} />
                <Route exact path='/profile' element={<RequireAuth><UserProfile/></RequireAuth>} />


                <Route exact path='/artists' element={<RequireAuth > <Artists/></RequireAuth>} />
                <Route exact path='/venues' element={<RequireAuth > <Venues/></RequireAuth>} />
                <Route exact path='/confirm/:id' element={<Confirm/>} />
                <Route exact path='/decline/:id' element={<Decline/>} />

            </Routes>
        
              
            
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
      </Router>
    </ThemeProvider>
  );
}

