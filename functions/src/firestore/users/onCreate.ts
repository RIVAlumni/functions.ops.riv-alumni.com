import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { User, UserAccessLevels, UserAggregation } from '../../models';
import {
  DEPLOYMENT_REGION,
  DEPLOYMENT_SETTINGS,
  REF_MEMBERS_COL,
  REF_AGN_USERS_DOC,
} from '../../constants';

const firestore = admin.firestore();
const { FieldValue } = admin.firestore;

const batch = firestore.batch();
const membersRef = firestore.collection(REF_MEMBERS_COL);
const aggregationsRef = firestore.doc(REF_AGN_USERS_DOC);

export const firestoreUsersOnCreate = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('/users/{docId}')
  .onCreate(async (snapshot) => {
    /**
     * Convert snapshot into document data.
     */
    const snapshotData = snapshot.data() as User;

    /**
     * Build query to get link membership profile.
     */
    const query = membersRef
      .where('Email', '==', snapshotData['Email'])
      .limit(1);

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

        const updatedUserData: User = {
          'User ID': snapshotData['User ID'],
          'Email': snapshotData['Email'],
          'Photo URL': snapshotData['Photo URL'],
          'Display Name': snapshotData['Display Name'],
          'Membership ID': resultId,
          'Access Level': Number(UserAccessLevels.Alumni),
          'updatedAt': FieldValue.serverTimestamp(),
          'createdAt': snapshotData['createdAt'],
        };

        batch.set(snapshot.ref, updatedUserData, { merge: true });
      }
    } catch (e) {
      console.error(new Error(e));
    }

    /**
     * Increase `users` aggregation count by 1.
     *
     * @remarks
     * Updating the aggregation must still continue even if updating
     * the user document fails.
     */
    const aggregation: UserAggregation = {
      usersCount: FieldValue.increment(1),
    };

    batch.set(aggregationsRef, aggregation, { merge: true });

    return batch.commit();
  });
