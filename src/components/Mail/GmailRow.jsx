import React, { useEffect, useState, useRef } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { db } from "../../firebase/Firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { MdLabelImportantOutline, MdLabelImportant, MdOutlineMarkEmailRead, MdOutlineMarkEmailUnread } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import { IoMdMore } from "react-icons/io";
import Tooltip from "../Asset/Tooltip";

const GmailRow = ({ item, checkBoxSelected, selectedItems, setSelectedItems, user, data }) => {
  const checkboxRef = useRef(null)
  const [sender, setSender] = useState({});
  const [mouseState, setMouseState] = useState(false);
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let daysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const navigate = useNavigate();
  let handleStar = async (element) => {
    const DocRef = doc(db, "message", element?.id);
    if (!element?.favourite || element?.favourite == "false") {
      await updateDoc(DocRef, {
        favourite: "true",
      });
    } else {
      await updateDoc(DocRef, {
        favourite: "false",
      });
    }
  };
  let handleImportant = async (element) => {
    const DocRef = doc(db, "message", element?.id);
    if (!element?.important || element?.important == "false") {
      await updateDoc(DocRef, {
        important: "true",
      });
    } else {
      await updateDoc(DocRef, {
        important: "false",
      });
    }
  };
  function formatDate(date) {
    let today = new Date();
    if (
      date.getFullYear() == today.getFullYear() &&
      date.getDate() == today.getDate() &&
      date.getDay() == today.getDay() &&
      date.getMonth() == today.getMonth()
    ) {
      return `${
        date.getHours() <= 9 ? "0" + date.getHours() : date.getHours()
      }:${
        date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes()
      }`;
    } else {
      return `${date.getDate()} ${month[date.getMonth()]}`;
    }
  }

  const handleBoxState = () => {
    if (
      selectedItems.includes(item?.id) &&
      item?.viewedBy?.includes(user?.uid)
    ) {
      return "gmail_body_message_inbox active";
    } else if (item?.viewedBy?.includes(user?.uid)) {
      return "gmail_body_message_inbox read";
    } else if (selectedItems.includes(item?.id)) {
      return "gmail_body_message_inbox active";
    } else {
      return "gmail_body_message_inbox";
    }
  };
  useEffect(() => {
    if (item?.fromUserId) {
      const unsub = onSnapshot(doc(db, "user", item?.fromUserId), (doc) => {
        setSender(doc.data());
      });
      return () => {
        unsub();
      };
    }
  }, [item]);

  function formateEmailContent(date) {
    return `${item?.text} ${
      "On " + daysArr[date.getDay()] + ", " + date.getDate()
    } ${month[date.getMonth()]} ${date.getFullYear()} at ${
      date.getHours() > 9 ? date.getHours() : "0" + date.getHours()
    }:${
      date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()
    }, from ${sender?.displayName} <${sender?.email}> `;
  }
  const contextCapture = (e) => {
    e.preventDefault();
    const name = checkboxRef?.current.name
    if (name !== "selectAll") {
      if (!selectedItems.includes(name)) {
        setSelectedItems([...selectedItems, name]);
      } else {
        setSelectedItems(selectedItems.filter((item) => item !== name));
      }
    } else {
      setSelectedItems([]);
      if (selectedItems.length !== data?.length) {
        const list = [];
        data?.forEach((item) => {
          list.push(item?.id);
          setSelectedItems(list);
        });
      } else {
        setSelectedItems([]);
      }
    }
  }
  const mouseOverHandle = () => {
    setMouseState(true)
  }
  const mouseLeaveHandle = () => {
    setMouseState(false)
  }
  return (
    <div className={handleBoxState()} onContextMenu={contextCapture} onMouseOver={mouseOverHandle} onMouseLeave={mouseLeaveHandle}>
      <div className="df gap-20">
        <div>
          <input
            type="checkbox"
            id={item?.id}
            onChange={(e) => checkBoxSelected(e, data)}
            className="csBx"
            name={item?.id}
            ref={checkboxRef}
          />
          <label htmlFor={item?.id}>
            <div
              className={
                selectedItems.includes(item?.id) ||
                selectedItems.includes("selectAll")
                  ? "customCheckBox checked"
                  : "customCheckBox"
              }
            ></div>
          </label>
        </div>
        <div
          className={item?.favourite == "true" ? "icon_1 active" : "icon_1"}
          onClick={() => handleStar(item)}
        >
          {item?.favourite == "true" ? <BsStarFill /> : <BsStar />}
        </div>
        <div
          className={
            item?.important == "true" ? "icon_1 icon_2 active" : "icon_1 icon_2"
          }
          onClick={() => handleImportant(item)}
        >
          {item?.important == "true" ? (
            <MdLabelImportant />
          ) : (
            <MdLabelImportantOutline />
          )}
        </div>
      </div>
      <h3 className="title-sm" onClick={() => navigate(`/gmail/${item?.id}`)}>
        {sender?.displayName}
      </h3>
      <p className="title-sm" onClick={() => navigate(`/gmail/${item?.id}`)}>
        <span>{item?.subject}</span>{" "}
        {formateEmailContent(new Date(item?.publishedAt?.seconds * 1000))}{" "}
      </p>
      {mouseState ?
      <>
      <span className="df mouse_enter_boxs">
        <div className="icon_1 toolholder">
          <TbTrash />
          <Tooltip message={"Delete"} direction={"bottom"} />
          </div>
        {item?.viewedBy?.includes(user?.uid) ?
        <div className="icon_1 toolholder">
          <MdOutlineMarkEmailUnread />
          <Tooltip message={"Mark as unread"} direction={"bottom"} />
          </div>
          :
        <div className="icon_1 toolholder">
          <MdOutlineMarkEmailRead />
          <Tooltip message={"Mark as read"} direction={"bottom"} />
          </div>
        }
        <div className="icon_1 toolholder">
          <IoMdMore />
          <Tooltip message={"More"} direction={"bottom"} />
          </div>
      </span>
      </>
      :
      <>
      <span onClick={() => navigate(`/gmail/${item?.id}`)} className="togglespan" >
        {formatDate(new Date(item?.publishedAt?.seconds * 1000))}
      </span>
      </>
      }
    </div>
  );
};

export default GmailRow;
