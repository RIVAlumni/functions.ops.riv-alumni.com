import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { UserAggregation } from '../../models';
import {
  DEPLOYMENT_REGION,
  DEPLOYMENT_SETTINGS,
  REF_AGN_USERS_DOC,
} from '../../constants';

const firestore = admin.firestore();
const { FieldValue } = admin.firestore;

const aggregationsRef = firestore.doc(REF_AGN_USERS_DOC);

export const authUsersOnCreate = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .auth.user()
  .onCreate(() => {
    /**
     * Increment `users` aggregation count by 1.
     */
    const updatedAggregation: UserAggregation = {
      usersCount: FieldValue.increment(1),
    };

    return aggregationsRef.set(updatedAggregation, { merge: true });
  });
