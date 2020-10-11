import { database, firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

export const onDeleteUserAggregation = async (
  snapshot: firestore.DocumentSnapshot,
  context: EventContext,
  db: database.Database
) => {
  const aggregationRef = db.ref(`/aggregations/users/${snapshot.id}`);
  const aggregationCountRef = db.ref(`/aggregationsCount/users`);

  try {
    await aggregationRef.remove();
  } catch (e) {
    logger.error(e);
  }

  return aggregationCountRef
    .transaction((count: number) => (count || 0) + 1)
    .catch(logger.error);
};
