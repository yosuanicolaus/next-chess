import { initializeApp } from "firebase/app";
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
const db = getDatabase(app);

export const gamesRef = ref(db, "games");
export const usersRef = ref(db, "users");
export const chatsRef = ref(db, "chats");
