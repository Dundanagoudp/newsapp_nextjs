import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmfgHuF6W2rNsuNavvyG4tdZXb6ngSfAI",
  authDomain: "popandpose-1ea69.firebaseapp.com",
  projectId: "popandpose-1ea69",
  storageBucket: "popandpose-1ea69.firebasestorage.app",
  messagingSenderId: "357398841892",
  appId: "1:357398841892:web:73efee602c27f8c93a66b1",
  measurementId: "G-HP0E1SYS24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service
export const storage = getStorage(app);