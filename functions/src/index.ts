import { initializeApp } from 'firebase-admin';

initializeApp();

/**
 * Firebase Authentication Listeners
 */
export { authUsersOnCreate } from './auth/users/onCreate';
export { authUsersOnDelete } from './auth/users/onDelete';

/**
 * Firestore Document Listeners
 */
export { firestoreUsersOnCreate } from './firestore/users/onCreate';
export { firestoreMembersOnCreate } from './firestore/members/onCreate';
export { firestoreMembersOnDelete } from './firestore/members/onDelete';
export { firestoreEventsOnCreate } from './firestore/events/onCreate';
