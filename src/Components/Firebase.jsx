// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChPghq2Ovm--csPX3_DJkSvxQWcSrcclw",
    authDomain: "project-f8b03.firebaseapp.com",
    projectId: "project-f8b03",
    storageBucket: "project-f8b03.firebasestorage.app",
    messagingSenderId: "798566747869",
    appId: "1:798566747869:web:53b8ad801b6cd346039534",
    measurementId: "G-KCSNNW9WVS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 

//Export the App
export default app;
