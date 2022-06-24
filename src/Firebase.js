import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const adminApp = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY_ADMIN,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_ADMIN,
  projectId:process.env.REACT_APP_PROJECT_ID_ADMIN,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_ADMIN,
  messagingSenderId: process.env.REACT_APP_SENDER_ID_ADMIN,
  appId: process.env.REACT_APP_APP_ID_ADMIN
});
const artistApp = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY ,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId:process.env.REACT_APP_PROJECT_ID ,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}, "secondary");


export const adminAuth = getAuth(adminApp)
export const artistAuth = getAuth(artistApp)
export const storage = getStorage(adminApp)

