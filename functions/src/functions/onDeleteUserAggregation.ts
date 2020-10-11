import { database, firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import {
  AGGREGATIONS_USER_REF,
  AGGREGATIONS_USER_COUNT_REF,
} from '../constants';

export const onDeleteUserAggregation = async (
  snapshot: firestore.DocumentSnapshot,
  context: EventContext,
  db: database.Database
) => {
  const aggregationRef = db.ref(AGGREGATIONS_USER_REF + snapshot.id);
  const aggregationCountRef = db.ref(AGGREGATIONS_USER_COUNT_REF);

  try {
    await aggregationRef.remove();
  } catch (e) {
    logger.error(e);
    return null;
  }

  return aggregationCountRef
    .transaction((count: number) => (count || 0) - 1)
    .catch(logger.error);
};
