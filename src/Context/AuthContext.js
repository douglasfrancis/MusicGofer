import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import app from '../Firebase'


const AuthContext = createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}){

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
       setCurrentUser(user)
       setLoading(false)
      });

      return unsubscribe
    },[])

    const auth = getAuth(app);

    const logoutUser = () =>{
        signOut(auth)
    }

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
         logoutUser, currentUser, setCurrentUser, resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
          {console.log(currentUser)}
            {!loading && children}
        </AuthContext.Provider>
    )
}

