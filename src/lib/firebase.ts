import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPLcgqoAOKM3J__Grk7a0lygcMXZ97glo",
  authDomain: "logichess-b55af.firebaseapp.com",
  databaseURL:
    "https://logichess-b55af-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "logichess-b55af",
  storageBucket: "logichess-b55af.appspot.com",
  messagingSenderId: "1059982282051",
  appId: "1:1059982282051:web:a73b309e107298104973f6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const dbRef = ref(db);
export const gamesRef = (gameID?: string) => ref(db, `/games/${gameID}`);
export const usersRef = (userID?: string) => ref(db, `/users/${userID}`);
export const chatsRef = (chatID?: string) => ref(db, `/chats/${chatID}`);
