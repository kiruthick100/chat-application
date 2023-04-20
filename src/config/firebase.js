// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite";
 
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTEH1ctLg74TWQkCbMWDoTNzJptxFv5hg",
  authDomain: "social-media-9edaf.firebaseapp.com",
  projectId: "social-media-9edaf",
  storageBucket: "social-media-9edaf.appspot.com",
  messagingSenderId: "1004115534587",
  appId: "1:1004115534587:web:6dcb06798715f7f5cdc65e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export  const db=getFirestore(app);

export const storage = getStorage(app);