import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import {db} from '../../firebase/Firebase'
import { doc, setDoc , serverTimestamp, collection, query, onSnapshot, where  } from "firebase/firestore"; 
import {v4} from 'uuid'
import Valid_Message from '../Asset/Valid_Message';

const MessageBox = ({isCoposed , user , userAuthor}) => {
  const [messageDetails, setMessageDetails] = useState({
    id: v4(),
    to: '',
    from: user?.email,
    subject: '',
    text: '',
    type: 'compose',
    favourite: 'false',
    important: 'false',
    deleted: 'false',
    viewedBy: [],
  })
  let interval;
const [closeModal, setcloseModal] = useState(false)
  const createNewMessage = async () => {
    if(user?.uid){
      if(messageDetails.text !== '' && messageDetails.to !== ''){
        const res = await setDoc(doc(db, "message", messageDetails.id), {
          ...messageDetails,
          publishedAt: serverTimestamp(),
          fromUserId: user?.uid,
        });
        console.log(res);
        setMessageDetails({
          id: v4(),
          to: '',
          from: user?.email,
          subject: '',
          text: '',
          type: 'compose',
        })
        setcloseModal(true)
        clearTimeout(interval)
        interval = setTimeout(() => {
          setcloseModal(false)
        }, 4000);
      }
    }
  }
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(user?.uid){
    setLoading(false)
    const refrence = collection(db, "user");
    const q = query(refrence, where("uid", "!=", user?.uid));
    const unsub = onSnapshot(q , (snapShot) => {
      let list = [];
      snapShot.docs.forEach(doc => {
        list.push({...doc.data()})
        setData(list)
    });
    console.log(list);
    setLoading(true)
    },
    (error) => {
      console.log(error);
    }
    );
    return () => {
      unsub();
    }
}
}, [user])
const directions = {
  bottom: '40px',
  left: '40px'
}
  return (
    <>
    {closeModal && (
    <Valid_Message directions={directions} message={"message sent"} type={'sent'} setcloseModal={setcloseModal}  />
    )}
    <div className='gmail_messageBox'>
      <div className="gmail_messageBox_header">
        new message
        <IoCloseOutline onClick={() => isCoposed(false)} />
      </div>
      <div className="gmail_msg_tab">
        {messageDetails.to === '' && (
        <span>To</span>
        )}
        <input type="text" value={messageDetails.to}  onChange={(e) => setMessageDetails({...messageDetails , to: e.target.value , from: user?.email, id: v4()})}/>
      </div>
      <div className="gmail_msg_tab">
        <input type="text" placeholder='Subject' value={messageDetails.subject} onChange={(e) => setMessageDetails({...messageDetails , subject: e.target.value})} />
      </div>
      <div className="gmail_msg_content">
        <textarea onChange={(e) => setMessageDetails({...messageDetails , text: e.target.value})} value={messageDetails.text}></textarea>
      </div>
      <div className="send_email">
      <button onClick={createNewMessage} disabled={(messageDetails.text === '' || messageDetails.to === '') || messageDetails.subject === ''}>send</button>
      </div>
    </div>
    </>
  )
}

export default MessageBox