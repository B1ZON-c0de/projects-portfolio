// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDkgd0AhOmdGo8pPw-g2WVc0HD2UKi9HBA',
  authDomain: 'vue-form-763cb.firebaseapp.com',
  projectId: 'vue-form-763cb',
  storageBucket: 'vue-form-763cb.firebasestorage.app',
  messagingSenderId: '57400930537',
  appId: '1:57400930537:web:21a5b4a2b01a98028e0078',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
