import React, { useRef, useEffect, useState } from 'react'
import {ImPlus , ImImages} from 'react-icons/im'
import { TfiSettings } from 'react-icons/tfi'
import { VscColorMode, VscNewFile, VscNewFolder } from 'react-icons/vsc'
import { RiRefreshLine } from 'react-icons/ri'
import {  BsFolder2Open, BsFilePlus } from 'react-icons/bs'
import {  BiChevronRight } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const ContextMenu = ({stats, isOpen}) => {
     let menuRef = useRef();
     const navigate = useNavigate()
     let elements = [
          {
               name: 'New',
               icon: <ImPlus />,
               action: 'create',
               subCollection: [],
          },
          {
               name: 'File explorer',
               icon: <BsFolder2Open />,
               nav: '/file-explorer',
          },
          {
               name: 'Gallery',
               icon: <ImImages />,
               nav: '/gallery',
          },
          {
               name: 'Settings',
               icon: <TfiSettings />,
               nav: '/Settings',
          },
          {
               name: 'Theme',
               icon: <VscColorMode />,
               nav: '/settings/appearance',
          },
          {
               name: 'Refresh',
               icon: <RiRefreshLine />,
               action: 'refresh',
          },
     ]
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
     const [elementAction, setElementAction] = useState('')
     const [create, setCreate] = useState(false)
     function handleAction(action){
          setElementAction(action)
          if(action === "refresh"){
               window.location.reload()
          }else if(action === "create"){
               console.log(action);
               setCreate(!create)
          }
     }
  return (
     <div ref={menuRef} className="context_menu" style={{top: stats.top , left: stats.left}}>
          <ul>
               {elements.map((item, index) => (
               <li key={index} className={elementAction === item?.action && create && "active"}>
                    <span onClick={() => {
                         if(item?.nav){
                              navigate(item?.nav)
                         }else if(item?.action){
                              handleAction(item?.action)
                         }
                    }}>
                         {item.icon}
                         {item.name}
                         {item?.action === "create" && <BiChevronRight className='rightChev' />}
                    </span>
                    {create && elementAction === item?.action && (
                         <div className='sub_collection'>
                              <ul>
                                   <li><span><VscNewFolder /> new folder</span></li>
                                   <li><span><VscNewFile /> new file</span></li>
                                   <li><span><BsFilePlus /> new document</span></li>
                              </ul>
                         </div>
                    )}
               </li>
               ))}
          </ul>
     </div>
     )
}

export default ContextMenu