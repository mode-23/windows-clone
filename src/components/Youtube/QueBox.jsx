import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import {BsFillPlayFill} from 'react-icons/bs'
const QueBox = ({item, index, list, mapIndex}) => {
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
    <NavLink to={`/youtube/playlist/${list}/${+item?.index - 1}`} className='queBox' end>
      <div className="listIndex">
        <h5>{+mapIndex == +index ? <BsFillPlayFill /> : +item?.index  }</h5>
      </div>
      <div className="start thumbQue">
        {item?.lengthText && (
      <span>{item?.lengthText}</span>
        )}
      <img src={showThumbNail()} alt={item?.title} />
      </div>
      <div className="start queInfo">
      <h5 title={item?.title}>{item?.title}</h5>
      <h6>{item?.channelTitle}</h6>
      </div>
    </NavLink>
  )
}

export default QueBox