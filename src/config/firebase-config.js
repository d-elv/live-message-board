// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2Oap4rieIugWlwL8G-_5bztJXjYqxJJA",
  authDomain: "mud-message-board.firebaseapp.com",
  projectId: "mud-message-board",
  storageBucket: "mud-message-board.appspot.com",
  messagingSenderId: "992152800359",
  appId: "1:992152800359:web:bbb662082f575a78b498c2",
  measurementId: "G-017X4KMY8R",
  storageBucket: "gs://mud-message-board.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore();
export const storage = getStorage();

// firebase login
// firebase init
// firebase deploy