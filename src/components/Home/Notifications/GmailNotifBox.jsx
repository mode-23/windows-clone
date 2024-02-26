import React, { useEffect, useState } from 'react'
import gmail_icon from '../Home_assest/gmail.png'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase/Firebase'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotifBox = ({item, user }) => {
  const [userAuthor, setuserAuthor] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    if(user?.uid) {
      const unsub = onSnapshot(doc(db, "user", item?.fromUserId), (doc) => {
          setuserAuthor(doc.data())
      });
        return () => {
          unsub();
        }
    }
    }, [item])
    
  return (
     <motion.div  initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className='gmailNotifications_box' onClick={() => navigate('/gmail/' + item?.id)}>
     <div className="df">
     <img className='notifIcon' src={gmail_icon} alt='gmail icon' />
     <h4 className="title-sm">
       {item?.type === "compose" ?
       'Gmail'
       :
       item?.type
       }
     </h4>
     </div>
     <h2 className="title-sm bold">{userAuthor?.displayName}</h2>
     <p className="soft-txt">{item?.text}</p>
   </motion.div>
  )
}

export default NotifBox