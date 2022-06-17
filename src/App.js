import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import { AuthProvider, useAuth } from './Context/AuthContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import enLocale from 'date-fns/locale/en-GB';
//router
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//components
import Calendar from './Components/Calendar/Calendar'
import Dashboard from './Components/Dashboard/Dashboard';
import Artists from './Components/artists/Artists';
import Venues from './Components/Venues/Venues';
import Login from './Components/Auth/Login';
import Confirm from './Components/Calendar/Confirm';
import Decline from './Components/Calendar/Decline';
import RequireAuth from './Components/Auth/RequireAuth'
import AdminUI from './Components/AdminUI';
import TandCs from './Components/TandCs';
import Settings from './Components/Settings';
import Unauthorised from './Components/Auth/Unauthorised'


function App() {

  return (
    

    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
        <ToastContainer position='top-center' />
        <Router>
          <Routes>
                <Route  path='/login' element={<Login/>} />
                <Route  path='/tandcs' element={<TandCs/>} />
                <Route  path='/unauthorised' element={<Unauthorised/>} />
                <Route  path='confirm/:id' element={<Confirm/>} />
                <Route  path='decline/:id' element={<Decline/>} />


                <Route   element={<RequireAuth  />} >
                    <Route  path='/' element={<AdminUI/>} >
                      <Route  path='dashboard' element={<Dashboard/>} />
                      <Route  path='calendar' element={ <Calendar/>} />
                      <Route  path='artist-calendar' element={<Calendar/>} />
                      <Route  path='artists' element={ <Artists/>} />
                      <Route  path='venues' element={ <Venues/>} />
                      <Route  path='settings' element={ <Settings/>} />
                      
                    </Route>
                </Route>

                
          </Routes>
        </Router>
      </LocalizationProvider>
   </AuthProvider>
   
  );
}

export default App;
