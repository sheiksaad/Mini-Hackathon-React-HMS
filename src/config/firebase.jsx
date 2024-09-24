// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAObNYRlh2Cs-DwQ_67jiaMrh4ELIXXvUw",
  authDomain: "mini-hackathon-1b06a.firebaseapp.com",
  projectId: "mini-hackathon-1b06a",
  storageBucket: "mini-hackathon-1b06a.appspot.com",
  messagingSenderId: "777047487443",
  appId: "1:777047487443:web:d68da2a2c1d8de1689f526",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const dataBase = getFirestore(app);

export { auth, dataBase };
