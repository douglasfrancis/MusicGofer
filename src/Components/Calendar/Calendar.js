import React, {useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list'
import AddEvent from './AddEvent';
import ViewEvent from './ViewEvent'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

export default function Calendar() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([])
  const [date, setDate] = useState(null)
  const [eventDate, setEventDate] = useState(null)
  const [event, setEvent] = useState()

  const [openEvent, setOpenEvent] = useState(false);


  const handleOpen = () => setOpen(true); 
  const handleOpenEvent = () => setOpenEvent(true); 

  useEffect(()=>{
    getEvents()
  },[])

  const getEvents =() =>{
    axios.get('http://localhost:4000/get-events').then(function(res){
      setEvents(res.data)
    })
  }

  const openDay= (info)=>{
    
      setDate(info.date)
      handleOpen(true) 
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
      <Fab color="primary" aria-label="add" sx={{margin: '20px' }}>
        <AddIcon onClick={handleOpen} />
      </Fab>

      <AddEvent open={open} setOpen={setOpen} chosenDate={date}/>

      {event && <ViewEvent openEvent={openEvent} setOpenEvent={setOpenEvent} event={event} setEvent={setEvent} eventDate={eventDate} />}

      <FullCalendar
         plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}
         initialView = 'dayGridMonth'

        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listMonth'
        }}
        events={ events}
        dateClick={openDay}
        eventClick={showEvent}
       
      />
      </>
    )
  
}