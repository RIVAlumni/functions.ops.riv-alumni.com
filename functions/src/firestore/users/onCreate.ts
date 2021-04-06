import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { User, UserAccessLevels } from '../../models';
import {
  DEPLOYMENT_REGION,
  DEPLOYMENT_SETTINGS,
  REF_MEMBERS_COL,
} from '../../constants';

const firestore = admin.firestore();
const { FieldValue } = admin.firestore;

const membersRef = firestore.collection(REF_MEMBERS_COL);

export const firestoreUsersOnCreate = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('/users/{docId}')
  .onCreate(async (snapshot) => {
    /**
     * Convert snapshot into document data.
     */
    let user: User = snapshot.data() as User;

    /**
     * Build query to get link membership profile.
     */
    const query = membersRef.where('Email', '==', user['Email']).limit(1);

    try {
      /**
       * Get results from query and map to result array.
       */
      const result = (await query.get()).docs;

      /**
       * Check if the result array is not empty.
       */
      if (result.length && result[0]) {
        const resultId = result[0].id;

        user = {
          'User ID': user['User ID'],
          'Email': user['Email'],
          'Photo URL': user['Photo URL'],
          'Display Name': user['Display Name'],
          'Membership ID': resultId,
          'Access Level': Number(UserAccessLevels.Alumni),
          'updatedAt': FieldValue.serverTimestamp(),
          'createdAt': user['createdAt'],
        };
      }
    } catch (e) {
      console.error(new Error(e));
    }

    return snapshot.ref.set(user, { merge: true });
  });
