import React, { useEffect } from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios'


export default function Decline() {
    let { id } = useParams()

    useEffect(()=>{
        declineGig()
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
            artist: [],
            artistId: [],
            status: "Unassigned",
            backgroundColor: "red",
            borderColor:"red"
        }
    }

    const declineGig=()=>{
        axios.post(`${process.env.REACT_APP_MG_API}/decline-gig`, payload)

    }

    return (
        <div style={style}>
            <p>We're sorry to hear you can't make this one. Please keep an eye out for any future gigs.</p>
        </div>
    )
}
