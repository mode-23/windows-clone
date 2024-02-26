import React from 'react'
import { useOutletContext } from 'react-router-dom'
import VideoBox from './VideoBox'
import YtLoading from './YtLoading'

const Feed = () => {
  const { videos , loading } = useOutletContext()

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

export default Feed