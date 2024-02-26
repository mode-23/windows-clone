import React, { useEffect, useState } from 'react'
import { Outlet} from 'react-router-dom'
import './gmail.css'
import './responsiveGmail.css'
import { BsDash , BsStarFill} from 'react-icons/bs'
import { HiOutlineMenu, HiOutlinePencil, HiOutlineSearch } from 'react-icons/hi'
import { IoCloseSharp } from 'react-icons/io5'
import { VscPrimitiveSquare } from 'react-icons/vsc'
import { CgInbox } from 'react-icons/cg'
import { NavLink, useNavigate } from 'react-router-dom'
import gmail from '../Home/Home_assest/gmail.png'
import MessageBox from './MessageBox'
import { doc, onSnapshot} from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import GmailLoading from './GmailLoading'
import { motion } from 'framer-motion'
import { MdLabelImportant } from 'react-icons/md'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { FaTrashAlt } from 'react-icons/fa'
import GoogleMenu from '../Google_Components/GoogleMenu'
import UserMenu from '../Google_Components/UserMenu'

const GmailOutlet = ({user}) => {
     const [wideTab, isWideTab] = useState(true)
     const [tabbed, isTabbed] = useState(false)
     const [copose, isCoposed] = useState(false)
     const [loading, setLoading] = useState(true)
     const [tabView, setTabView] = useState(false)
     const [refresh, setRefresh] = useState(false)
    const links = [
      {
        name: 'Inbox',
        icon: <CgInbox />,
        url:'/gmail',
      },
      {
        name: 'Starred',
        icon: <BsStarFill />,
        url:'starred',
      },
      {
        name: 'Important',
        icon: <MdLabelImportant />,
        url:'important',
      },
      {
        name: 'Sent',
        icon: <RiSendPlane2Fill />,
        url:'sent',
      },
      {
        name: 'Bin',
        icon: <FaTrashAlt />,
        url:'bin',
      },
    ]



     const navigate = useNavigate()
     useEffect(() => {
          if(!user?.uid) {
            navigate('/')
          }
        }, [user])

     const handleTabSize = () => {
          if(wideTab){
            return 'tab gmail_tab office_tab wide'
          }else if(tabbed){
            return 'tab gmail_tab office_tab close'
          }else{
            return 'tab gmail_tab office_tab'
          }
        }
        const [userAuthor, setuserAuthor] = useState({})
        useEffect(() => {
          if(user?.uid) {
            const unsub = onSnapshot(doc(db, "user", user?.uid), (doc) => {
                setuserAuthor(doc.data())
            });
              return () => {
                unsub();
              }
          }
          }, [])

  return (
    <div className={handleTabSize()}>
     {copose && (
          <MessageBox isCoposed={isCoposed} user={user} userAuthor={userAuthor} />
     )}
          <div className="tab_title office_tab_title gmail_tab_title" onDoubleClick={() => isWideTab(!wideTab)}>
               <div className="tab_utils">
                    <div className="tab_util_icon" onClick={() => isTabbed(!tabbed)}><BsDash /></div>
                    <div className="tab_util_icon" onClick={() => isWideTab(!wideTab)}><VscPrimitiveSquare /></div>
                    <div className="tab_util_icon close" onClick={() => navigate('/')} ><IoCloseSharp /></div>
               </div>
      </div>
      {loading ?
      <motion.section initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={tabView ? "gmail_body closed" : "gmail_body"}>
      <main className='main_body main_body_left'>
           <div className="gmail_header df">
                <div className="gmail_menu" onClick={() => setTabView(!tabView)}>
                <HiOutlineMenu />
                </div>
                <NavLink to={'/gmail'} className="df">
                <img src={gmail} alt="gmail icon" className='gmail_logo' />
                {!tabView && (
                <span>Gmail</span>
                )}
           </NavLink>
           </div>
           <div className="gmail_header_body_menu">
                <div className="btn_padding">
                <button className='primaryBtn' onClick={() => isCoposed(true)}><HiOutlinePencil />{!tabView && <div>Compose</div>}</button>
                </div>
                <nav className="menu_content">
                     <ul>
                      {links.map((item, index) => (
                          <li key={index}>
                            <NavLink to={item.url} end>
                              {item.icon}{!tabView && <div>{item.name}</div>}
                              </NavLink>
                          </li>
                      ))}
                     </ul>
                </nav>
           </div>
      </main>
      <main className="main_body main_body_right">
      <header className="gmail_header gmail_header_left">
           <div className="gmail_search">
                <HiOutlineSearch className='srch_icon' />
                <input type="text" placeholder='Search mail' />
           </div>
           <div className="df">
            <GoogleMenu />
            <UserMenu />
           </div>
       </header>
       <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}  className="gmail_header_body_content">
     <Outlet context={{ user , setRefresh,  isCoposed , userAuthor, refresh }} />
     </motion.div>
     </main>
       </motion.section>
          :
          <GmailLoading />
      }
    </div>
  )
}

export default GmailOutlet