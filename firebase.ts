import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXVvQSR22ZGhneYz17qB21qxUNXo4Ohe4",
  authDomain: "expo-navigation.firebaseapp.com",
  projectId: "expo-navigation",
  storageBucket: "expo-navigation.appspot.com",
  messagingSenderId: "734218883408",
  appId: "1:734218883408:web:d988b65fded9b81c495c55",
};

const app = firebase.initializeApp(firebaseConfig);
const fireDB = app.firestore();
const auth = app.auth();
export { app, fireDB, auth };
