import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { onCreateUser, onCreateMember } from './functions/onCreate';

admin.initializeApp();

const firestore = admin.firestore();
const DEPLOYMENT_REGION = 'asia-east2';

export const createUser = functions
  .region(DEPLOYMENT_REGION)
  .auth.user()
  .onCreate((user) => onCreateUser(user, firestore));

export const createMember = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document('users/{docId}')
  .onCreate((snap, ctx) => onCreateMember(snap, ctx, firestore));

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
