import React, { useState, useContext, useEffect, useRef } from 'react'
import {FaPlay} from 'react-icons/fa'
import {BsBroadcast} from 'react-icons/bs'
import {MdOutlineWatchLater} from 'react-icons/md'
import {IoCheckmarkOutline} from 'react-icons/io5'
import { NavLink } from 'react-router-dom';
import { db } from '../../firebase/Firebase'
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc , arrayRemove} from 'firebase/firestore'
import { userContext } from '../../Context/UserContext'
const VideoBox = ({item}) => {
     const [hovered, isHovered] = useState(false)
     const [visible, isVisible] = useState(false)
     const [data, setData] = useState([])
     const {user} = useContext(userContext);
     function nFormatter(num) {
          if (num >= 1000000000) {
             return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
          }
          if (num >= 1000000) {
             return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
          }
          if (num >= 1000) {
             return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
          }
          if(num < 1000){
            return num
       }
          return num;
      }
      function showThumbNail(){
          if(item?.thumbnail?.[3]?.url){
               return item?.thumbnail?.[3]?.url
          }
          else if(item?.thumbnail?.[2]?.url){
               return item?.thumbnail?.[2]?.url
          }
          else if(item?.thumbnail?.[1]?.url){
               return item?.thumbnail?.[1]?.url
          }else{
                    return item?.thumbnail?.[0]?.url
          }
      }
      useEffect(() => {
          if(user?.uid){
          const unsub = onSnapshot(doc(db, "youtube", user?.uid), (doc) => {
               setData(doc?.data()?.watchLater)
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
                    if(!data?.includes(item?.videoId)){
                         const DocRef = doc(db, "youtube", user?.uid);
                         await setDoc(DocRef, {
                           watchLater: arrayUnion(item?.videoId),
                           watchLaterArray: arrayUnion(item),
                         });
                    }else{
                         const DocRef = doc(db, "youtube", user?.uid);
                         await setDoc(DocRef, {
                           watchLater: arrayRemove(item?.videoId),
                           watchLaterArray: arrayRemove(item),
                         });
                    }

               }else{
                    if(!data?.includes(item?.videoId)){
                         const DocRef = doc(db, "youtube", user?.uid);
                         await updateDoc(DocRef, {
                              watchLater: arrayUnion(item?.videoId),
                              watchLaterArray: arrayUnion(item),
                         });
                    }else{
                         const DocRef = doc(db, "youtube", user?.uid);
                         await updateDoc(DocRef, {
                              watchLater: arrayRemove(item?.videoId),
                              watchLaterArray: arrayRemove(item),
                         });
                    }
               }
          }
      }
      const ref = useRef()
      let callback = (entries, observer) => {
          entries.forEach((entry) => {
               if(entry.isIntersecting){
                    isVisible(true)
               }else{
                    isVisible(false)
               }
          });
        };
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: 1.0,
        }
      let observer = new IntersectionObserver(callback);
      useEffect(() => {
          if(ref.current){
               observer.observe(ref.current)
          }
          return () => {
               observer.disconnect()
          };
      }, [])

        
  return (
     <>
     {visible ?
         <div className='videoBox' ref={ref}>
         <div className="thumbnail" onMouseEnter={() => isHovered(true)} onMouseLeave={() => isHovered(false)}>
              <span>{item?.lengthText} </span>
              <div className="videoBox_addons">
                   <div className="addon_vd">
                   <div className="addon_vd_text">
                        {data?.includes(item?.videoId) ? 'added': 'watch later'}
                        </div>
                        <div className="addon_vd_icon" onClick={() => addToLaters(item)}>
                             {data?.includes(item?.videoId) ?
                             <IoCheckmarkOutline />
                             :
                             <MdOutlineWatchLater />
                             }
                        </div>
                   </div>
                   {/* <div className="addon_vd">
                   <div className="addon_vd_text">
                             add to que
                        </div>
                        <div className="addon_vd_icon">
                             <MdOutlinePlaylistAdd />
                        </div>
                   </div> */}
              </div>
              <NavLink to={`/youtube/video/${item?.videoId}`} className="thumbnail_hover">
                   <FaPlay />
              </NavLink>
              {hovered ? 
                   <>
                   {item?.richThumbnail && (
                   <img src={item?.richThumbnail?.[0]?.url} alt="rich thumbnail" className='thumbImage' />
                   )}
                   </>
                   :
                   <>
                        <img src={showThumbNail()} alt={item?.title} className='thumbImage' />
                   </>
              }
              {item?.channelThumbnail && (
              <NavLink to={`/youtube/channel/${item?.channelId}`} className="channelPic">
              <img src={item?.channelThumbnail?.[0]?.url} alt="" />
         </NavLink>
              )}
         </div>
         <div className="videoInfo">
              <h4>{item?.title}</h4>
              <NavLink to={`/youtube/channel/${item?.channelId}`}><h5>{item?.channelTitle}</h5></NavLink>
              <div className="df">
                   {item?.viewCount ?
                        <>
                        <p>{nFormatter(item?.viewCount)} views </p>
                        <p className='dot'>•</p>
                        <p>{item?.publishedText}</p>
                        </>
                        :
                        <small className='live'><BsBroadcast />live</small>
                   }
              </div>
         </div>
        </div>
        :
        <div className="videoBoxSkeleton" ref={ref} >
          <div className="videoBoxSkeletonThumb"/>
          <div className="grSk">
               <div className="circle" />
               <div className="kls">
               <div className="text"></div>
               <div className="text"></div>
               <div className="text text-short"></div>
               </div>
          </div>
        </div>
     }
    </>
  )
}

export default VideoBox