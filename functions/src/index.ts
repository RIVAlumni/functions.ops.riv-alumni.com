import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import {
  onCreateUser,
  onCreateMember,
  onCreateEvent,
  onCreateParticipation
} from './onCreate';

import { onDeleteUser } from './onDelete';

/**
 * Initializes the entire `firebase-admin` library for use.
 */
admin.initializeApp();

/**
 * Firestore references the Firebase Firestore Database for operations.
 */
const firestore = admin.firestore();

/**
 * DEPLOYMENT_REGION states the location of the deployed function.
 */
const DEPLOYMENT_REGION = 'asia-east2';

/**
 * DEPLOYMENT_SETTINGS states the resource allocation of the deployed function.
 */
const DEPLOYMENT_SETTINGS: functions.DeploymentOptions = {
  memory: '1GB'
};

/**
 * onCreate Events
 */

export const createUser = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .auth.user()
  .onCreate((user, ctx) => onCreateUser(user, ctx, firestore));

export const createMember = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('members/{docId}')
  .onCreate((snap, ctx) => onCreateMember(snap, ctx, firestore));

export const createEvent = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('events/{docId}')
  .onCreate((snap, ctx) => onCreateEvent(snap, ctx, firestore));

export const createParticipation = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
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

// export const createUserAggregation = functions
//   .region(DEPLOYMENT_REGION)
//   .firestore.document('users/{docId}')
//   .onCreate((snap, ctx) => onCreateUserAggregation(snap, ctx, realtime));

/**
 * onDelete Events
 */

export const deleteUser = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .auth.user()
  .onDelete((user, ctx) => onDeleteUser(user, ctx, firestore));

/**
 * onDelete Aggregation Events
 */

// export const deleteUserAggregation = functions
//   .region(DEPLOYMENT_REGION)
//   .firestore.document('users/{docId}')
//   .onDelete((snap, ctx) => onDeleteUserAggregation(snap, ctx, realtime));

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
