import React, { useState } from 'react'

import { auth } from '../../firebase/Firebase'
import { updateProfile  , sendEmailVerification} from "firebase/auth";
import Valid_Message from '../Asset/Valid_Message';

const Privacy = () => {
const [closeModal, setcloseModal] = useState(false)
  let interval;
  const update_Profile = () => {
    updateProfile(auth.currentUser, {
      displayName: "Bayern", photoURL: null
    }).then(() => {
      setcloseModal(true)
      clearTimeout(interval)
      interval = setTimeout(() => {
        setcloseModal(false)
      }, 4000);
    }).catch((error) => {
      console.log(error);
    });
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log('sent');
    // Email verification sent!
    // ...
  });
  }
  const directions = {
    bottom: '40px',
    left: '40px'
  }
  return (
    <div>
          {closeModal && (
    <Valid_Message directions={directions} message={"profile updated"} type={'valid'} setcloseModal={setcloseModal}  />
    )}
      <button onClick={update_Profile}>update profile</button>
      <br />
      <button onClick={verifyEmail}>send verification email</button>
    </div>
  )
}

export default Privacy