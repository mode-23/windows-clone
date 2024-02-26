import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {FaPlay} from 'react-icons/fa'

const WLbox = ({item}) => {
     const [hovered, isHovered] = useState(false)
     function showThumbNail(path){
          if(path?.thumbnail?.[3]?.url){
               return path?.thumbnail?.[3]?.url
          }
          else if(path?.thumbnail?.[2]?.url){
               return path?.thumbnail?.[2]?.url
          }
          else if(path?.thumbnail?.[1]?.url){
               return path?.thumbnail?.[1]?.url
          }else{
                    return path?.thumbnail?.[0]?.url
          }
      }
  return (
    <div className='WLbox'>
     <div className="WLboxdf">
     <div className="df">
     <NavLink to={`/youtube/video/${item?.videoId ? item?.videoId : item?.id}`} className={'thumbNailWL'} onMouseEnter={() => isHovered(true)} onMouseLeave={() => isHovered(false)}>
          <div className="thumbNailWlHover">
               <FaPlay />
          </div>
     {hovered ? 
               <>
               {item?.richThumbnail && (
               <img src={item?.richThumbnail?.[0]?.url} alt="rich thumbnail" className='start' />
               )}
               </>
               :
               <>
                    <img src={showThumbNail(item)} alt={item?.title} className='start' />
               </>
          }
     </NavLink>
     <div className="start wlInfo">
          <NavLink to={`/youtube/video/${item?.videoId ? item?.videoId : item?.id}`}>
          <h5>{item?.title}</h5>
          </NavLink>
          <div className="df wlInfoInside">
          <NavLink to={`/youtube/channel/${item?.channelId}`}>
          <h6>{item?.channelTitle?.slice(0,15)}</h6>
          </NavLink>
          <h6>{item?.viewCount?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} views</h6>
          {item?.publishDate ?
          <h6>{item?.publishDate}</h6>
               :
          <h6>{item?.publishedText}</h6>
          }
          </div>
     </div>
     </div>
     </div>
    </div>
  )
}

export default WLbox