import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBs1XQe1n_o1xmNwxqIX5YogSSOKi15HvY",
    authDomain: "fir-crud-app-555da.firebaseapp.com",
    projectId: "fir-crud-app-555da",
    storageBucket: "fir-crud-app-555da.appspot.com",
    messagingSenderId: "391438405172",
    appId: "1:391438405172:web:61f6fe9413caf11cdcc461",
    measurementId: "G-TK5YB78GL6"
  };

  const app =initializeApp(firebaseConfig);
  export const db = getFirestore(app);

