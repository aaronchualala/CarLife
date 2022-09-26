import {initializeApp} from 'firebase/app';
import {initializeAuth} from 'firebase/auth/react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore';
import {getFunctions, httpsCallable} from 'firebase/functions';

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
export const auth = initializeAuth(app);
export const db = getFirestore(app);

const functions = getFunctions(app);

// tests
export const helloWorld = httpsCallable(functions, 'helloWorld');
export const addMessage = httpsCallable(functions, 'addMessage');
export const makeUppercase = httpsCallable(functions, 'makeUppercase');

// exercises
export const genCoreEx = httpsCallable(functions, 'genCoreEx');
export const genRelEx = httpsCallable(functions, 'genRelEx');
export const genRelExInfo = httpsCallable(functions, 'genRelExInfo');
export const genScore = httpsCallable(functions, 'genScore');

// venues
export const findNearbyUsers = httpsCallable(functions, 'findNearbyUsers');
export const findNearestFCC = httpsCallable(functions, 'findNearestFCC');
export const findNearestGymAndPark = httpsCallable(
  functions,
  'findNearestGymAndPark',
);
