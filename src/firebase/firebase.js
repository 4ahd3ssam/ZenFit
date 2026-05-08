import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "../store/authStore";

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
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const authListener = () => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const ref = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        useAuthStore.setState({
          user: snap.data(),
        });
      }
    } else {
      useAuthStore.setState({
        user: null,
      });
    }
  });
};