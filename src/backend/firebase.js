// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgm3nMyInGrOiClTorVKY_i5c6A9HGZuQ",
  authDomain: "project-def2a.firebaseapp.com",
  projectId: "project-def2a",
  storageBucket: "project-def2a.appspot.com",
  messagingSenderId: "503238475876",
  appId: "1:503238475876:web:cd3c4deb9074f91b8bdf71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;