import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchDownloadFromAPI, fetchFromAPI } from './YoutubeApi'
import YtError from './YtError'
import YtLoading from './YtLoading'
import ReactPlayer from 'react-player'
import Related from './Related'
import VideoInfo from './VideoInfo'
import Comments from './Comments'
import PlaylistQue from './PlaylistQue'

const Playlist = () => {
     const {list, index} = useParams()
     const navigate = useNavigate()
     const mapIndex = useParams().index
     const [playlist, setPlaylist] = useState([])
     const [loading, isLoading] = useState(false)
     const [Videostate, setVideoState] = useState('normal')
     useEffect(() => {
          isLoading(true)
          fetchFromAPI(`playlist?id=${list}`)
          .then((data) => 
          {
            setPlaylist(data)
            isLoading(false)
          }
          )

        }, [list])

     const [playlist2, setPlaylist2] = useState([])
        useEffect(() => {
          if(playlist?.continuation){
            fetchFromAPI(`playlist?id=${list}&token=${playlist?.continuation}`)
            .then((data) => 
            {
              setPlaylist2(data)
            }
            )
            }else{
              setPlaylist2([])
            }
        }, [list, playlist])

        const [loading3, isLoading3] = useState(false)
        const [video, setVideo] = useState({})
        useEffect(() => {
          if(+index < playlist?.data?.length){
            isLoading3(true)
            fetchFromAPI(`video?id=${playlist?.data?.[index]?.videoId}`)
            .then((data) => 
            {
              setVideo(data)
              isLoading3(false)
            }
            )
          }else{
            isLoading3(true)
            fetchFromAPI(`video?id=${playlist2?.data?.[Math.abs(+playlist?.data?.length - +index)]?.videoId}`)
            .then((data) => 
            {
              setVideo(data)
              isLoading3(false)
            }
            )
          }
        }, [list , playlist , index, playlist2])

        const [loading2, isLoading2] = useState(false)
        const [relatedData, setRelatedData] = useState([])
        useEffect(() => {
          if(playlist){
          if(+index < playlist?.data?.length){
             isLoading2(true)
             fetchFromAPI(`related?id=${playlist?.data?.[index]?.videoId}`)
             .then((data) => 
             {
               setRelatedData(data.data)
               isLoading2(false)
             }
             )
            }else{
              isLoading2(true)
              fetchFromAPI(`related?id=${playlist2?.data?.[Math.abs(+playlist?.data?.length - +index)]?.videoId}`)
              .then((data) => 
              {
                setRelatedData(data.data)
                isLoading2(false)
              }
              )
            }
          }
           }, [list , index , playlist, playlist2])
           const [download, setDownload] = useState([])
           const [startLoading, isStartedLoading] = useState(false)
           useEffect(() => {
            if(startLoading){
            if(playlist){
              if(+index < playlist?.data?.length){
                fetchDownloadFromAPI(playlist?.data?.[index]?.videoId)
                 .then((data) => 
                 {
                  console.log(data);
                  setDownload(data)
                 }
                 )
                }else{
                  fetchDownloadFromAPI(playlist2?.data?.[Math.abs(+playlist?.data?.length - +index)]?.videoId)
                  .then((data) => 
                  {
                  console.log(data);
                    setDownload(data)
                  }
                  )
                }
              }
            }
           }, [list , index , playlist, playlist2 , startLoading])
        function randomInt(min, max, exclude) {
          const nums = [];
          for (let i = min; i <= max; i++) {
             if (!exclude.includes(i)) nums.push(i);
          }
          if (nums.length === 0) return false;
       
         const randomIndex = Math.floor(Math.random() * nums.length);
         return nums[randomIndex];
       }

       let randomKey = +randomInt(0,playlist2?.data?.length ? playlist?.data?.length - 1 + playlist2?.data?.length : playlist?.data?.length - 1  , [])
        const onEndedHandler = () => {
          if(Videostate === "normal"){
            if(+playlist?.meta?.videoCount > +mapIndex +1){
              navigate(`/youtube/playlist/${list}/${+mapIndex +1}`)
            }else{
              // console.log('out');
            }
          }else if(Videostate === "loop"){
            if(+playlist?.meta?.videoCount > +mapIndex +1){
              navigate(`/youtube/playlist/${list}/${+mapIndex +1}`)
            }else if(+playlist?.meta?.videoCount === +mapIndex +1){
              navigate(`/youtube/playlist/${list}/${0}`)
            }
          }else if(Videostate === "shuffle"){
             if(+playlist?.meta?.videoCount >= +mapIndex +1){
                navigate(`/youtube/playlist/${list}/${randomKey}`)
            }else{
              // console.log('out');
            }
          }
        }
        if(playlist?.msg === "The playlist does not exist.") return <YtError />
  return (
    <>
    {(loading || loading3) ? 
    <YtLoading />
    :
    <>
     {video?.error ? 
      <YtError />
      :
      <div className='video_details'>
      <div className='video_details_left'>
        <div className="video_details_left_info">
        <div className="video_holder">
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${+index < playlist?.data?.length ? playlist?.data?.[index]?.videoId : playlist2?.data?.[Math.abs(+playlist?.data?.length - +index)]?.videoId}`}
            controls
            width={"100%"}
            height={"100%"}
            playing={true}
            muted={false}
            fallback={<YtLoading />}
            pip
            onEnded={onEndedHandler}
            />
        </div>
      <VideoInfo data={video} id={playlist?.data?.[index]?.videoId} download={download} type={'playlist'} isStartedLoading={isStartedLoading} startLoading={startLoading}  />
        </div>
      <Comments  id={+index < playlist?.data?.length ? playlist?.data?.[index]?.videoId : playlist2?.data?.[Math.abs(+playlist?.data?.length - +index)]?.videoId } />
      </div>
      <div className="video_details_playlist">
      <PlaylistQue playlist2={playlist2} randomKey={randomKey} onEndedHandler={onEndedHandler} data={playlist} mapIndex={mapIndex} list={list} Videostate={Videostate} setVideoState={setVideoState} loading={loading} />
      <Related loading2={loading2} relatedData={relatedData}  />
      </div>
    </div>
     }
    </>
    }
    </>
  )
}

export default Playlist