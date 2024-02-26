import React from 'react'
import {FaPlay} from 'react-icons/fa'
import { useOutletContext } from 'react-router-dom';
const SongBox = ({item}) => {
  const {setPreview} = useOutletContext()
  const handlePreview = () => {
    setPreview(item)
  }
  return (
    <div className='songBox' style={{backgroundImage: `url(${item?.album?.cover_xl})`}} onClick={handlePreview}>
      <div className="songBoxinfo">
        <h3>{item?.title}</h3>
        <p>{item?.artist?.name}</p>
      </div>
      <div className="playSong"><FaPlay /></div>
    </div>
  )
}

export default SongBox