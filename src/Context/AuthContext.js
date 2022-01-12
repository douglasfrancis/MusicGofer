import React, { createContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import app from '../Firebase'


const AuthContext = createContext()
export default AuthContext

export function AuthProvider({children}){

    const [currentUser, setCurrentUser] = useState()

    const auth = getAuth(app);

    const login = (email, password) =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setCurrentUser(user)
          toast.success("Successfully logged in")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
         console.log(errorCode, errorMessage)
         toast.error(errorMessage)
        });
      
    } 

    const logoutUser = () =>{
        signOut(auth).then(() => {
            toast.success("Successfully logged out")
          }).catch((error) => {
            console.log(error)
          });
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
         login, logoutUser, currentUser, setCurrentUser, resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

