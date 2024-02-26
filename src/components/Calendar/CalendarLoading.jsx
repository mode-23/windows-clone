import React from 'react'
import loader from '../Home/Home_assest/google-loader.gif'

const CalendarLoading = () => {
  return (
     <div className='loading_calendar'>
     <img src={loader} alt="calendar loader" />
   </div>
  )
}

export default CalendarLoading