import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrMGO7Q2RVERqBXQnvsAhLVMRVUenDmNA",
  authDomain: "musicgoferdev.firebaseapp.com",
  projectId: "musicgoferdev",
  storageBucket: "musicgoferdev.appspot.com",
  messagingSenderId: "219098596865",
  appId: "1:219098596865:web:fe6802e028a0a69c9a6200"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export const usersRef = ref(storage, 'users');
export default app;
 