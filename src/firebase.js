// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'; // Importing getDatabase function
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7eZgPPVEH3lc1BymaF3F21hED2rO2vWM",
    authDomain: "snack-attack-29641.firebaseapp.com",
    databaseURL: "https://snack-attack-29641-default-rtdb.firebaseio.com", // Make sure this is correct
    projectId: "snack-attack-29641",
    storageBucket: "snack-attack-29641.appspot.com",
    messagingSenderId: "625891413415",
    appId: "1:625891413415:web:b86784b5fbc8842783ba82",
    measurementId: "G-DC5EBRW56J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export the database
const database = getDatabase(app);

export { database };