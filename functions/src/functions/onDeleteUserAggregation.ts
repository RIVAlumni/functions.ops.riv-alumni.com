import { database, firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import {
  REF_AGGREGATION_USERS,
  REF_AGGREGATION_COUNT_USERS,
} from '../constants';

export const onDeleteUserAggregation = async (
  snapshot: firestore.DocumentSnapshot,
  context: EventContext,
  db: database.Database
) => {
  const aggregationRef = db.ref(REF_AGGREGATION_USERS + snapshot.id);
  const aggregationCountRef = db.ref(REF_AGGREGATION_COUNT_USERS);

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
