import React, { useEffect, useState } from 'react'
import './notifications.css'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/Firebase'
import GmailNotifBox from './GmailNotifBox'
import SkeletonLoadingNotifications from './SkeletonLoadingNotifications'
import { AnimatePresence } from 'framer-motion'

const GmailNotifications = ({user, data, setData}) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
    if(user?.email){
    const refrence = collection(db, "message");
    const q = query(refrence, where("to" , "==" , user?.email), orderBy("publishedAt", "desc"));
    const unsub = onSnapshot(q , (snapShot) => {
      let list = [];
      snapShot.docs.forEach(doc => {
        list.push({...doc.data()})
        setData(list)
    });
    setLoading(true)
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
  return (
    <div className='gmailNotifications'>
      {!loading ? 
      <>
      <SkeletonLoadingNotifications number={4} />
      </>
      :
      <AnimatePresence mode='wait'>
      {data?.map((item, index) => {
        if(!item?.viewedBy?.includes(user?.uid)){
          if(item?.type === "compose" ){
            return(
              <GmailNotifBox key={index} item={item} user={user} />
            )
          }
        }
        })}
        </AnimatePresence>
      }
     </div>
  )
}

export default GmailNotifications