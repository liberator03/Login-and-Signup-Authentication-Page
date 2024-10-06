import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"; // <-- Add this import for Firestore
import "firebase/compat/storage"; // <-- Add this import for Storage

const firebaseConfig = {
    apiKey: "AIzaSyCxf8FMjyR7h_Mmh1Md4jM5_eh0B4SoAAM",
    authDomain: "class-management-system-258d6.firebaseapp.com",
    projectId: "class-management-system-258d6",
    storageBucket: "class-management-system-258d6.appspot.com",
    messagingSenderId: "548077270595",
    appId: "1:548077270595:web:607a670d666537be0a86f6",
    measurementId: "G-GZQ85C2MW4"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore(); // Now Firestore should work
export const storage = firebase.storage();
