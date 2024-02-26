import React, { useState } from "react";
import { motion } from "framer-motion";
import userpic from "../Home/Home_assest/user.png";
import { TfiAngleRight, TfiClose } from "react-icons/tfi";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/Firebase";

const RegisterLog = ({ setuser, isOpen, user }) => {
  const [loginemail, setloginemail] = useState("");
  const [loginpw, setloginpw] = useState("");
  const [registeremail, setemail] = useState("");
  const [registerpw, setpw] = useState("");
  const [confirmpw, setconfirmpw] = useState("");
  const [logState, setLogState] = useState(false);
  const [errorHandler, setError] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registeremail,
        registerpw
      );
      console.log(user);
    } catch (error) {
      console.log(error?.message);
      setError(error?.code);
      console.log(error?.code);
    }
  };
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginemail, loginpw);
      console.log(user);
    } catch (error) {
      console.log(error?.message);
      setError(error?.code);
      console.log(error?.code);
    }
  };

  function handleError() {
    switch (errorHandler) {
      case "auth/email-already-in-use":
        return "This email is already in use";
        break;
      case "auth/invalid-email":
        return "Invalid email";
        break;
      case "auth/missing-password":
        return "Password is mandatory";
        break;
      case "auth/missing-email":
        return "Email is mandatory";
        break;
      case "auth/weak-password":
        return "Password must be atleast 6 characters.";
        break;
      case "auth/wrong-password":
        return "Wrong password.";
        break;
      default:
        return errorHandler;
        break;
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="registerLog"
    >
      <div className="registerLogHolder">
        <div className="swipe_right" onClick={() => setLogState(!logState)}>
          <p>Register</p>
          <TfiAngleRight />
        </div>
        {logState ? (
          <>
            <img src={userpic} alt="user" className="log_user_icon" />
            <input
              type="text"
              onChange={(e) => setemail(e.target.value)}
              value={registeremail}
              placeholder="Email"
            />
            <input
              type="password"
              onChange={(e) => setpw(e.target.value)}
              value={registerpw}
              placeholder="password"
            />
            <input type="password" placeholder="confirm password" onChange={(e) => setconfirmpw(e.target.value)} value={confirmpw} />
            <button onClick={register} className="loginBtn">
              register
            </button>
            <span>{handleError()}</span>
          </>
        ) : (
          <>
            <img src={userpic} alt="user" className="log_user_icon" />
            <input
              type="text"
              placeholder="enter email"
              onChange={(e) => setloginemail(e.target.value)}
              value={loginemail}
            />
            <input
              type="password"
              placeholder="enter password"
              onChange={(e) => setloginpw(e.target.value)}
              value={loginpw}
            />
            <button onClick={login} className="loginBtn">
              log in
            </button>
            <span>{handleError()}</span>
          </>
        )}
      </div>

      <div className="closeHandler" onClick={() => isOpen(false)}>
        <div className="close_circle">
          <TfiClose />
        </div>
        <p>cancel</p>
      </div>
    </motion.div>
  );
};

export default RegisterLog;
