import React, {useState , useEffect , useRef} from 'react'
import {VscAccount , VscTerminalUbuntu} from 'react-icons/vsc'
import gmail from './Home_assest/gmail.png'
import googlemap from './Home_assest/google-maps.png'
import watch from './Home_assest/Media_Player_Windows_11_logo.svg.png'
import whatsapp from './Home_assest/WhatsApp.svg.png'
import office from './Home_assest/office.png'
import todo from './Home_assest/todo.png'
import spotify from './Home_assest/spotify.png'
import yt from './Home_assest/youtube.png'
import calculator from './Home_assest/calculator.png'
import calendar from './Home_assest/windows-calendar.png'
import classroom from './Home_assest/Google_Classroom_Logo.svg.png'
import timer from './Home_assest/timer.png'
import translate from './Home_assest/Google_Translate_logo.svg.png'
import forms from './Home_assest/Google_Forms_2020_Logo.svg.png'
import ai from './Home_assest/illustrator.png'
import folder from './Home_assest/folder-open.png'
import doc from './Home_assest/file.png'
import stickynotes from './Home_assest/stickynotes.png'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/Firebase'
import { TfiPowerOff, TfiSettings } from 'react-icons/tfi'
import { NavLink, useNavigate } from 'react-router-dom'

const BottomBarMenu = ({isOpen , windBtnRef, isOpenWeather}) => {
  const navigate = useNavigate()
  const [arrayOfBoxes_1] = useState([
    {
      name: 'Office',
      img: office,
      url: '/office',
    },
    {
      name: 'Google maps',
      img: googlemap,
      url: '/map',
    },
    {
      name: 'Translate',
      img: translate,
      url: '/translate',
    },
  ])
  const [arrayOfBoxes_2] = useState([
    {
      name: 'Gmail',
      img: gmail,
      url: '/gmail',
    },
    {
      name: 'Forms',
      img: forms,
      url: '/forms',
    },
    {
      name: 'Classroom',
      img: classroom,
      url: '/classroom',
    },
  ])
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let menuRef = useRef();
  useEffect(() => {
    let clickOutside = (e) => {
      if(!menuRef.current.contains(e.target)){
        isOpen(false)
      }
      if(windBtnRef.current.contains(e.target)){
        isOpen(true)
      }
    }
    document.addEventListener('click', clickOutside)
    return () => {
    document.removeEventListener('click', clickOutside)
    };
  })
  const logout = async() => {
    await signOut(auth)
    navigate('/')
}
  return (
    <div className='bottomBarMenu' ref={menuRef}>
     <div className="bottomBarMenuLeft">
          <div className="bottom_bar_icon bottom_bar_icon_2">
          <VscTerminalUbuntu />
          </div>
          <div className="bottom_bar_icon bottom_bar_icon_2">
          <VscAccount />
          </div>
          <NavLink to={'/settings'} className="bottom_bar_icon bottom_bar_icon_2">
          <TfiSettings />
          </NavLink>
          <div className="bottom_bar_icon bottom_bar_icon_2" onClick={logout}>
          <TfiPowerOff />
          </div>
     </div>
     <div className="bottomBarMenuRight">
      <div className="bottomBarMenuRight-1">
        <div className="bottomBarMenuRight-0">
          <ul>
            <span>A</span>
            <li>
            <img src={timer} alt="timer" />
            <p>Timer</p>
            </li>
          </ul>
          <ul>
            <span>C</span>
            <li>
            <img src={ai} alt="ai" />
            <p>ChatGPT</p>
            </li>
            <li>
            <img src={calendar} alt="calendar" />
            <p>Calendar</p>
            </li>
            <li>
            <img src={calculator} alt="calculator" />
            <p>Calculator</p>
            </li>
          </ul>
          <ul>
            <span>F</span>
            <li>
            <img src={folder} alt="folders" className='folder_xl' />
            <p>Folder</p>
            </li>
            <li>
            <img src={doc} alt="documents" className='doc_xl' />
            <p>Documents</p>
            </li>
          </ul>
          <ul>
            <span>M</span>
            <li>
            <img src={gmail} alt="gmail" />
            <p>Gmail</p>
            </li>
            <li>
            <img src={watch} alt="youtube" />
            <p>Watch</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottomBarMenuRight-2">
        <div className="tranch">
        <p>Productivity</p>
        <div className="boxs_bbmr">
          {arrayOfBoxes_1.map((item , index) => (
          <NavLink to={item.url} className="box_bbmr" key={index}>
            <img src={item.img} alt={item.name} />
            <span>{item.name}</span>
          </NavLink>
          ))}
            <NavLink to={'/calendar'} className="box_bbmr">
              <h5>{days[new Date().getDay()]}</h5>
              <h3>{new Date().getDate()}</h3>
          </NavLink>
        </div>
        </div>
        <div className="tranch">
        <p>Explore</p>
        <div className="boxs_bbmr">
          {arrayOfBoxes_2.map((item , index) => (
          <NavLink to={item.url} className={item.name === "Forms" ? "box_bbmr small" : "box_bbmr"} key={index}>
            <img src={item.img} alt={item.name} />
            <span>{item.name}</span>
          </NavLink>
          ))}
            <div className="box_bbmr_sky" onClick={() => isOpenWeather(true)}>
              <p>31 °</p>
              <h6>Mostly sunny</h6>
            <span>London</span>
          </div>
        </div>
        </div>

        <div className="tranch">
        <p>More</p>
        <div className="boxs_bbmr">
          <NavLink to={'/youtube'} className="box_bbmr" >
            <img src={yt} alt={'to do'} />
            <span>Youtube</span>
          </NavLink>
          <div className="boxs_bbmr_sm">
            <NavLink to={'/whatsapp'} className="box_bbmr_sm">
            <img src={whatsapp} alt="whatsapp" />
            </NavLink>
            <NavLink to={'/todo'} className="box_bbmr_sm">
            <img src={todo} alt="todo" />
            </NavLink>
            <div className="box_bbmr_sm">
            <img src={stickynotes} alt="sticky notes" />
            </div>
            <div className="box_bbmr_sm">
            <img src={spotify} alt="spotify" />
            </div>
        </div>
        </div>
        </div>
      </div>
     </div>
    </div>
  )
}

export default BottomBarMenu