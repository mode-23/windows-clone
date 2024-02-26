import React, { useEffect, useState, useContext } from 'react'
import './calendar.css'
import CalendarHeader from './CalendarHeader';
import {userContext} from '../../Context/UserContext'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { Outlet, useNavigate } from 'react-router-dom';
import { BsDash } from 'react-icons/bs';
import { VscPrimitiveSquare } from 'react-icons/vsc';
import { IoCloseSharp } from 'react-icons/io5';

const Calendar = () => {
  const {user} = useContext(userContext)
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const [events, setEvents] = useState([])
  const [loading, isLoading] = useState(false)
  const [event, setEvent] = useState({})
  const [wideTab, isWideTab] = useState(true)
  const [tabbed, isTabbed] = useState(false)

        useEffect(() => {
          isLoading(true)
          if(user?.uid){
          const refrence = collection(db, "calendar");
          const q = query(refrence, where("user" , "==" , user?.uid));
          const unsub = onSnapshot(q , (snapShot) => {
            let list = [];
            snapShot.docs.forEach(doc => {
              list.push({...doc.data()})
              let eventHandler =  list.map((event) => {
                return {
                  title: event?.title,
                  start: new Date(event?.startDate),
                  end: new Date(event?.endDate),
                  color: checkColor(event?.type),
                  description: event?.description,
                  id: event?.id,
                };
              });
              setEvents(eventHandler)
          });
          if(!list.length)  setEvents([])
          isLoading(false)
          },
          (error) => {
            console.log(error);
          }
          );
          return () => {
            unsub();
          }
        }
      }, [user])
      const checkColor = (type) =>{
        switch (type) {
          case "task":
            return "#039be5";
            case "birthday":
              return "#0b8043";
              case "event":
                return "#c452f7";
          default:
            return "#0b8043"
        }
      }
      const handleTabSize = () => {
        if(wideTab){
          return 'tab calendar wide'
        }else if(tabbed){
          return 'tab calendar close'
        }else{
          return 'tab calendar'
        }
      }
  return (
    <div className={handleTabSize()}>
        <div className="tab_title calendar_hd_title" onDoubleClick={() => isWideTab(!wideTab)}>
        <div className="tab_utils">
          <div className="tab_util_icon" onClick={() => isTabbed(!tabbed)}><BsDash /></div>
          <div className="tab_util_icon" onClick={() => isWideTab(!wideTab)}><VscPrimitiveSquare /></div>
          <div className="tab_util_icon close" onClick={() => navigate('/')}><IoCloseSharp /></div>
        </div>
     </div>
     <CalendarHeader setToggle={setToggle} />
     <Outlet context={{ user , toggle ,  events , setEvent ,loading, event}}/>
    </div>
  )
}

export default Calendar