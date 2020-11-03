import React, { useState, useEffect } from "react";
import "./css/SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setChat } from "../features/chat/chatSlice";
import { firestore } from "./firebase";
import Moment from "react-moment";

function SidebarChat({ id, chatName, timestamp }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    firestore
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      onClick={() => {
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        );
      }}
      className="sidebarChat"
    >
      <Avatar src={chatInfo[0]?.photo} className="sidebarChat__avatar" />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message ? chatInfo[0].message : "No messages yet"}</p>
        <small>
          {timestamp === "Invalid Date" ? (
            "Updating..."
          ) : (
            <Moment fromNow>{timestamp}</Moment>
          )}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
