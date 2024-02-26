import React from 'react'
import DashboardMenu from './DashboardMenu'
import { Outlet, useNavigate } from 'react-router-dom'
import { BsDash } from 'react-icons/bs'
import { VscPrimitiveSquare } from 'react-icons/vsc'
import { IoCloseSharp } from 'react-icons/io5'

const WhatsappDashboard = ({isWideTab , wideTab , isTabbed , tabbed}) => {
  const navigate = useNavigate()
  return (
    <div className='whatsappDashboard'>
      <DashboardMenu />
      <div className="whatsapp_content">
        <div className="whatsapp_title tab_title">
        <div className="tab_utils">
                    <div className="tab_util_icon" onClick={() => isTabbed(!tabbed)}><BsDash /></div>
                    <div className="tab_util_icon" onClick={() => isWideTab(!wideTab)}><VscPrimitiveSquare /></div>
                    <div className="tab_util_icon close" onClick={() => navigate('/')} ><IoCloseSharp /></div>
               </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default WhatsappDashboard