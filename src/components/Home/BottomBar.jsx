import React, {useState , useRef} from 'react'
import folder from './Home_assest/folder1.png'
import watch from './Home_assest/Media_Player_Windows_11_logo.svg.png'
import codepen from './Home_assest/vscode.png'
import spotify from './Home_assest/spotify.png'
import pics from './Home_assest/pics.png'
import {BsWindows ,  BsChatSquare, BsChatSquareFill} from 'react-icons/bs'
import BottomBarMenu from './BottomBarMenu'
import { NavLink } from 'react-router-dom'
import GmailNotifications from './Notifications/GmailNotifications'

const BottomBar = ({isOpenWeather , user}) => {
     const [open, isOpen] = useState(false);
     const [openMessage, isOpenMessage] = useState(false);
     const [data, setData] = useState([])
     const windBtnRef = useRef()
  return (
    <div className='bottom_bar'>
     {open && (
          <BottomBarMenu isOpen={isOpen} windBtnRef={windBtnRef} isOpenWeather={isOpenWeather}/>
     )}
     <div className={open ? "windowsIcon active": "windowsIcon"} onClick={() => isOpen(!open)} ref={windBtnRef}>
          <BsWindows/>
     </div>
     <div className="searchWindows">
          <input type="text" placeholder='Type here to search' />
     </div>
     <div className="bottom_bar_icon">
     <img src={pics} alt="pics" />
     </div>
     <NavLink to={'/file-explorer'} className="bottom_bar_icon">
          <img src={folder} alt="folder" />
     </NavLink>
     <NavLink to={'/player'} className="bottom_bar_icon">
          <img src={watch} alt="player icon" />
     </NavLink>
     <NavLink to={'/watch'} className="bottom_bar_icon">
          <img src={spotify} alt="spotify" />
     </NavLink>
     {openMessage && <GmailNotifications user={user} setData={setData} data={data} />}
     <div className="windows_inner_right">
     {/* <div className="windows_time_inner">
          <span>16:47 PM</span>
     </div> */}
     <div className={openMessage ? "messages_bottom_bar_icon bottom_bar_icon active": "messages_bottom_bar_icon bottom_bar_icon"} onClick={() => isOpenMessage(!openMessage)}>
          {openMessage ? 
          <BsChatSquareFill />
          :
          <BsChatSquare />
          }
     </div>
     </div>

    </div>
  )
}

export default BottomBar