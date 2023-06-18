
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from '@firebase/firestore'
import { getAuth } from '@firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyD4gzEw6At-ZTBUCCe0vgTLRQW8AAK4BY0",
  authDomain: "hypepueba.firebaseapp.com",
  projectId: "hypepueba",
  storageBucket: "hypepueba.appspot.com",
  messagingSenderId: "233126625541",
  appId: "1:233126625541:web:62eebcb95bc6add9b3b76c"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app);
export const auth = getAuth(app)
