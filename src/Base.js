import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBEJTExs6OVM5kt-FRHy7a1mk1IgZt1NJA",
  authDomain: "lsetf-project-2c225.firebaseapp.com",
  projectId: "lsetf-project-2c225",
  storageBucket: "lsetf-project-2c225.appspot.com",
  messagingSenderId: "119692083932",
  appId: "1:119692083932:web:ca4d61a101ca4efdd3ea19"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);