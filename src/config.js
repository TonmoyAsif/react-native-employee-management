import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0vhYZp-SaxH-G3g4BZUb156eOSHt1swA",
  authDomain: "employee-management-rn.firebaseapp.com",
  projectId: "employee-management-rn",
  storageBucket: "employee-management-rn.appspot.com",
  messagingSenderId: "337654690117",
  appId: "1:337654690117:web:403d4a150a404be1d90e2c"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
