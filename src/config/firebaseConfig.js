import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdxQvRJiQoLkMaRz7v_1BzS2cDb9CzT50",
  authDomain: "popumusic-52751.firebaseapp.com",
  projectId: "popumusic-52751",
  storageBucket: "popumusic-52751.appspot.com",
  messagingSenderId: "127057835959",
  appId: "1:127057835959:web:5545ae76b8f03fd4a71a32"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };