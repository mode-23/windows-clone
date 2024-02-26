import React from 'react'
import { BsBroadcast } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const RelatedVidBox = ({item}) => {
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
          <span>{item?.lengthText}</span>
          <NavLink to={`/youtube/video/${item?.videoId}`} className="rl_vid_thumb_hover">
          <FaPlay />
          </NavLink>
          <img src={showThumbNail()} alt={item?.title} />
     </div>
     <div className="rl_vid_info">
          <NavLink to={`/youtube/video/${item?.videoId}`} >
          <h5 title={item?.title}>{item?.title}</h5>
          </NavLink>
          <NavLink to={`/youtube/channel/${item?.channelId}`}>
          <h4>{item?.channelTitle}</h4>
          </NavLink>
          <div className="df">
               {item?.viewCount ?
                    <p>{nFormatter(item?.viewCount)} views </p>
                    :
                    <small className='live'><BsBroadcast />live</small>
               }
          </div>
     </div>
    </div>
  )
}

export default RelatedVidBox