import React from 'react'
import WLbox from './WLbox'
import { FaPlay } from 'react-icons/fa'

const YtTemplateWL = ({data, title, onClick}) => {
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
    <div className='ytTemplateWL'>
     <div className="ytTemplateWLLeft">
          <div className="ytTemplateMainThumb">
               <div className="ytTemplateMainThumbHover" onClick={onClick}>
                    <div className="df">
                         <FaPlay />
                         <h5>Play all</h5>
                    </div>
               </div>
               <img src={showThumbNail(data?.[0])} alt={data?.[0]?.title} />
          </div>
          <h3>{title}</h3>
     </div>
     <div className="ytTemplateWLData">
        {data?.map( item => (
          <WLbox key={item?.videoId} item={item} />
        ))}
     </div>
    </div>
  )
}

export default YtTemplateWL