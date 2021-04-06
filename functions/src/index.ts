import { initializeApp } from 'firebase-admin';

initializeApp();

export { authUsersOnCreate } from './auth/users/onCreate';
export { authUsersOnDelete } from './auth/users/onDelete';
export { firestoreUsersOnCreate } from './firestore/users/onCreate';
