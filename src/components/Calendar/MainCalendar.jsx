import React, { useState } from 'react'
import { Calendar  , momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarNav from './CalendarNav';
import { useOutletContext } from 'react-router-dom';
import EditEvent from './EditEvent';
import CalendarLoading from './CalendarLoading';

const localizer = momentLocalizer(moment);

const MainCalendar = () => {
  const {toggle, loading, events, setEvent, event  } = useOutletContext()
  const [coor, setCoor] = useState({x: '', y: ''});

  return (
     <div className={toggle ? 'calendar_container active' :'calendar_container'} onClick={(e) => {
        setCoor({...coor, x: e.clientX, y: e.clientY})
     }}>
       {event.title && <EditEvent event={event} setEvent={setEvent} coor={coor} />}
     <CalendarNav />
     {loading ?
    <CalendarLoading />
     :
     <Calendar
     popup
     localizer={localizer}
     resizable={true}
     startAccessor={"start"}
     events={events}
     endAccessor={"end"}
     selectable={true}
     eventPropGetter={(event) => {
       return {
         style: {
           backgroundColor: event?.color,
           color: '#fff',
         },
       };
     }}
     onNavigate={date => {
      console.log(date);
    }}
     onSelectEvent={(event) => {
      setEvent(event)
    }
  }
     onSelectSlot={slotInfo => console.log(slotInfo)}
     onShowMore={(events, date) => {
      console.log(events);
      console.log(date);
     }}
   />
     }
    </div>
  )
}

export default MainCalendar