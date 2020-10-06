import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAbFqDhOud4cy62RWKRdBx-C2lvjV3aPPQ",
  authDomain: "designathon81189.firebaseapp.com",
  databaseURL: "https://designathon81189.firebaseio.com",
  projectId: "designathon81189",
  storageBucket: "designathon81189.appspot.com",
  messagingSenderId: "1057347359384",
  appId: "1:1057347359384:web:9fcb0636f5ab29b49d36ed",
  measurementId: "G-N8G8JX5L8E"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export  {db, auth};