/* Configuration file for our Firestore DB. It attaches this program to the DB. */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnp8KAoboFCRWyOnC0yQDhDr7QVkQXfVw",
  authDomain: "productivity-fire.firebaseapp.com",
  projectId: "productivity-fire",
  storageBucket: "productivity-fire.appspot.com",
  messagingSenderId: "980729427699",
  appId: "1:980729427699:web:43d7e33ebcbb7895596986"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// I have to export this to access it elsewhere
export const db = getFirestore(app);