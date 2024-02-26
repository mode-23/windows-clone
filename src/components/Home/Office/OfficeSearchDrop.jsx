import React from 'react'
import file from '../Home_assest/file.png'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
const OfficeSearchDrop = ({documents , searchValue}) => {
     const result = documents?.filter(item => item?.file_name?.toLowerCase()?.includes(searchValue))
     const navigate = useNavigate()
  return (
    <motion.div className='officeSearchDrop' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
     {result?.length  == 0 ? 
     <small className='title-sm'>No recent items match your search.</small>
     :
     <motion.ul>
     {result?.map((item, index) => (
     <motion.li layout key={index} onClick={() => navigate('/office/' + item?.id)}><div className="df"><img src={file} alt="file" /> <span>{item?.file_name}</span></div><p>{new Date(item?.publishedAt?.seconds *1000 ).toLocaleDateString('en-GB')}</p></motion.li>
     ))}
     </motion.ul>
     }

    </motion.div>
  )
}

export default OfficeSearchDrop