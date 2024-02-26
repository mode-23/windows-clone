import React from 'react'
import { NavLink } from 'react-router-dom';

const ChannelBox = ({item}) => {
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
    <div className='channelBox'>
     <NavLink to={`/youtube/channel/${item?.channelId}`} className={"channel_thumb_holder"}>
     <img src={showThumbNail()} alt={item?.channelTitle} className='channel_thumb' />
     </NavLink>
     <div className="df">
     <h5>{item?.channelTitle}</h5>
     <h5 className='dot'>•</h5>
     <h5>{item?.subscriberCount}</h5>
     </div>
     <p>{item?.description}</p>
    </div>
  )
}

export default ChannelBox