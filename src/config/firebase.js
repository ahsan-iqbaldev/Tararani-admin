import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyARh11-L7nTbZMLepWJLyAb5JqDVqA1dfU",
  authDomain: "tararani-cc5a5.firebaseapp.com",
  projectId: "tararani-cc5a5",
  storageBucket: "tararani-cc5a5.appspot.com",
  messagingSenderId: "322977379882",
  appId: "1:322977379882:web:8e84e0a2c072b1e0c4f553",
  measurementId: "G-8YKQ75QGST"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
