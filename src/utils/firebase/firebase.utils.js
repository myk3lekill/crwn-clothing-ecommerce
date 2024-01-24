// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEBqKb-V9QmobPpgGsZFqNGjhWAS-EbhQ",
  authDomain: "crown-db-528a1.firebaseapp.com",
  projectId: "crown-db-528a1",
  storageBucket: "crown-db-528a1.appspot.com",
  messagingSenderId: "750263376741",
  appId: "1:750263376741:web:975a0652179d8aec389f8c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inizialize Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

