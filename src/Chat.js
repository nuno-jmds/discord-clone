import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import EmojiEmotionsRoundedIcon from "@material-ui/icons/EmojiEmotionsRounded";
import GifRoundedIcon from "@material-ui/icons/GifRounded";
import CardGiftcardRoundedIcon from "@material-ui/icons/CardGiftcardRounded";
import { useSelector } from "react-redux";
import { selectuser } from "./features/userSlice";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import db from "./firebase";
import firebase from "firebase";

function Chat() {
  const user = useSelector(selectuser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    }
  }, [channelId]);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user,
    });
    setInput("");
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      {/**Headder */}
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message_data) => (
          <Message
            key={message_data.id}
            message={message_data.data.message}
            user={message_data.data.user}
            timestamp={message_data.data.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat__input">
        <AddCircleRoundedIcon fontSize="large" />
        <form>
          <input
            placeholder="Message #Youtube"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!channelId}
          />
          <button
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardRoundedIcon />
          <GifRoundedIcon />
          <EmojiEmotionsRoundedIcon />
        </div>
      </div>
    </div>
  );
}

export default Chat;
