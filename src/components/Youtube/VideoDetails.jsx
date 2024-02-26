import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { fetchDownloadFromAPI, fetchFromAPI } from './YoutubeApi'
import Related from './Related'
import VideoInfo from './VideoInfo'
import YtLoading from './YtLoading'
import Comments from './Comments'
import YtError from './YtError'

const VideoDetails = () => {
     const {id} = useParams()
     const [loading, isLoading] = useState(false)
     const [data, setData] = useState({})
     const [allowDownload, isAllowDownload] = useState(false)

     useEffect(() => {
      isLoading(true)
      fetchFromAPI(`video?id=${id}`)
      .then((data) => 
      {
        setData(data)
        isLoading(false)
      }
      )
    }, [id])
    const [download, setDownload] = useState([])
    const [startLoading, isStartedLoading] = useState(false)
    useEffect(() => {
    if(startLoading){
    fetchDownloadFromAPI(id)
    .then((data) => 
    {
      setDownload(data?.formats)
    }
    )
    }
    }, [id , startLoading])
    const [loading2, isLoading2] = useState(false)
    const [relatedData, setRelatedData] = useState([])
    useEffect(() => {
         isLoading2(true)
         fetchFromAPI(`related?id=${id}`)
         .then((data) => 
         {
           setRelatedData(data.data)
           isLoading2(false)
         }
         )
       }, [id])

    if(data?.error) return <YtError />
  return (
    <>
    {loading? 
    <YtLoading />
    :
    <div className='video_details'>
      <div className='video_details_left'>
        <div className="video_details_left_info">
        <div className="video_holder">
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            width={"100%"}
            height={"100%"}
            playing={true}
            muted={false}
            fallback={<YtLoading />}
            pip
            />
        </div>
      <VideoInfo type={'video'} data={data} id={id} download={download} isStartedLoading={isStartedLoading} startLoading={startLoading} />
        </div>
      <Comments id={id} />
      </div>
      <div className="video_details_info">
      <Related loading2={loading2} relatedData={relatedData}  />
      </div>
    </div>
    }
    </>
  )
}

export default VideoDetails