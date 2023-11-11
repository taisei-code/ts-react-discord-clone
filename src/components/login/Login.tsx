import React from 'react'
import "./Login.scss";

import reactIcon from "../sidebar/react.svg";
import { Button } from "@mui/material";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';

const Login = () => {

  const signIn = () => {
    signInWithPopup(auth, provider)
      .catch((err) => alert(err.message));
  };
  console.log(auth)
  return (
    <div className='login'>
      <div className='loginLogo'>
        <img src={reactIcon} alt="" />
      </div>
      <Button onClick={signIn}>ログイン</Button>
    </div>
  )
}

export default Login