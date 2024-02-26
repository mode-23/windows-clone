import React, { useState } from 'react'
import Weather from './weather/Weather'
import recycle from './Home_assest/recycle.png'
import ContextMenu from './ContextMenu'
const HomeBg = ({openWeather , isOpenWeather}) => {
const [open, isOpen] = useState(false)
const [stats, setStats] = useState({
  top: '',
  left: '',
})
const handleOption = (e) => {
  e.preventDefault();
  isOpen(true)
  setStats({top: e.clientY, left: e.clientX})
}

  return (
    <div className='home_bg' onContextMenu={handleOption}>
      {open && (
        <ContextMenu stats={stats} isOpen={isOpen} />
      )}
      <div className="desktip_icon">
      <img src={recycle} alt="recycle" />
      </div>
      {openWeather && (
      <Weather isOpenWeather={isOpenWeather}/>
      )}
    </div>
  )
}

export default HomeBg