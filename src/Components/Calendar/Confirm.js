import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams} from 'react-router-dom'

export default function Confirm() {
    let { id } = useParams()


    useEffect(()=>{
        confirmGig()
    },[])

    const style = {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 'bold'

    }


    const payload = {
        id: id,
        data: {
        status: "Confirmed",
        backgroundColor: "green",
        borderColor:"green"
        }
    }

    const confirmGig =()=>{
        axios.post(`${process.env.REACT_APP_MG_API}/confirm-gig`, payload)
    }
    return (
        <div style={style}>
            <p>The gig is now confirmed!</p>
            <br/>
            <p>For further details, please log into your account</p>
            
        </div>
    )
}
