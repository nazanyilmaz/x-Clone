// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASJJM2u-ByPbunCfnaRP5gDTqknWPdWwk",
  authDomain: "x-clone-d317b.firebaseapp.com",
  projectId: "x-clone-d317b",
  storageBucket: "x-clone-d317b.appspot.com",
  messagingSenderId: "723882903132",
  appId: "1:723882903132:web:083ae234834de365ff8899",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize firebase/auth
export const auth = getAuth(app);

//Google saglayicisini kurma
export const provider = new GoogleAuthProvider();

//veri tabani referansi alma
export const db = getFirestore(app);

//dosya yukleme alani referansini alma
export const storage = getStorage(app);
