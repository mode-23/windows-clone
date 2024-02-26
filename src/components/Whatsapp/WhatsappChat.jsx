import React, { useState, useEffect  , useContext , useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {v4} from 'uuid'
import { userContext } from '../../Context/UserContext'
import { db } from '../../firebase/Firebase';
import { collection, doc, getDoc, onSnapshot  , orderBy, query, serverTimestamp, setDoc, updateDoc, where} from 'firebase/firestore';
import userImg from '../Home/Home_assest/user1.png'
import {BsEmojiSmile, BsQrCode } from 'react-icons/bs'
import {RiSearchLine } from 'react-icons/ri'
import {AiOutlineLink , AiOutlineSend} from 'react-icons/ai'
import MsgFrom from './MsgFrom';
import MsgTo from './MsgTo';

const WhatsappChat = () => {
  const navigate = useNavigate()
  const {user} = useContext(userContext);
  const {id} = useParams()
  const myArray = id.split('@');
  const [messageDetails, setMessageDetails] = useState({
    id: v4(),
    from: user?.uid,
    type: 'whatsapp',
    to: id,
    text: '',
  })
  const [localUser, setLocalUser] = useState({})
  const [data, setData] = useState([])
  const [allowed, isAllowed] = useState(true)
  let receiverId ;
  if(myArray[0] === user?.uid){
    receiverId = myArray[1]
  }else{
    receiverId = myArray[0]
  }
  useEffect(() => {
    const checkId = async() => {
      const res = await getDoc(doc(db, "chat" , id))
      console.log(res.exists());
      if(!res.exists()) {
        navigate('/whatsapp/error')
      }
    }
    checkId()
  }, [id])
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "user", receiverId), (doc) => {
      setLocalUser(doc.data())
  });
    return () => {
      unsub();
    }
  }, [user , id , receiverId])
  const sendMsg = async () => {
    isAllowed(false)
    if(user?.uid){
      if(messageDetails.text !== ''){
        const res = await setDoc(doc(db, "message", "@" + messageDetails.id), {
          ...messageDetails,
          publishedAt: serverTimestamp(),
          file: 'text',
        });
        console.log(res);
    const DocRef = doc(db, "chat", id);
    await updateDoc(DocRef, {
      last_msg: {...messageDetails,
        publishedAt: serverTimestamp(),
        allowed: [myArray[1] , myArray[0]]
      }
    });
    setMessageDetails({
      id: v4(),
      from: user?.uid,
      type: 'whatsapp',
      to: id,
      text: '',
    })
    isAllowed(true)
  }
  }
  }
  document.onkeyup = (e) => {
    if(e.key === "Enter"){
      sendMsg();
    }
}
  useEffect(() => {
    const refrence = collection(db, "message");
    const q = query(refrence, where('type', "==", "whatsapp"), where("to", "==", id), orderBy("publishedAt", "asc"));
    const unsub = onSnapshot(q , (snapShot) => {
      let list = [];
      snapShot.docs.forEach(doc => {
          list.push({...doc.data()})
          setData(list)
    });
    if(!list.length) setData([])
    },
    (error) => {
      console.log(error);
    }
    );
    return () => {
      unsub();
    }
}, [user, id])
  const preventText = (e) => {
    if(e.key === "Enter"){
      e.preventDefault()
    }
  }
  return (
    <div className='whatsappChat' >
      <header>
        <div className="df">
            <div className="img_dash img_dash_2">
              {localUser?.photoURL ?
              <img src={localUser?.photoURL ? localUser?.photoURL : userImg} alt={localUser?.uid} />
                :
                <div className="brColor" style={{backgroundColor: localUser?.userColor}}>{localUser?.displayName?.[0]}</div>
              }
              </div>
              <div className="ssl">
                <h3 className='wttitle'>{localUser?.displayName}</h3>
                <p className='wtnum'>{localUser?.phoneNumber}</p>
              </div>
        </div>
        <div className="start mid_sm">
          <div className="df">
          <div className="icon_1 icon_3">
          <BsQrCode />
          </div>
          <div className="icon_1 icon_3">
          <RiSearchLine />
          </div>
          </div>
        </div>
      </header>
      <main className='whatsappMain' >
        <>
        {data?.map(item => {
          if(item?.from === user?.uid) {
            return <MsgFrom item={item} />
          }else{
            return <MsgTo item={item}/>
          }
        })}
        </>
      </main>
      <div className="whatsapp_send">
        <div className="df">
        <div className="icon_1 icon_3">
          <BsEmojiSmile />
        </div>
        <div className="icon_1 icon_3">
          <AiOutlineLink />
        </div>
        </div>
        <div className="whatsapp_msg_input" >
          {messageDetails.text === '' && <p>Type a message</p>}
          <textarea key={id}  onKeyPress={(e) => preventText(e)} value={messageDetails.text}  onChange={(e) => setMessageDetails({...messageDetails, text: e.target.value, to: id})}>
          </textarea>
        </div>
        <button onClick={sendMsg} disabled={messageDetails.text === '' || !allowed}><AiOutlineSend /></button>
      </div>
    </div>
  )
}

export default WhatsappChat