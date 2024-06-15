// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-jt5hhELV-NsUg4ziSjm-RSai4DfVLG8",
  authDomain: "movieshub-web-app.firebaseapp.com",
  projectId: "movieshub-web-app",
  storageBucket: "movieshub-web-app.appspot.com",
  messagingSenderId: "362757682128",
  appId: "1:362757682128:web:d5f9962e16ade04a97bfd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;