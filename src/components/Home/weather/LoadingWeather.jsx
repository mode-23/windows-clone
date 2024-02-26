import React from 'react'
import sunLoading from '../Home_assest/sun.png'
import { motion } from 'framer-motion'
const LoadingWeather = () => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}  className='loadingWeather'>
     <img src={sunLoading} alt="weather sun icon" />
    </motion.div>
  )
}

export default LoadingWeather