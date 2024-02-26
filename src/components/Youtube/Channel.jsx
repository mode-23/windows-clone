import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from './YoutubeApi'
import VideoBox from './VideoBox'
import YtLoading from './YtLoading'
import robotPic from '../Home/Home_assest/robot.png'
import YtError from './YtError'

const Channel = () => {
     const [loading, isLoading] = useState(false)
     const [loadingData, isLoadingData] = useState(false)
     const [channel, SetChannel] = useState([])
     const [channelData, SetChannelData] = useState([])
     const [sortByArr] = useState([
          {
               name: "newest",
          },
          {
               name: "oldest",
          },
          {
               name: "popular",
          },
     ])
     const [sortBy, setSortBy] = useState(sortByArr[0].name)
     const {channelId} = useParams()
     useEffect(() => {
          isLoading(true)
          fetchFromAPI(`channel?id=${channelId}`)
          .then((data) => {
               SetChannel(data)
               console.log(data)
               isLoading(false)
          }
            );
        }, [channelId])
        useEffect(() => {
          isLoadingData(true)
          fetchFromAPI(`channel?id=${channelId}&sort_by=${sortBy}`)
          .then((data) => {
               SetChannelData(data.data)
               isLoadingData(false)
          }
            );
        }, [channelId , sortBy])
        function showThumbNail(){
          if(channel?.meta?.thumbnail?.[3]?.url){
               return channel?.meta?.thumbnail?.[3]?.url
          }
          else if(channel?.meta?.thumbnail?.[2]?.url){
               return channel?.meta?.thumbnail?.[2]?.url
          }
          else if(channel?.meta?.thumbnail?.[1]?.url){
               return channel?.meta?.thumbnail?.[1]?.url
          }else{
                    return channel?.meta?.thumbnail?.[0]?.url
          }
      }
      if(channel?.meta?.title === null) return <YtError />
  return (
    <>
     {loading ?
     <YtLoading />
     :
     <>
     <div className="channel_banner" style={{backgroundImage: `url(${channel?.meta?.image?.banner?.[5]?.url})`}}></div>
     <header className="channel_tab">
          <div className="df">
               <div className="lf">
               <img src={showThumbNail()} alt={channel?.meta?.title} className='channel_tab_thumb'/>
               </div>
          <div className="lf drc">
               <h4>{channel?.meta?.title}</h4>
               <p>{channel?.meta?.subscriberCount} Subscribers</p>
               <span>{channel?.meta?.description}</span>
          </div>
          </div>
     </header>
     <div className="channel_tab channel_tab_nav">
          {sortByArr.map((item, index) => (
          <button onClick={() => setSortBy(item.name)} className={item.name == sortBy ? 'channel_tab_nav_btn active' : 'channel_tab_nav_btn'} key={index}>{item.name}</button>
          ))}
     </div>
          {loadingData ? 
          <YtLoading />
          :
          <div className="ytChannelFeed">
          {channelData?.length ?
          <div className="ytFeed">
          {channelData?.map((item ,index) => (
               <VideoBox key={index} item={item}/>
          ))}
          </div>
          :
          <div className='no_channel_data'>
          <img src={robotPic} alt="error pic (robot)" className='errorRobotPic' />
          <h5>This channel doesn't have any uploads.</h5>
          </div>
          }

          </div>
          }
     </>
     }
     </>
  )
}

export default Channel