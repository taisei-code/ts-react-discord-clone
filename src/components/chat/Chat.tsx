import React, { useEffect, useState } from 'react'
import "./Chat.scss";
import ChatHeader from './ChatHeader';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatMessage from './ChatMessage';
import { useAppSelector } from '../../app/hooks';
import { db } from '../../firebase';
import { CollectionReference, DocumentData, DocumentReference, Timestamp, addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { MessageSharp } from '@mui/icons-material';

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const Chat = () => {
  const [inputText, setInputText] = useState<string>("")
  const [messages, setMessagse] = useState<Messages[]>([]);
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    let collectionRef: CollectionReference<DocumentData> = collection(db, "channels", String(channelId), "messages");

    onSnapshot(collectionRef, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        })
      })
      setMessagse(results);
      console.log(results)
    })
  },[channelId])
  
  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // channelsコレクションの中にあるmessagesコレクションの中にメッセージ情報を入れる
    const collectionRef: CollectionReference<DocumentData> = collection(db, "channels", String(channelId), "messages");

    const docRef: DocumentReference<DocumentData> = await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });
    console.log(docRef);
  }

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chatMessage">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.message} timestamp={message.timestamp} user={message.user} />
        ))}
      </div>
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input
            type="text"
            placeholder="#Udemyへメッセージを送信"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
          />
          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          >
            送信
          </button>
        </form>

        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
}

export default Chat;