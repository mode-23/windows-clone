import React, { useContext, useState, useEffect } from 'react'
import WatchHome from './WatchHome'
import MainSearch from './MainSearch'
import {userContext} from '../../Context/UserContext'
import { collection , onSnapshot , where , query } from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import DeezerLoading from './DeezerLoading'
const WatchBody = () => {
  const {user} = useContext(userContext)
  const [data, setData] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  useEffect(() => {
    if(user?.uid){
    const refrence = collection(db, "songSearched");
    const q = query(refrence, where("userId" , "==" , user?.uid));
    const unsub = onSnapshot(q , (snapShot) => {
      let list = [];
      snapShot.docs.forEach(doc => {
        list.push({...doc.data()})
        setData(list)
    });
    if(!list.length)  {
      setData([])
    }
    setLoadingData(false)
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
    <section className='watch_body'>
      {loadingData ?
      <DeezerLoading />
      :
      <>
      {data.length ?
        <WatchHome />
        :
        <MainSearch />
      }
      </>
      }
    </section>
  )
}

export default WatchBody