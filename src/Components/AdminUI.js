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
import {adminAuth} from '../Firebase'
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Link } from 'react-router-dom';
//pages
import { Outlet } from 'react-router-dom';


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

export default function AdminUI() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  let navigate = useNavigate()
  function handleLogout(){
    signOut(adminAuth)
    navigate('/login')
  }

  React.useEffect(()=>{
    navigate('/dashboard')
  },[])


  return (
    <ThemeProvider theme={mdTheme}>
        
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
              
              <img style={{maxHeight: '40px'}} src={require('../images/MusicGofer_logo2_black.png')} alt='Music Gofer Logo' />

             
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
          <List>
          <Link to="/dashboard">
      < ListItem button>
        <ListItemIcon>
          <DashboardIcon sx={{color: 'white'}} />
        </ListItemIcon>
        <ListItemText sx={{color: 'white'}} primary="Dashboard" />
      </ListItem>
    </Link>
    
    < Link to="/calendar">
      <ListItem button>
        <ListItemIcon>
          <CalendarTodayIcon sx={{color: 'white'}}/>
        </ListItemIcon>
        <ListItemText primary="Calendar" sx={{color: 'white'}}  />
      </ListItem>
    </ Link>

    <Link to='/artists'>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon sx={{color: 'white'}}/>
        </ListItemIcon>
        <ListItemText primary="Artists" sx={{color: 'white'}}  />
      </ListItem>
    </Link>

   <Link to='/venues'>
      <ListItem button>
        <ListItemIcon>
          <ApartmentIcon sx={{color: 'white'}}/>
        </ListItemIcon>
        <ListItemText primary="Venues" sx={{color: 'white'}}  />
      </ListItem>
    </Link>

    
          </List>
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
            <Outlet />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
     
    </ThemeProvider>
  );
}