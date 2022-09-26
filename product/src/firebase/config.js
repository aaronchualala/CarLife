import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCw1wnM4V9IST5G-PXJPx_HNqCbgiScDkc',
  authDomain: 'fitbuds-2c818.firebaseapp.com',
  projectId: 'fitbuds-2c818',
  storageBucket: 'fitbuds-2c818.appspot.com',
  messagingSenderId: '37031469751',
  appId: '1:37031469751:web:6128e5e6af033f5e7c2332',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
