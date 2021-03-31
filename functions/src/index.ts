import { initializeApp } from 'firebase-admin';

initializeApp();

export { authUsersOnDelete } from './auth/users/onDelete';
export { firestoreUsersOnCreate } from './firestore/users/onCreate';
