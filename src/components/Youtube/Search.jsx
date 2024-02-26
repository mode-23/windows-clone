import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from './YoutubeApi'
import VideoBox from './VideoBox'
import ChannelBox from './ChannelBox'
import YtLoading from './YtLoading'
import PlaylistBox from './PlaylistBox'
import SearchFilter from './SearchFilter'

const Search = () => {
     const {searchTerm} = useParams()
     const [vidSearchTerm, setVidSearchTerm] = useState([])
     const [loading, isLoading] = useState(false)
     const [filter] = useState([
      {
           name: "upload date",
           options: 'upload_date',
           array: 
           [
                {
                     key: "hour",
                     value: "Last hour"
                },
                {
                     key: "today",
                     value: "Today"
                },
                {
                     key: "week",
                     value: "This week"
                },
                {
                     key: "month",
                     value: "This month"
                },
                {
                     key: "year",
                     value: "This year"
                },
           ]
      },
      {
           name: "type",
           options: 'type',
           array: 
           [
                {
                     key: "video",
                     value: "Video"
                },
                {
                     key: "channel",
                     value: "Channel"
                },
                {
                     key: "playlist",
                     value: "Playlist"
                },
                {
                     key: "movie",
                     value: "Movie"
                },
                {
                     key: "show",
                     value: "Show"
                },
           ]
      },
      {
           name: "duaration",
           options: 'duaration',
           array: 
           [
                {
                     key: "short",
                     value: "Short"
                },
                {
                     key: "medium",
                     value: "Medium"
                },
                {
                     key: "long",
                     value: "Long"
                },
           ]
      },
      {
           name: "features",
           options: 'features',
           array: 
           [
                {
                     key: "HD",
                     value: "HD"
                },
                {
                     key: "subtitles",
                     value: "subtitles"
                },
                {
                     key: "CCommons",
                     value: "CCommons"
                },
                {
                     key: "3D",
                     value: "3D"
                },
                {
                     key: "Live",
                     value: "Live"
                },
                {
                     key: "Purchased",
                     value: "Purchased"
                },
                {
                     key: "4K",
                     value: "4K"
                },
                {
                     key: "360",
                     value: "360"
                },
                {
                     key: "Location",
                     value: "Location"
                },
                {
                     key: "HDR",
                     value: "HDR"
                },
                {
                     key: "VR180",
                     value: "VR180"
                },
           ]
      },
      {
           name: "sort by",
           options: 'sort_by',
           array: 
           [
                {
                     key: "relevance ",
                     value: "Relevance "
                },
                {
                     key: "rating",
                     value: "Rating"
                },
                {
                     key: "date",
                     value: "Date"
                },
                {
                     key: "views",
                     value: "Views"
                },

           ]
      },
 ])
     const [option, setOption] = useState({})
     const [term, setTerm] = useState('')
     function handleFetch(){
      if(option.upload_date){
        return `search?query=${searchTerm}&upload_date=${option.upload_date}`
      }else if(option.sort_by){
        return `search?query=${searchTerm}&sort_by=${option.sort_by}`
      }else if(option.type){
        return `search?query=${searchTerm}&type=${option.type}`
      }else if(option.features){
        return `search?query=${searchTerm}&features=${option.features}`
      }else if(option.duaration){
        return `search?query=${searchTerm}&duaration=${option.duaration}`
      }else{
        return`search?query=${searchTerm}`
      }
     }
     useEffect(() => {
          isLoading(true)
          fetchFromAPI(handleFetch())
          .then((data) => {
            setVidSearchTerm(data)
            isLoading(false)
          }
            );
        }, [searchTerm , option])

  return (
    <>
      {loading ? 
      <YtLoading />
      :
      <>
      <SearchFilter filter={filter} setOption={setOption} option={option} setTerm={setTerm} term={term} />
      <div className='ytFeed'>
     {vidSearchTerm?.data?.map((item, index) => (
          <React.Fragment key={index}>
          {item?.type == "video" && (
          <VideoBox item={item} />
          )}
         {item?.type == "playlist" && (
          <PlaylistBox item={item} />
          )}
         {item?.type == "channel" && (
          <ChannelBox item={item} />
          )}
          </React.Fragment>
     ))}
     </div>
     </>
      }
    </>
  )
}

export default Search