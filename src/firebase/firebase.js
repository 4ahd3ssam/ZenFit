// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfrTOPzSuv_xwKnvXmSgQz0VokPTLmbaw",
  authDomain: "zenfit-6410a.firebaseapp.com",
  projectId: "zenfit-6410a",
  storageBucket: "zenfit-6410a.firebasestorage.app",
  messagingSenderId: "1082327499460",
  appId: "1:1082327499460:web:dbdac3027c1a7ad0867f91",
  measurementId: "G-6K8J9B09EP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);