import React from 'react'
import './amazon.css'
import amazonIcon from '../Home/Home_assest/2560px-Amazon-logo-white.svg.png'
import { NavLink } from 'react-router-dom'
import {FiSearch} from 'react-icons/fi'
// import {AiOutlineUser} from 'react-icons/ai'
import {BiChevronDown} from 'react-icons/bi'
import { BsBox2 , BsStar , BsList , BsBag} from 'react-icons/bs'
import { Outlet } from 'react-router-dom'

const Amazon = () => {
  return (
    <div className='tab amazon'>
     <div className="tab_title amazon_title"></div>
     <header className='amazon_header'>
      <NavLink to={'/amazon'}>
        <img src={amazonIcon} alt="amazon icon" />
      </NavLink>
      <div className="amazon_search_bar">
        <input type="text" />
        <button><FiSearch /></button>
      </div>
      <div className="df">
      <div className="icon_1 icon_3">
        <BsStar />
      </div>
      <div className="icon_1 icon_3">
        <BsBox2 />
      </div>
      <div className="icon_1 icon_3">
        <BsBag />
      </div>
      </div>
     </header>
     <nav className='amazon_nav'>
      <div className="custom_drop">
        <div className="custom_drop_title df">
          <BsList />
          <h4>Categories</h4>
          <BiChevronDown className='drp' />
        </div>
      </div>
     </nav>
     <section className='amazon_section'>
     <Outlet />
     </section>
    </div>
  )
}

export default Amazon