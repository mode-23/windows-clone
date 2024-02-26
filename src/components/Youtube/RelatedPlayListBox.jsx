import React from 'react'
import {RiPlayList2Fill} from 'react-icons/ri'
import {FaPlay} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const RelatedPlayListBox = ({item}) => {
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
  return (
    <div className='relatedVidBox'>
    <div className="rl_vid_thumb">
          <div className="playlist_indicator">
               {item?.videoCount && (
                    <h5>{item?.videoCount}</h5>
               )}
               <RiPlayList2Fill />
          </div>
         <NavLink to={`/youtube/playlist/${item?.playlistId}/0`} className="rl_vid_thumb_hover">
         <FaPlay className='smaller' />
         <h5>Play all</h5>
         </NavLink>
         <img src={showThumbNail()} alt={item?.title} />
    </div>
    <div className="rl_vid_info">
         <NavLink to={`/youtube/playlist/${item?.playlistId}/0`} >
         <h5 title={item?.title}>{item?.title}</h5>
         </NavLink>
         <NavLink to={`/youtube/channel/${item?.channelId}`}>
         <h4>{item?.channelTitle}</h4>
         </NavLink>
    </div>
   </div>
  )
}

export default RelatedPlayListBox