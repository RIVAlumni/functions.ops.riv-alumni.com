import { auth, firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import { COL_USERS, COL_MEMBERS } from '../constants';
import { User, Member, CustomClaims } from '../models';

/**
 * onCreateUser listens for a user creation in Firebase Auth.
 *
 * @remarks
 * Operations Procedure (in listed order):
 * * Queries the database for a member matching the same email address.
 * * Determines the user's access level / privileges.
 * * Sets the user custom claims with their determined access levels.
 * * Updates the user document with the determined details.
 *
 * @param user the object containing all the user information.
 * @param event the details of the function call.
 * @param db the reference for interacting with the database.
 */
export const onCreateUser = async (
  user: auth.UserRecord,
  event: EventContext,
  db: firestore.Firestore
) => {
  let memberUid: string | null = null;
  let claims: CustomClaims = { accessLevel: 0 };

  const userRef = db.doc(COL_USERS + user.uid);
  const memberRef = db
    .collection(COL_MEMBERS)
    .where('Email', '==', user.email)
    .limit(1);

  try {
    const memberCol = await memberRef.get();
    memberCol.forEach((doc) => {
      const member = doc.data() as Member;

      if (member['Email'] === user.email) memberUid = doc.id;
    });
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }

  if (memberUid) claims = { accessLevel: 1 };
  if (user.email && user.email.endsWith('@riv-alumni.com'))
    claims = { accessLevel: 2 };

  const updatedUser: User = {
    'User ID': user.uid,
    'Email': user.email || null,
    'Photo URL': user.photoURL || null,
    'Display Name': user.displayName || null,
    'Membership ID': memberUid,
    'refreshTime': firestore.FieldValue.serverTimestamp(),
    'updatedAt': firestore.FieldValue.serverTimestamp(),
    'createdAt': firestore.FieldValue.serverTimestamp()
  };

  try {
    await auth().setCustomUserClaims(user.uid, claims);
  } catch (e) {
    logger.error(e);
    throw new Error(e);
  }

  return userRef.set(updatedUser, { merge: true }).catch(logger.error);
};
