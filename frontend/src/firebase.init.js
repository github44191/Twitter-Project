
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbRCKUPj7RZRlEwfBM2pBJKwLW6DcVrUw",
  authDomain: "twitter-project-ae3ab.firebaseapp.com",
  projectId: "twitter-project-ae3ab",
  storageBucket: "twitter-project-ae3ab.appspot.com",
  messagingSenderId: "920424141424",
  appId: "1:920424141424:web:5c82f0ffceb6761e9f9ab5",
  measurementId: "G-306P9SVQE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;