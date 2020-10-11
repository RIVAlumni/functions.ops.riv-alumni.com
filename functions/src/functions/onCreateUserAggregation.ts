import { database, firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import { User, UserAggregation } from '../models';

export const onCreateUserAggregation = async (
  snapshot: firestore.DocumentSnapshot,
  context: EventContext,
  db: database.Database
) => {
  const data = snapshot.data() as User;
  const aggregationRef = db.ref(`/aggregations/users/${snapshot.id}`);
  const aggregationCountRef = db.ref(`/aggregationsCount/users`);

  const userAggregationList: UserAggregation = {
    'UID': snapshot.id,
    'Email': data.Email,
    'Display Name': data['Display Name'],
    'Membership ID': data['Membership ID'],
  };

  try {
    await aggregationRef.set(userAggregationList);
  } catch (e) {
    logger.error(e);
  }

  return aggregationCountRef.transaction((count: number) => (count || 0) + 1);
};
