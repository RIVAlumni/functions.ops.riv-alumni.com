import { initializeApp } from 'firebase-admin';

initializeApp();

export { firestoreUsersOnCreate } from './firestore/users/onCreate';
