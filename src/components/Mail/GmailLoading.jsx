import React from 'react'
import loadingGif from '../Home/Home_assest/gmail-loader.gif'
import { motion } from 'framer-motion'

const GmailLoading = () => {
  return (
     <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}  className='loadingWeather'>
     <img src={loadingGif} alt="loading gmail" />
    </motion.div>
  )
}

export default GmailLoading