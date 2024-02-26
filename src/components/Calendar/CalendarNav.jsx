import React, { useState } from 'react'
import plusGoogle from '../Home/Home_assest/plus.png'
import { BiCaretDown } from 'react-icons/bi'
import { GoChevronDown } from 'react-icons/go'
import CreateEvent from './CreateEvent'
import { useOutletContext } from 'react-router-dom'
const CalendarNav = () => {
     const [open, isOpen] = useState(false)
     const {events} = useOutletContext()
  return (
     <div className="calendar_nav">
          {open && <CreateEvent isOpen={isOpen} />}
          <button className='calendarBtn' onClick={() => isOpen(true)} disabled={open}>
               <img src={plusGoogle} alt="plus icon" />
               <p>create</p>
               <BiCaretDown />
          </button>
          <div className="calendar_nav_drop_down">
               <div className="drop_title_calendar">
                    My calendars
                    <GoChevronDown />
               </div>
               <ul>
                    <li className='df'>
                         <div className="customCheckBox checked event"></div>
                         <p>events</p>
                    </li>
                    <li className='df'>
                         <div className="customCheckBox checked birthday"></div>
                         <p>birthday</p>
                    </li>
                    <li className='df'>
                         <div className="customCheckBox checked task"></div>
                         <p>task</p>
                    </li>
               </ul>
               <div className="drop_title_calendar">
                    My calendars
                    <GoChevronDown />
               </div>
               <ul>
                    {events.map(item => (
                    <li className='df' key={item?.id}>
                         <div className="customCheckBox checked"></div>
                         <p>{item?.title}</p>
                    </li>
                    ))}
               </ul>
          </div>
     </div>
  )
}

export default CalendarNav