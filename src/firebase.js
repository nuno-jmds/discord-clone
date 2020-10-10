import firebase from "firebase";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBTN0qWLs5hRIHpP-IO_Hlj7nxFJFcTmPk",
  authDomain: "multi-project-0.firebaseapp.com",
  databaseURL: "https://multi-project-0.firebaseio.com",
  projectId: "multi-project-0",
  storageBucket: "multi-project-0.appspot.com",
  messagingSenderId: "154677185904",
  appId: "1:154677185904:web:ee443a1e49092c551453b5",
  measurementId: "G-EBLQPKL884",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
