import React, { useEffect, useState, useContext, useRef } from 'react'
import { fetchFromAPI } from './YoutubeApi'
import { NavLink } from 'react-router-dom'
import {TbStarFilled , TbStar} from 'react-icons/tb'
import {RiVideoDownloadLine} from 'react-icons/ri'
import { BsClock, BsClockFill, BsCloudDownload, BsThreeDotsVertical } from 'react-icons/bs'
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc , arrayRemove} from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import { userContext } from '../../Context/UserContext'

const VideoInfo = ({data, id , download , isStartedLoading , startLoading, type}) => {
  // console.log(download);
    const {user} = useContext(userContext);
     const [channel, setChannel] = useState({})
     useEffect(() => {
          if(data?.channelId){
          fetchFromAPI(`channel?id=${data?.channelId}`)
          .then((data) => 
          {
            setChannel(data.meta)
          }
          )
        }
        }, [id , data])

     function showThumbNail(){
          if(channel?.thumbnail?.[3]?.url){
               return channel?.thumbnail?.[3]?.url
          }
          else if(channel?.thumbnail?.[2]?.url){
               return channel?.thumbnail?.[2]?.url
          }
          else if(channel?.thumbnail?.[1]?.url){
               return channel?.thumbnail?.[1]?.url
          }else{
                    return channel?.thumbnail?.[0]?.url
          }
      }
     const [ytData, setYtData] = useState([])

      useEffect(() => {
        if(user?.uid){
            const unsub = onSnapshot(doc(db, "youtube", user?.uid), (doc) => {
              setYtData(doc?.data()?.watchLater)
          });
            return () => {
              unsub();
            }
          }
    }, [user])
      const addToLaters = async (item) => {
        const res =  await getDoc(doc(db, "youtube" , user?.uid))
        if(user){
             if(!res.exists()){
                  if(!ytData?.includes(item?.id)){
                       const DocRef = doc(db, "youtube", user?.uid);
                       await setDoc(DocRef, {
                         watchLater: arrayUnion(item?.id),
                         watchLaterArray: arrayUnion(item),
                       });
                  }else{
                       const DocRef = doc(db, "youtube", user?.uid);
                       await setDoc(DocRef, {
                         watchLater: arrayRemove(item?.id),
                         watchLaterArray: arrayRemove(item),
                       });
                  }
             }else{
                  if(!ytData?.includes(item?.id)){
                       const DocRef = doc(db, "youtube", user?.uid);
                       await updateDoc(DocRef, {
                            watchLater: arrayUnion(item?.id),
                            watchLaterArray: arrayUnion(item),
                       });
                  }else{
                       const DocRef = doc(db, "youtube", user?.uid);
                       await updateDoc(DocRef, {
                            watchLater: arrayRemove(item?.id),
                            watchLaterArray: arrayRemove(item),
                       });
                  }
             }
        }
    }
    function formatBytes(bytes, decimals = 2) {
      if (!+bytes) return '0 Bytes'
  
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
      const i = Math.floor(Math.log(bytes) / Math.log(k))
  
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
  let menuRef = useRef();
  let menuRefBtn = useRef();
  useEffect(() => {
    if(menuRef && menuRefBtn){
    let clickOutside = (e) => {
      if(!menuRef?.current?.contains(e.target)){
        isStartedLoading(false)
      }
      if(menuRefBtn?.current?.contains(e.target)){
        isStartedLoading(true)
      }
    }
    document.addEventListener('click', clickOutside)
    return () => {
    document.removeEventListener('click', clickOutside)
    };
  }
  })
  let r = /^(ftp|http|https):\/\/[^ "]+$/;
  let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return (
     <div className="video_info">
     <h3>{data?.title}</h3>
     <div className="views_video">
        <div className="df">
          <h5>{data?.viewCount?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} views</h5>
          <h5>|</h5>
          <h5>{month[new Date(data?.uploadDate).getMonth()]} {new Date(data?.uploadDate).getDate()}, {new Date(data?.uploadDate).getFullYear()}</h5>
        </div>
        <div className="sm_df">
        <div className="df">
        {type && type !== 'playlist' && (
          <div className="icon" onClick={() => isStartedLoading(!startLoading)} ref={menuRefBtn}>
            <div className="icon_insider">
            <BsCloudDownload />
            {startLoading && (
            <div className="dropDown" ref={menuRef}>
            <ul>
              {download && download?.map(item => (
              <li key={item?.url}>
                <a href={item?.url} download={data?.title} target='_blank'>
                  <div className="df">
                  <RiVideoDownloadLine />
                  <span>{item?.qualityLabel} </span>
                  </div>
                  <span className='softer'>{formatBytes((item?.bitrate / 8) * +data?.lengthSeconds)}</span>
                </a>
                </li>
              ))}
            </ul>
          </div>
            )}
            </div>
          </div>
          )}
          <div className="icon" onClick={() => addToLaters(data)}>
            {ytData?.includes(data?.id) ? 
                             <BsClockFill />
                             :
                             <BsClock />
            }
          </div>
          <div className="icon">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="subscribeBtnDownload subscribeBtnDownload2">
          <button className='subscribeBtn'>subcribe</button>
          <button className='favBtn'><TbStar /></button>
          </div>
          </div>
     </div>
     <div className="videoInfoDetails">
     <div className="start">
     <div className="df prfx">
     <NavLink to={`/youtube/channel/${data?.channelId}`} className="channel_header">
       <img src={showThumbNail()} alt={channel?.title} className='video_info_thumb' />
     </NavLink>
       <div className="vd_asc">
          <NavLink to={`/youtube/channel/${data?.channelId}`} className="channel_header">
          <h4>{channel?.title}</h4>
          </NavLink>
          <h5>{channel?.subscriberCount} subcribers</h5>
          <h6 className='description'>
     {r.test(data?.description) == true ?
                      <a href={data?.description} target='_blank'>{data?.description}</a> 
                      :
                      data?.description?.split(' ')?.map((word, index) => {
                        if(r.test(word) == true){
                          return <><a href={word} target='_blank'>{word}</a>{' '}</>
                        }else{
                          return word + ' '
                        }
                      })
     }
          </h6>
       </div>
     </div>
     </div>
     <div className="start">
      <div className="subscribeBtnDownload">
      <button className='subscribeBtn'>subcribe</button>
      <button className='favBtn'><TbStar /></button>
      </div>
     </div>
     </div>
   </div>
  )
}

export default VideoInfo