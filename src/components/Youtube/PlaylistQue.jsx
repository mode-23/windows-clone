import React, { useState } from 'react'
import {RiSearchLine} from 'react-icons/ri'
import {IoShuffleSharp} from 'react-icons/io5'
import {SlLoop} from 'react-icons/sl'
import {BiChevronDown} from 'react-icons/bi'
import {MdOutlineLibraryAdd , MdLibraryAddCheck} from 'react-icons/md'
import {TfiControlForward, TfiControlBackward} from 'react-icons/tfi'
import QueBox from './QueBox'
import { useNavigate } from 'react-router-dom'
import Tooltip from '../Asset/Tooltip'

const PlaylistQue = ({playlist2 , randomKey , data, list, mapIndex, setVideoState , Videostate , loading , onEndedHandler}) => {
     const [close, isClosed] = useState(false)
     const navigate = useNavigate();
     const skipForwardHandler = () => {
          if(!loading){
               if(Videostate !== 'normal'){
                    onEndedHandler()
               }else{
                    if(+data?.meta?.videoCount > +mapIndex +1){
                         navigate(`/youtube/playlist/${list}/${+mapIndex + 1}`)
                    }
               }
          }
     }
     const skipBackwardHandler = () => {
          if(!loading){
               if(+mapIndex > 0){
                    navigate(`/youtube/playlist/${list}/${+mapIndex - 1}`)
               }else{
                    navigate(`/youtube/playlist/${list}/${+data?.meta?.videoCount - 1}`)
               }
          }
     }
  return (
    <div className={close ? 'playlistQue closed' : 'playlistQue'} >
     <header className="que_header">
     <div className="que_search">
          <RiSearchLine />
          <input type="text" placeholder='Search name' />
     </div>
     <div className="metatitle">
          <h5>{data?.meta?.title}</h5>
          <div className="icon_1" onClick={() => isClosed(!close)}>
               <BiChevronDown className={close ? 'rotated': 'nor'} />
          </div>
     </div>
     <div className='df'>
               <h6>{data?.meta?.channelTitle}</h6>
               <span>-</span>
               <span> {+mapIndex+1} / {data?.meta?.videoCount}</span>
     </div>
     <div className="jcs">
          <div className="df">
          <div className={Videostate === "shuffle" ? "toolholder icon_1 icon_3 active" : "icon_1 icon_3 toolholder"} onClick={
               () => {
                         if(Videostate !== "shuffle"){
                              setVideoState("shuffle")
                         }else{
                              setVideoState("normal")
                         }
               }
               }>
               <IoShuffleSharp />
               {Videostate === "shuffle" && <Tooltip direction={'top'} message={`Next ${+randomKey + 1}`} />}
          </div>
          <div className={Videostate === "loop" ?"icon_1 icon_3 active" : "icon_1 icon_3"} onClick={
               () => {
                    if(Videostate !== "loop"){
                         setVideoState("loop")
                    }else{
                         setVideoState("normal")
                    }
               }
               }>
               <SlLoop />
          </div>
          </div>
          <div className="df">
          {/* {close && ( */}
          <>
          <div className="icon_1 icon_3" onClick={skipBackwardHandler}>
               <TfiControlBackward />
          </div>
          <div className="icon_1 icon_3" onClick={skipForwardHandler}>
               <TfiControlForward />
          </div>
          </> 
          {/* )} */}
          <div className="icon_1 icon_3 toolholder" >
               <MdOutlineLibraryAdd />
               <Tooltip direction={'top'} message={`Save`} />
          </div>
          </div>
     </div>
     </header>
     <div className="list_wrapper">
     <div className="list_content">
          {data?.data?.map((item, index) => {
               if(data?.data?.length === index + 1){
                    return <QueBox key={item?.videoId} item={item} index={index} list={list} mapIndex={mapIndex}  />
               }else {
                    return <QueBox key={item?.videoId} item={item} index={index} list={list} mapIndex={mapIndex}  />
               }
               })}
               {data?.continuation && (
               <>
               {playlist2?.data?.map((item, index) => {
               if(data?.data?.length === index + 1){
                    return <QueBox key={item?.videoId} item={item} index={index} list={list} mapIndex={mapIndex}  />
               }else {
                    return <QueBox key={item?.videoId} item={item} index={index} list={list} mapIndex={mapIndex}  />
               }
               })}
               </>
               )}
     </div>
     </div>
    </div>
  )
}

export default PlaylistQue