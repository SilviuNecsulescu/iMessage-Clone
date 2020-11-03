import React, { useState, useEffect } from "react";
import "./css/Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "./SidebarChat";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { auth, firestore } from "./firebase";
import firebase from "firebase";
import { setChat } from "../features/chat/chatSlice";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    firestore
      .collection("chats")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            timestamp: doc.data().timestamp?.toDate(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    dispatch(
      setChat({
        chatId: chats[0]?.id,
        chatName: chats[0]?.data.chatName,
      })
    );
  });

  const addChat = () => {
    const chatName = prompt("Please enter the chat name");
    if (chatName) {
      firestore.collection("chats").add({
        chatName: chatName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.data.chatName.includes(search)
  );

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar__avatar"
        />
        <div className="sidebar__search">
          <SearchIcon />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          ></input>
        </div>
        <IconButton onClick={addChat} className="sidebar__newChat">
          <RateReviewOutlinedIcon />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {filteredChats &&
          filteredChats.map(({ id, timestamp, data: { chatName } }) => (
            <SidebarChat
              key={id}
              id={id}
              chatName={chatName}
              timestamp={timestamp}
            />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
