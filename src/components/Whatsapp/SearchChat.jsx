import React from 'react'
import { HiOutlineArrowUturnLeft } from 'react-icons/hi2'
import {RiSearchLine} from 'react-icons/ri'
import userImg from '../Home/Home_assest/user1.png'
const SearchChat = ({setMainTab , checkMessage, user, data , menuRef , toggleSmMenu}) => {
  
  return (
     <main className={toggleSmMenu ? 'dashboard_main active dashboard_search' : 'dashboard_main dashboard_search'} ref={menuRef}>
     <header>
     <button onClick={() => setMainTab('')} className='df'><HiOutlineArrowUturnLeft /> return</button>
     </header>
     <div className="dash_search_title">
          <h5>Search for a chat 🧐</h5>
     </div>
     <div className="dash_search_tab">
     <div className="dash_search_tab_input">
      <RiSearchLine />
      <input type="text" placeholder='Search' />
     </div>
     </div>
     <div className="content_dash">
     <ul>
       {data?.map(item => (
       <li key={item?.uid} onClick={() => checkMessage(user?.uid + "@" + item?.uid)}>
        <div className="img_dash">
          {item?.photoURL ?
          <img src={item?.photoURL ? item?.photoURL : userImg} alt={item?.uid} />
            :
            <div className="brColor" style={{backgroundColor: item?.userColor}}>{item?.displayName?.[0]}</div>
          }
        </div>
        <div className="start">
          <h4>{item?.displayName}</h4>
          <p>{item?.phoneNumber}</p>
        </div>
        {/* {item?.uid} */}
        </li>
       ))}
     </ul>
     </div>
   </main>
  )
}

export default SearchChat