import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { UserAggregation } from '../../models';
import {
  DEPLOYMENT_REGION,
  DEPLOYMENT_SETTINGS,
  REF_USERS_COL,
  REF_AGN_USERS_DOC,
} from '../../constants';

const firestore = admin.firestore();
const { FieldValue } = admin.firestore;

const batch = firestore.batch();
const usersRef = firestore.collection(REF_USERS_COL);
const aggregationsRef = firestore.doc(REF_AGN_USERS_DOC);

export const authUsersOnDelete = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .auth.user()
  .onDelete((user) => {
    /**
     * Delete the user document.
     */
    batch.delete(usersRef.doc(user.uid));

    /**
     * Decrement `users` aggregation count by 1.
     */
    const aggregation: UserAggregation = {
      usersCount: FieldValue.increment(-1),
    };

    batch.set(aggregationsRef, aggregation, { merge: true });

    return batch.commit();
  });
