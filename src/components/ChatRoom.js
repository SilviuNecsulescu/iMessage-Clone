import React, { useState, useEffect } from "react";
import "./css/ChatRoom.css";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChatName, selectChatId } from "../features/chat/chatSlice";
import { firestore } from "./firebase";
import firebase from "firebase";
import { selectUser } from "../features/user/userSlice";
import FlipMove from "react-flip-move";

function ChatRoom() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);

  useEffect(() => {
    if (chatId) {
      firestore
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    }
  }, [chatId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    firestore.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });

    firestore
      .collection("chats")
      .doc(chatId)
      .update({ timestamp: firebase.firestore.FieldValue.serverTimestamp() });
    setInput("");
  };

  return (
    <div className="chatRoom">
      <div className="chatRoom__header">
        <h4>
          To : <span className="chatRoom__channelName">{chatName}</span>
        </h4>
      </div>
      <div className="chatRoom__body">
        <FlipMove>
          {messages &&
            messages.map(({ id, data }) => (
              <Message key={id} id={id} contents={data} />
            ))}
        </FlipMove>
      </div>
      <div className="chatRoom__input">
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="iMessage"
          ></input>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
