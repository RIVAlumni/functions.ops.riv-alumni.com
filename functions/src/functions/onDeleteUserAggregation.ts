import { database, firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import { REF_AGN_USERS, REF_AGN_COUNT_USERS } from '../constants';

/**
 * onDeleteUserAggregation listens for a document deletion in `users`
 * collection and updates the aggregation data.
 *
 * @remarks
 * Operations Procedure (in listed order):
 * * Attempt to remove the user from the aggregation.
 * * If successful, proceed to decrement the count by 1 using transactions.
 *
 * @param snapshot the user data when the function was triggered.
 * @param context the details of the function call.
 * @param db the reference for interacting with the database.
 */
export const onDeleteUserAggregation = async (
  snapshot: firestore.DocumentSnapshot,
  context: EventContext,
  db: database.Database
) => {
  const aggregationRef = db.ref(REF_AGN_USERS + snapshot.id);
  const aggregationCountRef = db.ref(REF_AGN_COUNT_USERS);

  try {
    await aggregationRef.remove();
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }

  return aggregationCountRef
    .transaction((count: number) => (count || 0) - 1)
    .catch(logger.error);
};
