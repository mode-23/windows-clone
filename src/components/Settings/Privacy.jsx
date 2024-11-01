import React, { useState, useContext } from "react";
import { auth, db } from "../../firebase/Firebase";
import { updateProfile, sendEmailVerification } from "firebase/auth";
import Valid_Message from "../Asset/Valid_Message";
import { updateDoc } from "firebase/firestore";
import { userContext } from "../../Context/UserContext";
import { LuChevronRight } from "react-icons/lu";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";

const Privacy = () => {
  const { user } = useContext(userContext);
  const [closeModal, setcloseModal] = useState(false);
  const [userName, setUserName] = useState("");
  let interval;
  const update_db = async () => {
    const DocRef = doc(db, "user", user?.uid);
    await updateDoc(DocRef, {
      displayName: userName,
    });
  };
  const update_Profile = () => {
    if (user?.uid && userName) {
      update_db();
      updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: null,
      })
        .then(() => {
          setcloseModal(true);
          clearTimeout(interval);
          interval = setTimeout(() => {
            setcloseModal(false);
          }, 4000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("sent");
      // Email verification sent!
      // ...
    });
  };
  const directions = {
    bottom: "40px",
    left: "40px",
  };
  return (
    <div>
      {closeModal && (
        <Valid_Message
          directions={directions}
          message={"profile updated"}
          type={"valid"}
          setcloseModal={setcloseModal}
        />
      )}
      <div className="settings_header">
        <ul className="df">
          <li className="df">
            <IoHomeOutline /> Home
          </li>
          <li className="df chevron">
            <LuChevronRight />
          </li>
          <li className="df">
            <IoSettingsOutline /> Settings
          </li>
          <li className="df chevron">
            <LuChevronRight />
          </li>
          <li className="df active">Privacy</li>
        </ul>
      </div>
      {/* <button onClick={update_Profile}>update profile</button>
      <br />
      <button onClick={verifyEmail}>send verification email</button> */}
    </div>
  );
};

export default Privacy;
