// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgBUGdrtoyTGDRM9nEBTM-YaxrL1eKlHA",
  authDomain: "todo-list-app-99a25.firebaseapp.com",
  projectId: "todo-list-app-99a25",
  storageBucket: "todo-list-app-99a25.appspot.com",
  messagingSenderId: "917504031165",
  appId: "1:917504031165:web:b7d3aec12ed229dc067ad4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
