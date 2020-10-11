import { auth, firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

export const onDeleteUser = (
  user: auth.UserRecord,
  context: EventContext,
  db: firestore.Firestore
) => db.doc(`users/${user.uid}`).delete().catch(logger.error);
