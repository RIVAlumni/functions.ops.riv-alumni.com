import { database, firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import { User, UserAggregation } from '../models';
import {
  REF_AGGREGATION_USERS,
  REF_AGGREGATION_COUNT_USERS,
} from '../constants';

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
    'Membership ID': data['Membership ID'],
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
