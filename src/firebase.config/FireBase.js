
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from '@firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyCN1yx3SdXlvKz7oCIt9jmD6Lo4Yod1pfo",
  authDomain: "hype-84921.firebaseapp.com",
  projectId: "hype-84921",
  storageBucket: "hype-84921.appspot.com",
  messagingSenderId: "597730441156",
  appId: "1:597730441156:web:daa8d897c26e45dc3d9691"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app);

