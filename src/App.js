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
  useNavigate
} from "react-router-dom";

//components
import Calendar from './Components/Calendar/Calendar'
import Dashboard from './Components/Dashboard/Dashboard';
import ArtistDashboard from './Components/Dashboard/ArtistDashboard'
import Artists from './Components/artists/Artists';
import Venues from './Components/Venues/Venues';
import Login from './Components/Auth/Login';
import Confirm from './Components/Calendar/Confirm';
import Decline from './Components/Calendar/Decline';
import ArtistCalendar from './Components/Calendar/ArtistCalendar';
import UserProfile from './Components/Profile/UserProfile';
import RequireAuth from './Components/Auth/RequireAuth'
import AdminUI from './Components/AdminUI';
import ArtistUI from './Components/ArtistUI';
import TandCs from './Components/TandCs';


function App() {

  return (
    

    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
        <ToastContainer position='top-center' />
        <Router>
          <Routes>
                <Route  path='/login' element={<Login/>} />
                <Route  path='/tandcs' element={<TandCs/>} />


                <Route  path='/' element={<RequireAuth><AdminUI/></RequireAuth>} >
                    <Route  path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>} />
                    <Route  path='calendar' element={<RequireAuth > <Calendar/></RequireAuth>} />
                    <Route  path='artist-calendar' element={<RequireAuth><Calendar/></RequireAuth>} />
                    <Route  path='profile' element={<RequireAuth><UserProfile/></RequireAuth>} />
                    <Route  path='artists' element={<RequireAuth > <Artists/></RequireAuth>} />
                    <Route  path='venues' element={<RequireAuth > <Venues/></RequireAuth>} />
                    <Route  path='confirm/:id' element={<Confirm/>} />
                    <Route  path='decline/:id' element={<Decline/>} />
                </Route>

                <Route  path='/artist' element={<RequireAuth><ArtistUI/></RequireAuth>} >
                    <Route  path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>} />
                    <Route  path='calendar' element={<RequireAuth><ArtistCalendar/></RequireAuth>} />
                    <Route  path='profile' element={<RequireAuth><UserProfile/></RequireAuth>} />
                    <Route  path='confirm/:id' element={<Confirm/>} />
                    <Route  path='decline/:id' element={<Decline/>} />
                </Route>


                
          </Routes>
        </Router>
      </LocalizationProvider>
   </AuthProvider>
   
  );
}

export default App;
