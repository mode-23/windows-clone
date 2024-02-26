import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import calendarIcon from "../Home/Home_assest/Google_Calendar_icon_(2020).svg.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import GoogleMenu from "../Google_Components/GoogleMenu";
import { BiCaretDown } from "react-icons/bi";
import { db } from "../../firebase/Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import UserMenu from "../Google_Components/UserMenu";

const CalendarHeader = ({ setToggle }) => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState({})

  useEffect(() => {
    if(id){
      const unsub = onSnapshot(doc(db, "calendar", id), (doc) => {
        setData(doc?.data())
    });
      return () => {
        unsub();
      }
    }
}, [id])

  return (
    <header className="calendar_header" style={{borderBottom : id ? '0' : '1px solid #ccc'}} >
      {!id ? (
        <div className="df">
          <div
            className="icon_1 icon_3"
            onClick={() => setToggle((prev) => !prev)}
          >
            <GiHamburgerMenu />
          </div>
          <NavLink to={"/calendar"} className={"df"}>
            <img src={calendarIcon} alt="google calendar" />
            calendar
          </NavLink>
        </div>
      ) : (
        <div className="editEvent_header">
          <div className="df">
            <div className="big_icon" onClick={() => navigate('/calendar')}>
              <IoCloseSharp />
            </div>
          <input type="text" placeholder="Add title" defaultValue={data?.title}  key={data?.title} />
          </div>
          <div className="df">
            <button className="saveBtnCalendar">Save</button>
            <div className="more_event_actions">
              <button className="actionsBtn">
                More actions
                <BiCaretDown />
             </button>
            </div>
          </div>
        </div>
      )}
      <div className="df">
      <GoogleMenu />
      <UserMenu />
      </div>
    </header>
  );
};

export default CalendarHeader;
