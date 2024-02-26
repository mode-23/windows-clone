import React from 'react'
import './forms.css'
import { NavLink } from 'react-router-dom'
import GoogleMenu from '../Google_Components/GoogleMenu'
import UserMenu from '../Google_Components/UserMenu'
import formsIcon from '../Home/Home_assest/Google_Forms_2020_Logo.svg.png'
const Forms = () => {
  return (
    <div className='tab wide forms_tab'>
      <div className="tab_title forms_title"></div>
      <header className="forms_header">
        <NavLink to={'/forms'}>
          <img src={formsIcon} alt="google forms icon" className='googleFormsIcon' />
        </NavLink>
        <div className="df">
          <GoogleMenu />
          <UserMenu />
        </div>
      </header>
      
    </div>
  )
}

export default Forms