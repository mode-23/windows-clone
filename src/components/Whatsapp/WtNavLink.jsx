import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/Firebase';
import { NavLink } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import userImg from '../Home/Home_assest/user1.png'

const WtNavLink = ({item, user , setToggleSmMenu}) => {
     const [localUser, setLocalUser] = useState({})
     const myArray = item?.chatid.split('@');
     let receiverId ;
     if(myArray[0] === user?.uid){
          receiverId = myArray[1]
        }else{
          receiverId = myArray[0]
        }
     useEffect(() => {
          const unsub = onSnapshot(doc(db, "user", receiverId), (doc) => {
            setLocalUser(doc.data())
            console.log(doc.data());
        });
          return () => {
            unsub();
          }
        }, [item , receiverId])

        function timeSince(date) {

          var seconds = Math.floor((new Date() - date) / 1000);
        
          var interval = seconds / 31536000;
        
          if (interval > 1) {
            return Math.floor(interval) + "y";
          }
          interval = seconds / 2592000;
          if (interval > 1) {
            return Math.floor(interval) + "m";
          }
          interval = seconds / 86400;
          if (interval > 1) {
            return Math.floor(interval) + "d";
          }
          interval = seconds / 3600;
          if (interval > 1) {
            return Math.floor(interval) + "h";
          }
          interval = seconds / 60;
          if (interval > 1) {
            return Math.floor(interval) + "m";
          }
          return "1m";
        }
     //    console.log(item);
  return (
     <li>
     <NavLink to={`/whatsapp/${item?.chatid}`} onClick={() => setToggleSmMenu(false)}>
     <div className="img_dash">
              {localUser?.photoURL ?
              <img src={localUser?.photoURL ? localUser?.photoURL : userImg} alt={localUser?.uid} />
                :
                <div className="brColor" style={{backgroundColor: localUser?.userColor}}>{localUser?.displayName?.[0]}</div>
              }
              </div>
          <div className="start">
               <h4>{localUser?.displayName?.slice(0,10)}...</h4>
               <p>{item?.last_msg?.from == localUser?.uid ? item?.last_msg?.text?.slice(0,20) : "You: " + item?.last_msg?.text?.slice(0,10)}... <span>{timeSince(new Date(item?.last_msg?.publishedAt?.seconds * 1000))}</span></p>
          </div>
     </NavLink>
     </li>
  )
}

export default WtNavLink