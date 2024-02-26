import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBtXmhg-hn5iShYWPTEIC5kY2KXxzPfcRs",
  authDomain: "windows10-cd399.firebaseapp.com",
  projectId: "windows10-cd399",
  storageBucket: "windows10-cd399.appspot.com",
  messagingSenderId: "415513011751",
  appId: "1:415513011751:web:2911ea0eeb68cfe4709002"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
