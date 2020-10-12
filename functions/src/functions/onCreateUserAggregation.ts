import { database, firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import { User, UserAggregation } from '../models';
import {
  REF_AGGREGATION_USERS,
  REF_AGGREGATION_COUNT_USERS
} from '../constants';

/**
 * onCreateUserAggregation listens for a new document creation in
 * `users` collection and updates the aggregation data.
 *
 * @remarks
 * Operations Procedure (in listed order):
 * * Build user aggregation data.
 * * Attempt to write into Realtime DB.
 * * If successful, proceed to increment the count by 1 using transactions.
 *
 * @param snapshot the user data when the function was triggered.
 * @param context the details of the function call.
 * @param db the reference for interacting with the database.
 */
export const onCreateUserAggregation = async (
  snapshot: firestore.DocumentSnapshot,
  context: EventContext,
  db: database.Database
) => {
  const data = snapshot.data() as User;
  const aggregationRef = db.ref(REF_AGGREGATION_USERS + snapshot.id);
  const aggregationCountRef = db.ref(REF_AGGREGATION_COUNT_USERS);

  const userAggregation: UserAggregation = {
    'UID': snapshot.id,
    'Email': data['Email'],
    'Display Name': data['Display Name'],
    'Membership ID': data['Membership ID']
  };

  try {
    await aggregationRef.set(userAggregation);
  } catch (e) {
    logger.error(e);
    return null;
  }

  return aggregationCountRef
    .transaction((count: number) => (count || 0) + 1)
    .catch(logger.error);
};
