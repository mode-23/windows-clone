import React, {useEffect, useState, useRef} from 'react'
import './googleComponent.css'
import {BiSolidGrid} from 'react-icons/bi'
import office from '../Home/Home_assest/office.png'
import map from '../Home/Home_assest/google-maps.png'
import gmail from '../Home/Home_assest/gmail.png'
import youtube from '../Home/Home_assest/youtube.png'
import chat from '../Home/Home_assest/Google_Chat_icon_(2020).svg.png'
import translate from '../Home/Home_assest/Google_Translate_logo.svg.png'
import forms from '../Home/Home_assest/Google_Forms_2020_Logo.svg.png'
import calendar from '../Home/Home_assest/Google_Calendar_icon_(2020).svg.png'
import classroom from '../Home/Home_assest/Google_Classroom_Logo.svg.png'
import { NavLink } from 'react-router-dom'
import Tooltip from '../Asset/Tooltip';

const GoogleMenu = () => {
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
  const google_data = [
    {
      name: 'Office',
      img: office,
      url: '/office',
    },
    {
      name: 'Google maps',
      img: map,
      url: '/map',
    },
    {
      name: 'Gmail',
      img: gmail,
      url: '/gmail',
    },
    {
      name: 'Youtube',
      img: youtube,
      url: '/youtube',
    },
    {
      name: 'Calendar',
      img: calendar,
      url: '/calendar',
    },
    {
      name: 'Classroom',
      img: classroom,
      url: '/classroom',
    },
    {
      name: 'Forms',
      img: forms,
      url: '/forms',
    },
    {
      name: 'Translate',
      img: translate,
      url: '/translate',
    },
    {
      name: 'Chat',
      img: chat,
      url: '/whatsapp',
    },
  ]
  return (
    <div className='google_menu' ref={menuRef}>
    <button className={open ? 'google_btn active' : 'google_btn'} ref={btnRef} onClick={() => isOpen(!open)}><BiSolidGrid /></button>
    {open && (
    <div className="google_drop_down">
      {google_data.map((item, index) => (
      <NavLink to={item.url} className="google_sm_bx toolholder" key={index}>
        <Tooltip message={item.name} direction='bottom' />
        <img src={item.img} alt={item.name} className={item.name === 'Forms' ? 'smaller' : 'nun'} />
        <span className='slice_span3'>{item.name}</span>
      </NavLink>
      ))}
    </div>
    )}

    </div>
  )
}

export default GoogleMenu