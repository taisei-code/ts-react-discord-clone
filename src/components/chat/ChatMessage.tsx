import React from 'react'
import "./ChatMessage.scss"
import { Avatar } from '@mui/material';

const ChatMessage = () => {
  return (
    <div className="message">
      <Avatar />
      <div className='messageInfo'>
        <h4>
          Shin Code
          <span className='messageTimestamp'>2023/1/1</span>
        </h4>
      </div>
    </div>
  );
}

export default ChatMessage