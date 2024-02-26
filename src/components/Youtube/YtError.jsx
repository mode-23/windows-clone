import React from 'react'
import monkey from '../Home/Home_assest/monkey.png'
const YtError = () => {
  return (
    <div className='ytError'>
     <img src={monkey} alt="monkey error" />
     <h6>This page isn't available. Sorry about that. <br /> Try searching for something else</h6>
     </div>
  )
}

export default YtError