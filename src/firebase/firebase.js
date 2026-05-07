import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCfrTOPzSuv_xwKnvXmSgQz0VokPTLmbaw",
  authDomain: "zenfit-6410a.firebaseapp.com",
  projectId: "zenfit-6410a",
  storageBucket: "zenfit-6410a.firebasestorage.app",
  messagingSenderId: "1082327499460",
  appId: "1:1082327499460:web:dbdac3027c1a7ad0867f91",
  measurementId: "G-6K8J9B09EP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
