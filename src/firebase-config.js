import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGkTNuXHQG9qHfTarWjYmARydfNGYxMm8",
  authDomain: "mypinterest-350113.firebaseapp.com",
  projectId: "mypinterest-350113",
  storageBucket: "mypinterest-350113.appspot.com",
  messagingSenderId: "179164959903",
  appId: "1:179164959903:web:04b37c37ff62e17cb3feaa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
