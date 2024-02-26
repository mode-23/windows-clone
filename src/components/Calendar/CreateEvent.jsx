import React, { useContext, useReducer } from "react";
import { IoCloseSharp, IoTimeOutline } from "react-icons/io5";
import { BsTextLeft } from "react-icons/bs";
import { v4 } from "uuid";
import { db } from "../../firebase/Firebase";
import { doc, setDoc , serverTimestamp } from "firebase/firestore"; 
import {userContext} from '../../Context/UserContext'

const CreateEvent = ({ isOpen }) => {
  const {user} = useContext(userContext)
  const initialstate = {
    id: v4(),
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    type: "",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "input":
        return {...state, [action.field] : action.payload};
      case "check":
        return {...state, type : action.payload};
        case "reset":
          return initialstate;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialstate);
  const handleChange = e => {
     dispatch({
          type: 'input',
          field: e.target.name,
          payload: e.target.value,
     })
  }
  const handleReset = () => {
    dispatch({type: "reset"})
  }
  const BtnTypes = [
     {
          name: 'event',
     },
     {
          name: 'birthday',
     },
     {
          name: 'task',
     },
  ]
  const handleCheck = (name) => {
     dispatch({
          type: 'check',
          payload: name,
     })
  }
  function isAnyValueEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === "") {
        return true;
      }
    }
    return false;
  }
  const handleSubmit = async () => {
    if(user?.uid){
    const res = await setDoc(doc(db, "calendar", state.id), {
      ...state,
      publishedAt: serverTimestamp(),
      user: user?.uid,
    });
    console.log(res);
    handleReset()
  }
  }

  return (
    <div className="create_calendar">
      <div className="create_calendar_header">
        <div className="icon_1 icon_3" onClick={() => isOpen(false)}>
          <IoCloseSharp />
        </div>
      </div>
      <div className="create_calendar_title">
        <div className="input_calendar">
          <input type="text" placeholder="Add title" name="title" value={state.title} onChange={handleChange} />
        </div>
        <div className="df">
          {BtnTypes.map((item, index) => (
          <button key={index} onClick={() => handleCheck(item.name)} className={state.type === item.name ? "active" : "nun"} >{item.name}</button>
          ))}
        </div>
      </div>
      <div className="create_calendar_body">
        <div className="create_calendar_body_slice">
          <div className="slice_icon">
            <IoTimeOutline />
            <span>start</span>
          </div>
          <div className="slice_text">
            <input
              type="datetime-local"
              name="startDate"
              onChange={handleChange}
              value={state.startDate}
              className="calender_asset"
            />
          </div>
        </div>
        <div className="create_calendar_body_slice">
          <div className="slice_icon">
            <IoTimeOutline />
            <span>end</span>
          </div>
          <div className="slice_text">
            <input
              type="datetime-local"
              name="endDate"
              onChange={handleChange}
              value={state.endDate}
              className="calender_asset"
            />
          </div>
        </div>
        <div className="create_calendar_body_slice">
          <div className="slice_icon">
            <BsTextLeft />
          </div>
          <div className="slice_text">
            <textarea
              className="calender_asset"
              placeholder="Add description"
              name="description"
              value={state.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="create_calendar_footer">
        <button onClick={handleSubmit} disabled={isAnyValueEmpty(state)}>save</button>
      </div>
    </div>
  );
};

export default CreateEvent;
