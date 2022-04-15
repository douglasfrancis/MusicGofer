import React from 'react'
import { Navigate, Outlet, useLocation} from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext';

export default function RequireAuth() {

    let {currentUser} = useAuth();
    const location = useLocation()
     
      return( 
            currentUser ? <Outlet /> : <Navigate to="/login" state={{from : location}} replace/> 

      )
    
  
  }