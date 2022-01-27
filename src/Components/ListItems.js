import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
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
   
  </div>
);
