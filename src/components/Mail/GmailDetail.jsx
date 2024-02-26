import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { NavLink, useOutletContext, useParams } from 'react-router-dom'
import { db } from '../../firebase/Firebase'
import {BsArrowLeftShort , BsStar, BsTrash} from 'react-icons/bs'
import {MdLabelImportantOutline, MdOutlineMarkEmailUnread} from 'react-icons/md'
import gmailuserpic from '../Home/Home_assest/gmailuser.png'

const GmailDetail = () => {
  const { user } = useOutletContext()
  const {id} = useParams()
  const [gmail, setGmail] = useState({})
  const [sender, setSender] = useState({})
  
  useEffect(() => {
     const unsub = onSnapshot(doc(db, "message", id), (doc) => {
          setGmail(doc.data())
   });
     return () => {
       unsub();
     }
 }, [user , id])
 
 useEffect(() => {
  if(gmail?.fromUserId){
  const unsub = onSnapshot(doc(db, "user", gmail?.fromUserId), (doc) => {
    console.log(doc.data());
    setSender(doc.data())
});
  return () => {
    unsub();
  }
}

}, [user , id, gmail])
 useEffect(() => {
  const handleViewed = async() => {
    if(!gmail?.viewedBy?.includes(user?.uid)){
      const DocRef = doc(db, "message", id);
      await updateDoc(DocRef, {
        viewedBy: arrayUnion(user?.uid)
      });
    }
  }
  user?.uid && handleViewed()
 }, [user])
 function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return "few seconds ago";
}
  return (
    <div>
      <div className="gmail_hdr">
        <NavLink to={'/gmail'} className="icon_1 icon_2" end><BsArrowLeftShort /></NavLink>
        <div className="df">
        <div className="icon_1 icon_3"><MdOutlineMarkEmailUnread /></div>
        <div className="icon_1 icon_3"><BsTrash /></div>
        <div className="icon_1 icon_3"><MdLabelImportantOutline /></div>
        <div className="icon_1 icon_3"><BsStar /></div>
        </div>
      </div>
      <div className="gmail_bdy">
        <div className="gmail_bdy_subject">
          <h3>{gmail?.subject}</h3>
        </div>
        <div className="gmail_bdy_header">
          <div className="df">
            <img src={sender?.photoURL ? sender?.photoURL : gmailuserpic} alt="gmail user picture" className='gmailuserpic' />
            <div>
            <h5>{sender?.displayName}</h5>
            <h6 className='soft-txt-dark'>{sender?.email}</h6>
            </div>
          </div>
          <div className="gmail_date">
            <h6 className='soft-txt-dark'>{new Date().toLocaleDateString('en-GB') == new Date(gmail?.publishedAt?.seconds *1000 ).toLocaleDateString('en-GB') ? "Today" : new Date(gmail?.publishedAt?.seconds *1000 ).toLocaleDateString('en-GB')} ({timeSince(gmail?.publishedAt?.seconds * 1000)})</h6>
          </div>
        </div>
        <div className="gmail_bdy_text title dark">
        {gmail?.text}
        </div>
      </div>
    </div>
  )
}

export default GmailDetail