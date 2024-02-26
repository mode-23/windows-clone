import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { db } from '../../firebase/Firebase'
import GmailSharedComponent from './GmailSharedComponent'

const Bin = () => {
  const [data, setData] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, isLoading] = useState(true)
  const { user } = useOutletContext()
  const navigate = useNavigate()
 useEffect(() => {
      if(!user?.uid) {
        navigate('/')
      }
    }, [user])
    useEffect(() => {
        if(user?.email){
        const refrence = collection(db, "message");
        const q = query(refrence, where("to" , "==" , user?.email), orderBy("publishedAt", "desc"), where("type", "==", "compose"), where("deleted", "==", "true"));
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
    }, [])
  return (
    <GmailSharedComponent loading={loading} data={data} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
  )
}

export default Bin