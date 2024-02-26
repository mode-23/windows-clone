import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deezerFromApi } from './DeezerAPI';

const Artist = () => {
     const {id} = useParams()
     const [data, setData] = useState({});
     const [loading, isLoading] = useState(true);
     useEffect(() => {
      isLoading(false)
      deezerFromApi(`artist/${id}`)
      .then((res) => {
           setData(res)
           isLoading(true)
           console.log(res);
      })
  }, [id])

  // useEffect(() => {
  //   fetch("https://api.deezer.com/artist/13/top?limit=50")
  // }, [])
  
  return (
    <div className='artist_profile'>
      <div className="artist_profile_banner" style={{backgroundImage: `url(${data?.picture_xl})`}}>

      </div>
    </div>
  )
}

export default Artist