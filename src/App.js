import React, { useEffect } from "react";
import "./components/css/App.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/user/userSlice";
import Login from "./components/Login";
import Imessage from "./components/Imessage";
import { auth } from "./components/firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return <div className="app">{user ? <Imessage /> : <Login />}</div>;
}

export default App;
