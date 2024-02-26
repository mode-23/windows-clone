import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from './YoutubeApi'
import VideoBox from './VideoBox'
import YtLoading from './YtLoading'

const Trending = () => {
     const {trend} = useParams()
     const [videos, setVideos] = useState([])
     const [loading, isLoading] = useState(false)
     useEffect(() => {
          isLoading(true)
          fetchFromAPI(`trending?type=${trend}`)
          .then((data) => 
          {
            setVideos(data.data)
            isLoading(false)
          }
          )
        }, [trend])
        
  return (
     <>
     {loading ? 
     <YtLoading />
     :
     <div className='ytFeed'>
    {videos?.map((item ,index) => (
         <VideoBox key={index} item={item} />
    ))}
    </div>
     }
   </>
  )
}

export default Trending