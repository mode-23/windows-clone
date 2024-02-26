import React, {useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {BsChatText , BsThreeDots , BsPlusLg} from 'react-icons/bs'
import {AiOutlineSetting , AiOutlineHome} from 'react-icons/ai'
import {VscArchive, VscMenu} from 'react-icons/vsc'
import {BiBlock} from 'react-icons/bi'
import {RiSearchLine} from 'react-icons/ri'
import { userContext } from '../../Context/UserContext'
import { db } from '../../firebase/Firebase'
import { collection, doc, getDoc, onSnapshot, query, setDoc , serverTimestamp, where, orderBy} from 'firebase/firestore'
import SearchChat from './SearchChat'
import WtNavLink from './WtNavLink'

const DashboardMenu = () => {
  const {user} = useContext(userContext);
  const [localUser, setLocalUser] = useState({})
  const [mainTab, setMainTab] = useState('')
  const [content, setContent] = useState([])
  const [toggleSmMenu, setToggleSmMenu] = useState(false)
    useEffect(() => {
    const unsub = onSnapshot(doc(db, "user", user?.uid), (doc) => {
      setLocalUser(doc.data())
  });
    return () => {
      unsub();
    }
  }, [user])
  const [data, setData] = useState([])
  useEffect(() => {
    const refrence = collection(db, "user");
    const q = query(refrence);
    const unsub = onSnapshot(q , (snapShot) => {
      let list = [];
      snapShot.docs.forEach(doc => {
        if(doc.data().uid != user?.uid){
          list.push({...doc.data()})
        }
        setData(list)
    });
    },
    (error) => {
      console.log(error);
    }
    );
    return () => {
      unsub();
    }
}, [user])
  const navigate = useNavigate()

  const checkMessage = async (chatid) => {
  const myArray = chatid.split('@');
    const res = await getDoc(doc(db, "chat" , chatid))
    const res2 = await getDoc(doc(db, "chat" , myArray[1] + "@" + myArray[0]))
    if(res2.exists() || res.exists()){
      if(res2.exists()){
        navigate(myArray[1] + "@" + myArray[0])
      }else if(res.exists()){
        navigate(chatid)
      }
    }else{
      await setDoc(doc(db, "chat", chatid), {
        createdAt: serverTimestamp(),
        chatid: chatid,
        chatType: 'private',
        from: user?.uid,
        last_msg: null,
        last_msg_date: '',
       });
      navigate(chatid)
    }
  }
  useEffect(() => {
    const refrence = collection(db, "chat");
    const q = query(refrence, where("last_msg.allowed", "array-contains", user?.uid),  orderBy("last_msg.publishedAt", "desc"));
    const unsub = onSnapshot(q , (snapShot) => {
      let list = [];
      snapShot.docs.forEach(doc => {
          list.push({...doc.data()})
          setContent(list)
    });
    console.log(list);
    if(!list.length) setContent([])
    },
    (error) => {
      console.log(error);
    }
    );
    return () => {
      unsub();
    }
}, [user])
let menuRef = useRef();
let mainBtnRef = useRef();
useEffect(() => {
  let clickOutside = (e) => {
    if(!menuRef?.current?.contains(e.target)){
      setToggleSmMenu(false)
    }
    if(mainBtnRef?.current?.contains(e.target)){
      setToggleSmMenu(true)
    }
  }
  document.addEventListener('click', clickOutside)
  return () => {
  document.removeEventListener('click', clickOutside)
  };
})
  return (
    <div className='dashboardMenu'>
      <aside className='dashboard_aside'>
        <ul>
        <li className={'sm_menu_wt'} ref={mainBtnRef} onClick={() => setToggleSmMenu(!toggleSmMenu)}><span><VscMenu /></span> </li>
          <li><NavLink to={`/whatsapp`} end><BsChatText /></NavLink></li>
          <li><NavLink to={`/whatsapp/archive`} end><VscArchive /></NavLink></li>
          <li><NavLink to={`/whatsapp/settings`} end><AiOutlineSetting /></NavLink></li>
        </ul>
      </aside>
        {mainTab === '' && (
        <main className={toggleSmMenu ? 'dashboard_main active' : 'dashboard_main'} ref={menuRef}>
        <header className='dashboard_header'>
        <div className="top_header_dash">
          <h4>Chats</h4>
          <div className="df">
          <NavLink to={'/whatsapp'} className="icon_1 icon_3 wticon" end>
            <AiOutlineHome />
          </NavLink>
          <div className="icon_1 icon_3 wticon">
            <BsPlusLg />
          </div>
          <div className="icon_1 icon_3 wticon">
            <BsThreeDots />
          </div>
          </div>
        </div>
        <div className="dash_input">
        <input type="text" placeholder='Search or start a new chat' onFocus={() => setMainTab('search')} />
        <RiSearchLine />
        </div>
        <div className="top_header_dash">
          <div className="df">
          <div className="icon_1 icon_3">
            <BiBlock />
          </div>
          <h5>Blocked</h5>
          </div>
          <span>0</span>
        </div>
        </header>
        <div className="dashboard_body_content">
          <ul>
            {content?.map(item => (
              <WtNavLink key={item?.chatid}  item={item} user={user} setToggleSmMenu={setToggleSmMenu} />
            ))}

          </ul>
        </div>
        </main>
        )}
        {mainTab === 'search' && (
          <SearchChat toggleSmMenu={toggleSmMenu} menuRef={menuRef} user={user} checkMessage={checkMessage} setMainTab={setMainTab} data={data} />
        )}
    </div>
  )
}

export default DashboardMenu