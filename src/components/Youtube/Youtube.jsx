import './youtube.css'
import './responsiveYoutube.css'
import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from './YoutubeApi'
import { BsDash, BsFillGrid3X3GapFill, BsPlusCircle } from 'react-icons/bs'
import { VscPrimitiveSquare } from 'react-icons/vsc'
import { IoCloseOutline, IoCloseSharp } from 'react-icons/io5'
import { CgMenuLeft } from 'react-icons/cg'
import { TfiSearch } from 'react-icons/tfi'
import { FaHistory } from 'react-icons/fa'
import { BiSolidLike } from 'react-icons/bi'
import { AiFillHome , AiOutlineVideoCameraAdd} from 'react-icons/ai'
import { RiVideoFill, RiVideoUploadFill } from 'react-icons/ri'
import { MdWatchLater , MdAddToPhotos, MdVideoLibrary } from 'react-icons/md'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import youtubeIcon from '../Home/Home_assest/youtube.png'
import usericon from '../Home/Home_assest/gmailuser.png'
import {SiYoutubegaming , SiYoutubemusic , SiYoutubestudio} from 'react-icons/si'

const Youtube = ({user}) => {
     const navigate = useNavigate()
     const [videos, setVideos] = useState([])
     const [loading, isLoading] = useState(false)
     const [wideTab, isWideTab] = useState(true)
     const [tabbed, isTabbed] = useState(false)
     const [focused, isFocused] = useState(false)
     const [searchValue, setSearchValue] = useState("")
     const [refinements, setRefinements] = useState([])
     const [expand, isExpanded] = useState(false)
     const [expand_sm, isExpanded_sm] = useState(false)
     const links = [
      {
        name: 'Home',
        shortName:'Home',
        url: '/youtube',
        icon: <AiFillHome />,
        activeIcon: <AiFillHome/>,
      },
      {
        name: 'Watch later',
        shortName:'Later',
        url: '/youtube/watchlater',
        icon: <MdWatchLater />,
        activeIcon: <MdWatchLater />,
      },
      {
        name: 'Saved playlist',
        shortName:'Playlists',
        url: '/youtube/savedlist',
        icon: <MdVideoLibrary />,
        activeIcon: <MdAddToPhotos />,
      },
     ]
     const sub_links = [
      {
        name: 'Music',
        url: '/youtube/music',
        icon: <SiYoutubemusic />,
      },
      {
        name: 'Gaming',
        url: '/youtube/games',
        icon: <SiYoutubegaming />,
      },
      {
        name: 'Movies',
        url: '/youtube/movies',
        icon: <SiYoutubestudio />,
      },
     ]
     const handleTabSize = () => {
       if(wideTab){
         return 'tab youtube wide'
       }else if(tabbed){
         return 'tab youtube close'
       }else{
         return 'tab youtube'
       }
     }
     useEffect(() => {
          isLoading(true)
          fetchFromAPI(`trending?type=now`)
          .then((data) => 
          {
            setVideos(data.data)
            isLoading(false)
          }
          )
        }, [])
        useEffect(() => {
          if(searchValue){
            fetchFromAPI(`search?query=${searchValue}`)
            .then((data) => {
                setRefinements(data?.refinements)
            }
              );
          }
        }, [searchValue])
        const handleSubmit = () => {
          if(searchValue){
            navigate(`/youtube/search/${searchValue}`);
          }
        }
        document.onkeyup = (e) => {
          if(e.key === "Enter"){
          handleSubmit();
          }
      }

  return (
    <div className={handleTabSize()} >
     <div className="tab_title youtube_tab_title" onDoubleClick={() => isWideTab(!wideTab)}>
        <div className="tab_utils">
          <div className="tab_util_icon" onClick={() => isTabbed(!tabbed)}><BsDash /></div>
          <div className="tab_util_icon" onClick={() => isWideTab(!wideTab)}><VscPrimitiveSquare /></div>
          <div className="tab_util_icon close" onClick={() => navigate('/')}><IoCloseSharp /></div>
        </div>
     </div>
     <header className="yt_header">
      <div className="df-2 df sm_df_bs">
      <div className="icon_1 menuIcon_sm" onClick={() => isExpanded(!expand)}><CgMenuLeft /></div>
      <NavLink to={'/youtube'} className="df-1 df">
        <img src={youtubeIcon} alt="youtube" className='yticon' />
      <h5>YouTube</h5>
      </NavLink>
      </div>
      <div className="yt_search">
        {refinements?.length > 0 && focused && (
        <div className="yt_search_drop_down">
        <ul>
          {refinements?.map((item , index) => (
          <li key={index} onClick={() => navigate(`/youtube/search/${item}`)}><NavLink to={`/youtube/search/${item}`} className="df"><TfiSearch />{item}</NavLink></li>
          ))}
        </ul>
      </div>
        )}
        <input type="text" placeholder='Search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onFocus={() =>isFocused (true)} onBlur={() => isFocused(false)} />
        <div className="yt_search_icon" onClick={handleSubmit}>
          <TfiSearch />
        </div>
        {searchValue && (
        <IoCloseOutline className='clear_search' onClick={() => setSearchValue("")} />
        )}
      </div>
      <div className="df">
      <div className="icon_1 icon_3">
          <BsFillGrid3X3GapFill />
        </div>
        <NavLink to={'create'} className="icon_1 icon_3 icon_3_sm">
          <RiVideoUploadFill />
        </NavLink>
        {/* <div className="icon_1 icon_3">
          <AiOutlineVideoCameraAdd />
        </div>
        <div className="icon_1 icon_3">
          <BsBell />
        </div> */}
      <img src={usericon} alt="user icon" className='ytusericon' />
      </div>
     </header>
     <div className={expand ? "yt_body expand" : "yt_body"}>
      <nav className='nav_bar_sm'>
        <div className="nav_lft nav_sm">
        {links.map((item, index) => (
        <NavLink key={index} to={item.url} className="yt_sm_link" end>
          {item.icon}
        </NavLink>
        ))}
        </div>
        <BsPlusCircle className='plus_sm' />
        <div className="nav_lrt nav_sm">
        {sub_links.map((item, index) => (
        <NavLink key={index} to={item.url} className="yt_sm_link" end>
          {item.icon}
        </NavLink>
        ))}
        </div>
      </nav>
      <main>
        <div className="main">
        {links.map((item, index) => (
        <NavLink key={index} to={item.url} className="yt_nav_link" end>
          {item.icon}{expand ? item.shortName : item.name}
        </NavLink>
        ))}
        </div>
        {!expand && (
        <div className="explore">
        <h6>explore</h6>
        {sub_links.map((item, index) => (
        <NavLink key={index} to={item.url} className="yt_nav_link yt_sub_nav_link" end>
          {/* <img src={item.img} alt={item.name} />
          {item.name} */}
          {item.icon}{item.name}
        </NavLink>
        ))}
        </div>
        )}
      </main>
      <section>
        <Outlet context={{user, videos , loading}} />
      </section>
     </div>
    </div>
  )
}

export default Youtube