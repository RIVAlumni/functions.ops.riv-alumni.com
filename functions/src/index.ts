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

admin.initializeApp({
  databaseURL: 'https://rivalumniops.firebaseio.com',
});

const realtime = admin.database();
const firestore = admin.firestore();
const DEPLOYMENT_REGION = 'asia-east2';

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

export const createUserAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document('users/{docId}')
  .onCreate((snap, ctx) => onCreateUserAggregation(snap, ctx, realtime));

export const deleteUser = functions
  .region(DEPLOYMENT_REGION)
  .auth.user()
  .onDelete((user, ctx) => onDeleteUser(user, ctx, firestore));

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
