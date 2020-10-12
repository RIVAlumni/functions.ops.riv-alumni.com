import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import {
  onCreateUser,
  onCreateMember,
  onCreateEvent,
  onCreateParticipation,
  onCreateUserAggregation,
} from './onCreate';

import { onDeleteUser, onDeleteUserAggregation } from './onDelete';

/**
 * Initializes the entire `firebase-admin` library for use.
 *
 * @remarks
 * `databaseURL` is required to be set in order for Realtime Database services
 * to function properly. Removing it will result in function-wide failures.
 */
admin.initializeApp({
  databaseURL: 'https://rivalumniops.firebaseio.com',
});

/**
 * Realtime references the Firebase Realtime Database for operations.
 */
const realtime = admin.database();

/**
 * Firestore references the Firebase Firestore Database for operations.
 */
const firestore = admin.firestore();

/**
 * DEPLOYMENT_REGION states the location of the deployed functions.
 */
const DEPLOYMENT_REGION = 'asia-east2';

/**
 * onCreate Events
 */

export const createUser = functions
  .region(DEPLOYMENT_REGION)
  .auth.user()
  .onCreate((user, ctx) => onCreateUser(user, ctx, firestore));

export const createMember = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document('members/{docId}')
  .onCreate((snap, ctx) => onCreateMember(snap, ctx, firestore));

export const createEvent = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document('events/{docId}')
  .onCreate((snap, ctx) => onCreateEvent(snap, ctx, firestore));

export const createParticipation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document('participations/{docId}')
  .onCreate((snap, ctx) => onCreateParticipation(snap, ctx, firestore));

/**
 * onCreate Aggregation Events
 *
 * @remarks
 * Note: Aggregation functions usually consist of using Realtime DB
 *       and Firestore to aggregate data. Check function paramter types
 *       to verify where the data is being sent towards.
 */

export const createUserAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document('users/{docId}')
  .onCreate((snap, ctx) => onCreateUserAggregation(snap, ctx, realtime));

/**
 * onDelete Events
 */

export const deleteUser = functions
  .region(DEPLOYMENT_REGION)
  .auth.user()
  .onDelete((user, ctx) => onDeleteUser(user, ctx, firestore));

/**
 * onDelete Aggregation Events
 */

export const deleteUserAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document('users/{docId}')
  .onDelete((snap, ctx) => onDeleteUserAggregation(snap, ctx, realtime));

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
