import React from 'react'
import './Home.css'
import './responsiveHome.css'
import HomeBg from './HomeBg'
const Home = ({openWeather , isOpenWeather}) => {

  return (
    <div className='home'>
     <HomeBg  openWeather={openWeather} isOpenWeather={isOpenWeather} />
    </div>
  )
}

export default Home