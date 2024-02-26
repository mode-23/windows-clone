import React from 'react'
import './notifSkeleton.css'
import { motion } from 'framer-motion'

const SkeletonLoadingNotifications = ({number}) => {
  return (
     <motion.div  initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className='direction'>
     {Array((number)).fill(
    <div className='gmailNotifications_box'>
    <div className="skeleton_icon_header">
         <div className="skeleton_icon"></div>
         <div className="skeleton_name"></div>
    </div>
    <div className="skeleton_name"></div>
    <div className="skeleton_name_2"></div>
    <div className="skeleton_name_2"></div>
    <div className="skeleton_name_2_half"></div>
   </div>
     )}

    </motion.div>
  )
}

export default SkeletonLoadingNotifications