import React, {useContext, useState} from 'react'
import { toast } from 'react-toastify'
import AuthContext from '../../Context/AuthContext'

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {login, resetPassword } = useContext(AuthContext)

    const handleSignIn = (e) =>{
        e.preventDefault()

        login(email, password)
    }

    const handleReset = () =>{
        if(!email){
            toast.error("Please input email to reset password")
        } else {
            resetPassword(email)
        }
        
    }

    return (
        <div>
            <form>
                <h3>Login</h3>
                <input placeholder='Email Address' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input placeholder='password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />

                <button onClick={handleSignIn}>Login</button>

                <a onClick={handleReset}><p >Forgotten password?</p></a>
            </form>
            

            
        </div>
    )
}
