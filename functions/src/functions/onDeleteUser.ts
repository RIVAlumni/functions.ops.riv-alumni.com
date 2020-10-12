import { auth, firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import { COL_USERS } from '../constants';

/**
 * onDeleteUser listens for a user deletion event in Firebase Auth and
 * deletes the corresponding user document in the collection.
 *
 * @param user the object containing all the user information.
 * @param context the details of the function call.
 * @param db the reference for interacting with the database.
 */
export const onDeleteUser = (
  user: auth.UserRecord,
  context: EventContext,
  db: firestore.Firestore
) =>
  db
    .doc(COL_USERS + user.uid)
    .delete()
    .catch(logger.error);
