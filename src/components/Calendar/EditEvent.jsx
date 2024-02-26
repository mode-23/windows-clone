import React, { useRef } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { PiPushPinSimple, PiTrash , PiPushPinSimpleFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const EditEvent = ({event, setEvent, coor}) => {
     const navigate = useNavigate()
     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
     const formatDay = date => {
          return  <span className='slice_span2'>{days[new Date(date).getDay()]}, {new Date(date).getDate()} {months[new Date(date).getMonth()]} | {new Date(date).getHours() > 9 ? new Date(date).getHours() : '0' + new Date(date).getHours() }:{new Date(date).getMinutes() > 9 ? new Date(date).getMinutes() : '0' + new Date(date).getMinutes()}</span>
     }
     const editEventRef = useRef(null)
  return (
    <div className='edit_event' ref={editEventRef} style={{top: coor.y , left: coor.x }} >
     <header className="edit_event_header">
          <div className="df">
               <div className="icon_1 icon_3" onClick={() => {
                    setEvent({})
                    navigate(`eventedit/${event.id}`)
                    }
                    }>
               <GoPencil />
               </div>
               <div className="icon_1 icon_3">
               <PiTrash />
               </div>
               <div className="icon_1 icon_3">
               <PiPushPinSimple />
               </div>
               <div className="icon_1 icon_3 active" onClick={() => setEvent({})}>
               <IoCloseSharp />
               </div>
          </div>
     </header>
     <div className="edit_event_body">
          <div className="edit_event_body_slice">
          <div className="create_calendar_body_slice">
          <div className="slice_icon">
               <div className="inIcon" style={{backgroundColor : event.color}} />
          </div>
          <div className="slice_text">
               <div className="slice_flex">
               <p className='slice_p'>{event.title}</p>
               <span className='slice_span'>{event.description}</span>
               </div>
          </div>
        </div>
        <div className="create_calendar_body_slice">
          <div className="slice_icon">
               <BsCalendar2WeekFill />
          </div>
          <div className="slice_text">
               <div className="df">
               <span className="slice_span3">From</span>
               {formatDay(event.start)}
               </div>
               <div className="df">
               <span className="slice_span3">To</span>
               {formatDay(event.end)}
               </div>
          </div>
        </div>
          </div>
     </div>
    </div>
  )
}

export default EditEvent