import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import GmailSharedComponent from './GmailSharedComponent'

const Gmail = () => {
      const [data, setData] = useState([])
      const [loading, isLoading] = useState(true)
      const [selectedItems, setSelectedItems] = useState([]);
      const { user, refresh } = useOutletContext()
      const navigate = useNavigate()
     useEffect(() => {
          if(!user?.uid) {
            navigate('/')
          }
        }, [user])
        useEffect(() => {
            if(user?.email){
            const refrence = collection(db, "message");
            const q = query(refrence, where("to" , "==" , user?.email), orderBy("publishedAt", "desc"), where("type", "==", "compose"), where("deleted", "==", "false"));
            const unsub = onSnapshot(q , (snapShot) => {
              let list = [];
              snapShot.docs.forEach(doc => {
                list.push({...doc.data()})
                setData(list)
            });
            if(!list.length) {
              setData([])
            }
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
        }, [refresh])
  return (
      <GmailSharedComponent loading={loading} data={data} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
  )
}

export default Gmail