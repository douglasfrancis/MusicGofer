import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import auth from '../Firebase'
import axios from 'axios'


const AuthContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}){

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState()

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user){
          setCurrentUser(user)
          axios.post(`${process.env.REACT_APP_MG_API}/get-artist-by-id`, {_id: user.uid}).then(function (res){
            const role = res.data.role
            setRole(role)
          })
        }
        setLoading(false)

      });

      return unsubscribe
    },[])



    const resetPassword = (email) =>{
        sendPasswordResetEmail(auth, email)
  .then(() => {
    toast("Please check your email to reset password")
  })
  .catch((error) => {
    toast.error("Sorry, there has been an error")
    console.log(error)
  });
    }
    

    const value= {
          currentUser, setCurrentUser, resetPassword, setRole, role
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

