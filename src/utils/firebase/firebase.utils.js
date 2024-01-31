// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
    prompt: "select_account",
    
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

// Firestone Database interaction
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists())

  // Save doc into firebase database
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log('error catching the user', error.message);
    }
  }
  return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) {
    return //exit
  } else {
  return await createUserWithEmailAndPassword(auth, email, password)
  }
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) {
    return //exit
  } else {
  return await signInWithEmailAndPassword(auth, email, password)
  }
};

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

