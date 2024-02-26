import './settings.css'
import './responsiveSettings.css'
import React, { useEffect, useState, useContext } from 'react'
import { BsDash , BsStars} from 'react-icons/bs'
import { IoCloseSharp , IoExtensionPuzzleSharp } from 'react-icons/io5'
import { VscPrimitiveSquare } from 'react-icons/vsc'
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom'
import userPfp from '../Home/Home_assest/user1.png'
import {RiFlagFill} from 'react-icons/ri'
import {MdPrivacyTip} from 'react-icons/md'
import {FaFont , FaUserCircle} from 'react-icons/fa'
import {userContext} from '../../Context/UserContext'
const Settings = ({user}) => {
  const {userMainAuthor} = useContext(userContext)
  
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if(!user?.uid) {
      navigate('/')
    }
  }, [user, navigate])
  const [wideTab, isWideTab] = useState(true)
  const [tabbed, isTabbed] = useState(false)
  const nav_settings = [
    {
      name: 'Account',
      icon: <FaUserCircle />,
      url: 'account',
    },
    {
      name: 'My details',
      icon: <RiFlagFill />,
      url: 'details',
    },
    {
      name: 'Privacy',
      icon: <MdPrivacyTip />,
      url: 'privacy',
    },
    {
      name: 'Appearance',
      icon: <BsStars />,
      url: 'appearance',
    },
    {
      name: 'Font',
      icon: <FaFont />,
      url: 'font',
    },
    {
      name: 'Applications',
      icon: <IoExtensionPuzzleSharp />,
      url: 'applications',
    },
  ]
  const handleTabSize = () => {
    if(wideTab){
      return 'tab settings wide'
    }else if(tabbed){
      return 'tab settings close'
    }else{
      return 'tab settings'
    }
  }
  return (
    <div className={handleTabSize()}>
      <div className="tab_title" onDoubleClick={() => isWideTab(!wideTab)}>
        <div className="tab_utils">
          <div className="tab_util_icon" onClick={() => isTabbed(!tabbed)}><BsDash /></div>
          <div className="tab_util_icon" onClick={() => isWideTab(!wideTab)}><VscPrimitiveSquare /></div>
          <div className="tab_util_icon close" onClick={() => navigate('/')}><IoCloseSharp /></div>
        </div>
      </div>
      <div className="settings_body">
        <nav className="settings_body_left settings_body_part">
          <div className="settings_user_icon">
              <img src={userPfp} alt="user icon" />
          </div>
          <div className="settings_info">
              <h3>{user?.displayName}</h3>
              <h5>{user?.email}</h5>
          </div>
              <ul>
                {nav_settings.map((item, index) => (
              <li key={index}>
                <NavLink to={item.url} className={location.pathname === '/settings' && item.url === 'account' && 'active'}>
                    {item.icon}{item.name}
                </NavLink>
                </li>
                ))}
              </ul>
        </nav>
        <main className="settings_body_right settings_body_part">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Settings