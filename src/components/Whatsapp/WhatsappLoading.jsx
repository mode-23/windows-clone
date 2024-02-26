import React from 'react'
import wtImg from '../Home/Home_assest/whatsapp.png'
const WhatsappLoading = () => {
  return (
    <div className='loading_whatsapp'>
     <img src={wtImg} alt="whats app icon" />
     <div className="loader-line"></div>
     <h4>Sit tight! 😎</h4>
    </div>
  )
}

export default WhatsappLoading