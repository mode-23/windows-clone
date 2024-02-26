import React from 'react'
import {AiOutlineNotification} from 'react-icons/ai'
import { NavLink } from 'react-router-dom';

const CommentBox = ({item}) => {
     function showThumbNail(){
          if(item?.authorProfileImageUrl?.[3]?.url){
               return item?.authorProfileImageUrl?.[3]?.url
          }
          else if(item?.authorProfileImageUrl?.[2]?.url){
               return item?.authorProfileImageUrl?.[2]?.url
          }
          else if(item?.authorProfileImageUrl?.[1]?.url){
               return item?.authorProfileImageUrl?.[1]?.url
          }else{
                    return item?.authorProfileImageUrl?.[0]?.url
          }
      }

  let r = /^(ftp|http|https):\/\/[^ "]+$/;
  return (
    <div className='commentBox'>
     <div className="df">
          <NavLink to={`/youtube/channel/${item?.authorChannelId}`} className="start">
          <img src={showThumbNail()} alt={item?.authorDisplayName} />
          </NavLink>
          <div className="start dw">
               <div className="df">
                    <NavLink to={`/youtube/channel/${item?.authorChannelId}`}>
                         <h5 title={item?.authorIsChannelOwner ? 'Channel author' : item?.authorDisplayName} className={item?.authorIsChannelOwner ? 'author' : 'n_u'}>{item?.authorDisplayName} {item?.authorIsChannelOwner && <AiOutlineNotification />}</h5>
                    </NavLink>
                    <h6>{item?.publishedTimeText}</h6>
               </div>
               <p>
               {r.test(item?.textDisplay) == true ?
                      <a href={item?.textDisplay} target='_blank'>{item?.textDisplay}</a> 
                      :
                      item?.textDisplay?.split(' ')?.map((word, index) => {
                        if(r.test(word) == true){
                          return <><a href={word} target='_blank'>{word}</a>{' '}</>
                        }else{
                          return word + ' '
                        }
                      })
                        }
                    </p>
          </div>
     </div>
    </div>
  )
}

export default CommentBox