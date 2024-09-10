// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGzsCUgPdnMcQd5cbRTHpROKBeM0b6nZk",
    authDomain: "fir-saas-8e546.firebaseapp.com",
    projectId: "fir-saas-8e546",
    storageBucket: "fir-saas-8e546.appspot.com",
    messagingSenderId: "56880284310",
    appId: "1:56880284310:web:37728ca618088854de38b7",
    measurementId: "G-L7Q1RB98YY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);