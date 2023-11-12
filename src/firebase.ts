
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBCyA8TcbH5l-xBHsfrdpNMz65E23BUuRo",
  authDomain: "ts-react-discord-37fab.firebaseapp.com",
  projectId: "ts-react-discord-37fab",
  storageBucket: "ts-react-discord-37fab.appspot.com",
  messagingSenderId: "886199091276",
  appId: "1:886199091276:web:92b3b14d9791fbf05bf4e9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db }
