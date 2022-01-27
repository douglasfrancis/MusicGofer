import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list'
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import ViewArtistEvent from './ViewArtistEvent';

export default function ArtistCalendar() {

    const {currentUser} = useAuth()
    const {uid} = currentUser

    const [eventDate, setEventDate] = useState(null)
    const [event, setEvent] = useState()
    const [openEvent, setOpenEvent] = useState(false);

    const handleOpenEvent = () => setOpenEvent(true); 

    useEffect(()=>{
        getEvents()
    }, [])

    const [events, setEvents] = useState([])

    const getEvents = () =>{
        axios.post(`${process.env.REACT_APP_MG_API}/get-events-by-id`, {artistId: uid}).then(function(res){
            setEvents(res.data)
        })
    }

    const showEvent=(info)=>{
    
        let eventInfo = info.event._def.extendedProps
        let eventDate = info.event._instance.range.start
        setEventDate(eventDate)
        setEvent(eventInfo)  
        handleOpenEvent()
      }

    return (
        <>

        {event && <ViewArtistEvent openEvent={openEvent} setOpenEvent={setOpenEvent} event={event} setEvent={setEvent} eventDate={eventDate} getEvents={getEvents}/>}

        <FullCalendar
         plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}
         initialView = 'dayGridMonth'

        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listMonth'
        }}
        events={ events}
        eventClick={showEvent}
       
      />
      </>
    )
}
