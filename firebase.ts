// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAoJoy95bnd8YRGDm5JFX_aHl1ITmnUJbQ',
  authDomain: 'nextflix-17485.firebaseapp.com',
  projectId: 'nextflix-17485',
  storageBucket: 'nextflix-17485.appspot.com',
  messagingSenderId: '432310335318',
  appId: '1:432310335318:web:dd878d1b2551b0e82648f7',
  measurementId: 'G-13MG21023B',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const analytics = getAnalytics(app);

export default app;
export { analytics, db };
