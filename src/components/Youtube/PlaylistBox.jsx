import React from 'react'
import { NavLink } from 'react-router-dom';
import {RiPlayList2Fill} from 'react-icons/ri'

const PlaylistBox = ({item}) => {
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
  return (
    <div className='playlistBox videoBox'>
     <div className="thumbnail">
     <NavLink to={`/youtube/playlist/${item?.playlistId}/0`} className="thumbnail_hover">
          <RiPlayList2Fill />
          <h5>{item?.videoCount} videos</h5>
     </NavLink>
     <img src={showThumbNail()} alt={item?.channelTitle} className='thumbImage' />
     {item?.channelThumbnail && (
          <NavLink to={`/youtube/channel/${item?.channelId}`} className="channelPic">
          <img src={item?.channelThumbnail?.[0]?.url} alt="" />
     </NavLink>
          )}
     </div>
     <div className="videoInfo">
          <h4>{item?.title}</h4>
          <NavLink to={`/youtube/channel/${item?.channelId}`}><h5>{item?.channelTitle}</h5></NavLink>
     </div>
    </div>
  )
}

export default PlaylistBox