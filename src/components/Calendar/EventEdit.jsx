import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { db } from "../../firebase/Firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { PiTextAlignLeft } from "react-icons/pi";
import { BsCalendarEvent , BsBag } from "react-icons/bs";
import location from "../Home/Home_assest/google-maps.png";
import { BiCaretDown } from "react-icons/bi";

const EventEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { user } = useOutletContext();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "calendar", id), (doc) => {
      setData(doc.data());
      console.log(doc.data());
    });
    return () => {
      unsub();
    };
  }, [id]);
  const selectedHandler = (e) => {
    console.log(
      e.target.value.slice(e.target?.selectionStart, e.target?.selectionEnd)
    );
  };
  return (
    <div className="main_event_edit">
      <header className="main_event_edit_header">
        <div className="df">
          <input
            type="datetime-local"
            className="edit_calendar_date"
            defaultValue={data?.startDate}
          />
          <div className="slice_span2">to</div>
          <input
            type="datetime-local"
            className="edit_calendar_date"
            defaultValue={data?.endDate}
          />
        </div>
      </header>
      <div className="main_event_edit_body">
        <div className="event_tab_details">
          <ul className="tab_event_ul">
            <li className="active">even details</li>
          </ul>
          <div className="event_body_details">
            <ul className="body_event_ul">
              <li>
                <span className="event_details_icon">
                  <img src={location} alt="google maps" />
                </span>
                <span>
                  <button className="googleBtn">
                    Add Google Maps place location
                  </button>
                </span>
              </li>
              <li>
                <span className="event_details_icon">
                  <BsCalendarEvent />
                </span>
                <span className="df">
                  <small>{user?.displayName}</small>
                  <button className="actionsBtn">
                    <div className="clr" />
                    <BiCaretDown />
                  </button>
                </span>
              </li>
              <li>
                <span className="event_details_icon">
                  <BsBag />
                </span>
                <span className="df">
                  <button className="actionsBtn">
                    Free
                    <BiCaretDown />
                  </button>
                  <button className="actionsBtn">
                    Default visibility
                    <BiCaretDown />
                  </button>
                </span>
              </li>
              <li>
                <span className="event_details_icon">
                  <PiTextAlignLeft />
                </span>
                <span>
                  <textarea
                    onSelect={selectedHandler}
                    placeholder="Add description"
                    defaultValue={data?.description}
                  ></textarea>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="event_tab_guests">
          <div className="event_tab_details event_tab_details2">
            <ul className="tab_event_ul">
              <li className="active">guests</li>
            </ul>
          </div>
          <div className="event_body_details">
                <input type="text" placeholder="Add guests" />
                <div className="mtTop">
                <small>Guest permissions</small>
                <ul className="guest_ul">
                  <li className="df">
                  <div className="customCheckBox"></div>
                  <p>Modify event</p>
                  </li>
                  <li className="df">
                  <div className="customCheckBox checked"></div>
                  <p>Invite others</p>
                  </li>
                  <li className="df">
                  <div className="customCheckBox checked"></div>
                  <p>See guest list</p>
                  </li>
                </ul>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventEdit;
