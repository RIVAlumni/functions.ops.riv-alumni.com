import { database, firestore } from 'firebase-admin';
import { EventContext } from 'firebase-functions';

import { User, UserAggregation } from '../models';

export const onCreateUserAggregation = (
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
    'Display Name': data['Display Name'] || '',
    'Membership ID': data['Membership ID'],
  };

  aggregationRef.set(userAggregationList);

  return aggregationCountRef.transaction((count) => count + 1);
};
