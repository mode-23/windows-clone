import React, { useEffect, useState } from 'react'
import { deezerFromApi } from './DeezerAPI'
import { useNavigate } from 'react-router-dom'

const RecentSearchBox = ({item}) => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    isLoading(false)
    deezerFromApi(`search?q=${item?.searchValue}`)
    .then((res) => {
         setData(res)
         isLoading(true)
         console.log(res);
    })
}, [item])

  return (
     <div className="watch_search_tab_box" >
     <div onClick={() => navigate(`/watch/query/${item?.searchValue}`)} className="watch_search_tab_box_pic" style={{backgroundImage: `url(${data?.data?.[0]?.album?.cover_xl})`}} />
     <div className="dxc">
     <h5 onClick={() => navigate(`/watch/query/${item?.searchValue}`)}>{data?.data?.[0]?.title}</h5>
     <p onClick={() => navigate(`/watch/artist/${data?.data?.[0]?.artist?.id}`)}>{data?.data?.[0]?.artist?.name}</p>
     </div>
   </div>
  )
}

export default RecentSearchBox