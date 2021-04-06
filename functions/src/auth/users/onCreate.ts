import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { UserAggregation } from '../../models';
import {
  DEPLOYMENT_REGION,
  DEPLOYMENT_SETTINGS,
  REF_AGN_USERS_DOC,
  COUNT_INCREMENT,
} from '../../constants';

const firestore = admin.firestore();
const { FieldValue } = admin.firestore;

export const authUsersOnCreate = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .auth.user()
  .onCreate(async () => {
    const aggregationsRef = firestore.doc(REF_AGN_USERS_DOC);

    /**
     * Increment `users` aggregation count by 1.
     */
    const updatedAggregation: UserAggregation = {
      usersCount: FieldValue.increment(COUNT_INCREMENT),
    };

    try {
      return aggregationsRef.set(updatedAggregation, { merge: true });
    } catch (error) {
      return functions.logger.error(error);
    }
  });
