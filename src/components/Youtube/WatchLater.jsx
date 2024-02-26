import React, { useState, useContext, useEffect } from 'react'
import YtTemplateWL from './YtTemplateWL'
import { db } from '../../firebase/Firebase'
import { userContext } from '../../Context/UserContext'
import { doc, onSnapshot } from 'firebase/firestore'
import YtLoading from './YtLoading'

const WatchLater = () => {
  const [data, setData] = useState([])
  const [loading, isLoading] = useState(false)
  const {user, playlist, setPlaylist} = useContext(userContext);
  useEffect(() => {
    isLoading(true)
    if(user?.uid){
    const unsub = onSnapshot(doc(db, "youtube", user?.uid), (doc) => {
         setData(doc?.data()?.watchLaterArray)
        isLoading(false)
  });
    return () => {
      unsub();
    }
  }
  }, [user])
  const addToLocalPlaylist = () => {
    setPlaylist([])
  }
if(loading) return <YtLoading />
  return (
    <YtTemplateWL data={data} title={'Watch Later'} onClick={addToLocalPlaylist} />
  )
}

export default WatchLater