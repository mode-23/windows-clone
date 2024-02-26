import React, {useContext, useEffect, useRef, useState} from 'react'
import {userContext} from '../../Context/UserContext'
import defaultUserImg from '../Home/Home_assest/gmailuser.png'
import { useNavigate } from 'react-router-dom'
import {TbCameraPlus} from 'react-icons/tb'

const UserMenu = () => {
     const navigate = useNavigate()
     const {user} = useContext(userContext)
     const menuRef = useRef()
     const btnRef = useRef()
     const [open, isOpen] = useState(false)
     useEffect(() => {
       let clickOutside = (e) => {
         if(!menuRef.current.contains(e.target)){
           isOpen(false)
         }
       }
       document.addEventListener('click', clickOutside)
       return () => {
       document.removeEventListener('click', clickOutside)
       };
     })
  return (
    <div className='user_menu' ref={menuRef}>
     <div className={open ? "user_menu_icon active" : "user_menu_icon"} onClick={() => isOpen(prev => !prev)} ref={btnRef}>
     <img src={user?.photoURL ? user?.photoURL : defaultUserImg} alt="default user icon" />
     </div>
     {open && (
     <div className="user_menu_drop_down">
          <div className="user_menu_header">
          <div className="control_image start">
                    <div className="icon_user">
                    <TbCameraPlus />
                    </div>
                    <img src={user?.photoURL ? user?.photoURL : defaultUserImg} alt="default user icon" />
          </div>
          <div className="start">
          <h3>{user?.displayName}</h3>
          <p >{user?.email}</p>
          <button className="btnControl" onClick={() => navigate('/settings/account')}>Manage your Windows Account</button>
          </div>
          </div>
          <div className="user_menu_body">
               
          </div>
     </div>
     )}
    </div>
  )
}

export default UserMenu