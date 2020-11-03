import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQntFLSuzpMuamdD1Sw6nJeS6OJHrTz1E",
  authDomain: "imessage-clone-73fff.firebaseapp.com",
  databaseURL: "https://imessage-clone-73fff.firebaseio.com",
  projectId: "imessage-clone-73fff",
  storageBucket: "imessage-clone-73fff.appspot.com",
  messagingSenderId: "407510181606",
  appId: "1:407510181606:web:4de77124382ddf1068bd27",
  measurementId: "G-WYE0N65GMY",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, firestore };
export default firebase;
