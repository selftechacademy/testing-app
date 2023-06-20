// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABYR9l2hmopWHo6QZh69VzSCiaUFe0Vyo",
  authDomain: "fir-todo-5cd11.firebaseapp.com",
  projectId: "fir-todo-5cd11",
  storageBucket: "fir-todo-5cd11.appspot.com",
  messagingSenderId: "822930349310",
  appId: "1:822930349310:web:dfd6a9484b35ff8e0d99af",
  measurementId: "G-RG0SRZN9KD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//From here is us adding stuff
//we are getting access to firestore database
export const db = getFirestore(app);

//auth
export const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

//sign in the user
export const signInWithEmail = async (email, password) => {
  if (!email && !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

//it listens for users if they are signed in
export const userStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

//signs out the user
export const SignOutUser = async () => await signOut(auth);

//Create user
export const createNewUser = async (email, password) => {
  if (!email && !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
