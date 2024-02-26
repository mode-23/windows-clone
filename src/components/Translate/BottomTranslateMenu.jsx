import React, { useState } from 'react'
import {IoTimeSharp} from 'react-icons/io5'
import {BsStarFill , BsThreeDotsVertical} from 'react-icons/bs'
import HistoryTranslate from './HistoryTranslate'
import SavedTranslate from './SavedTranslate'

const BottomTranslateMenu = () => {
     const tabs = [
          {
               name: 'history',
               icon: <IoTimeSharp />,
          },
          {
               name: 'saved',
               icon: <BsStarFill />,
          },
     ]
     const [tab, setTab] = useState(tabs[0].name)
  return (
    <div className='translate_bottom_menu'>
     <div className="btm_menu_tab">
          <ul className='df'>
               {tabs.map((item, index) => (
               <li className={item.name === tab ? 'active df' :'df'} onClick={() => setTab(item.name)} key={index}>{item.icon} {item.name}</li>
               ))}
          </ul>
          <div className="df">
               <div className="icon_1 icon_3">
                    <BsThreeDotsVertical />
               </div>
          </div>
     </div>
     <div className="btm_menu_body">
          {tab === 'history' ?
          <HistoryTranslate />
          :
          <SavedTranslate />
          }
     </div>
    </div>
  )
}

export default BottomTranslateMenu