import React,{useState} from 'react'
import './login.css'
import { BsChevronCompactUp } from 'react-icons/bs'
import { motion, AnimatePresence } from 'framer-motion'
import RegisterLog from './RegisterLog'

const Login = ({setuser , user}) => {
     const [open, isOpen] = useState(false)
     const date = new Date
     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={open ? 'login_page active' : 'login_page'}>
     <div className="date_login">
          <h4>{date.getHours() <= 9 ? '0' + date.getHours() : date.getHours() }:{date.getMinutes() <= 9 ? '0' + date.getMinutes(): date.getMinutes() }</h4>
          <h5>{days[date.getDay()]} , {months[date.getMonth()]} {date.getDate()}</h5>
     </div>
     <div className="swipeToLog" onClick={() => isOpen(!open)}>
     <BsChevronCompactUp />
     <p>Click to login</p>
     </div>
     <AnimatePresence mode='wait'>
     {open && (
     <RegisterLog setuser={setuser} isOpen={isOpen} user={user}/>
     )}
     </AnimatePresence>
    </motion.div>
  )
}

export default Login