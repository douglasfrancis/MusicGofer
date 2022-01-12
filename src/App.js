import './App.css';
import Template from './Components/Template'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import { AuthProvider } from './Context/AuthContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import enLocale from 'date-fns/locale/en-GB';



function App() {
  return (
    
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
        <ToastContainer position='top-center' />

        <Template />
      </LocalizationProvider>
   </AuthProvider>
   
  );
}

export default App;
