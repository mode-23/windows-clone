import React from 'react'
import nodata from '../Home/Home_assest/nogmailsvg.svg'
import { useOutletContext } from 'react-router-dom'

const NoGmails = () => {
  const { isCoposed } = useOutletContext()

  return (
    <div className='no_gmail_data'>
     <img src={nodata} alt="gmail empty" />
     <h3 className='title'>Your inbox is empty.<span onClick={() => isCoposed(true)}> Send your first message!</span></h3>
     </div>
  )
}

export default NoGmails