// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0I3wm8Xb_IJt0wyKruWNFlwyyO6bPJOU",
  authDomain: "codemasteryhub-c93e6.firebaseapp.com",
  projectId: "codemasteryhub-c93e6",
  storageBucket: "codemasteryhub-c93e6.firebasestorage.app",
  messagingSenderId: "568164147323",
  appId: "1:568164147323:web:d74c95d11c47cd024742de",
  measurementId: "G-GTSZR5LGWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);