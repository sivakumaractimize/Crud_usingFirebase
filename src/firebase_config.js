// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0gmgomc7Vtn7l6144zheu0RYtPs7lshE",
  authDomain: "react-crud-dbffc.firebaseapp.com",
  projectId: "react-crud-dbffc",
  storageBucket: "react-crud-dbffc.appspot.com",
  messagingSenderId: "293424994965",
  appId: "1:293424994965:web:384e5bba7849b280d3599c",
  measurementId: "G-07Y4BBVC0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);