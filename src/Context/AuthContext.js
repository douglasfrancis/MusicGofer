import React, { createContext, useContext, useEffect, useState } from "react";
import { sendPasswordResetEmail,onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import {adminAuth} from '../Firebase'

const AuthContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}){

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(adminAuth, (user) => {
        if(user){
          setCurrentUser(user)
          setLoading(false)
        } else {
          setCurrentUser(null)
          setLoading(false)
        }
      
      })
    return unsubscribe

    },[])
  


  const resetPassword = (email) =>{
        sendPasswordResetEmail(adminAuth, email)
  .then(() => {
    toast("Please check your email to reset password")
  })
  .catch((error) => {
    toast.error("Sorry, there has been an error")
    console.log(error)
  });
    }
    

    const value= {
          currentUser, resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

