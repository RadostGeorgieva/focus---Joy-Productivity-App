// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBALZZG2jBc16ONn5SnVP1tnpa1xdq_t1U",
  authDomain: "focusandjoy-61c00.firebaseapp.com",
  projectId: "focusandjoy-61c00",
  storageBucket: "focusandjoy-61c00.firebasestorage.app",
  messagingSenderId: "840714497803",
  appId: "1:840714497803:web:a65518a3aeab1f1d7b7c0e",
  measurementId: "G-BR7PJYRMYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);