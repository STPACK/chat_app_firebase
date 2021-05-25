import React, { useEffect, useState, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { fireStore } from "../firebase/index";

import ChatMessage from "./ChatMessage";
import sendIcon from "../assets/send-mail.png";
import "./Chat.css";

const Chat = ({ user = null }) => {
  const [newMessage, setNewMessage] = useState("");

  const messageRef = fireStore.collection("messages");
  const query = messageRef.orderBy("createdAt").limitToLast(50);
  const { uid, displayName, photoURL } = user;

  const [messages] = useCollectionData(query, { idField: "id" });

  const inputRef = useRef();
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      await messageRef.add({
        text: newMessage,
        createdAt: Date.now(),
        uid,
        displayName,
        photoURL,
      });
    }
    setNewMessage("");
  };

  return (
    <main className="main__container-chat">
      <section className="message__container">
        {messages &&
          messages.map((res) => (
            <ChatMessage key={res.id} messages={res} userUid={uid} />
          ))}
        <span ref={bottomRef} />
      </section>
      <section className="messageBox__container">
        <form onSubmit={submitHandler}>
          <input
            ref={inputRef}
            placeholder="Say something ..."
            className="messageBox-input"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="button-messageBox" >
            <img className="sent-icon" src={sendIcon} alt="send-icon" />
          </button>
        </form>
      </section>
    </main>
  );
};

export default Chat;
