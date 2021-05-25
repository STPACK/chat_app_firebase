import React from "react";
import moment from "moment";

import "./ChatMessage.css";

const ChatMessage = (props) => {
  const { text, uid, displayName, photoURL, createdAt } =
    props.messages;
  const time = moment(createdAt).fromNow();
  return (
    <div className={`chatMessage ${uid === props.userUid ? "sent" : "received"}`}>
      <img className="chatMessage-img" src={photoURL} alt="avatar" />
      <div className="chatMessage-text">
        <div className="chatMessage-text-title">
          <p>{displayName}</p>
          <span>{time}</span>
        </div>
        <div className="chatMessage-text-text">
          {text}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatMessage);
