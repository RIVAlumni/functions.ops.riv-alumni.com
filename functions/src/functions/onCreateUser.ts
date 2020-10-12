import { auth, firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import { COL_USERS, COL_MEMBERS } from '../constants';
import { User, Member, CustomClaims } from '../models';

/**
 * onCreateUser listens for a user creation in Firebase Auth.
 *
 * @remarks
 * Operations Procedure (in listed order):
 * * Create a database transaction.
 * * Queries the database for a member matching the same email address.
 * * Determines the user's access level / privileges.
 * * Sets the user custom claims with their determined access levels.
 * * Updates the user document with the latest information.
 *
 * @param user the object containing all the user information.
 * @param event the details of the function call.
 * @param db the reference for interacting with the database.
 */
export const onCreateUser = (
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

  return db
    .runTransaction(async (t) => {
      try {
        // Attempts to find a membership document related to the user's email
        const memberCol = await t.get(memberRef);
        memberCol.forEach((doc) => {
          if ((doc.data() as Member)['Email'] === user.email)
            memberUid = doc.id;
        });
      } catch (e) {
        logger.error(e);
        return null;
      }

      // Sets the access level to 1 if the user is a member
      if (memberUid) claims = { accessLevel: 1 };

      // Sets the access level to 2 if the user is part of RIVAlumni
      if (user.email && user.email.endsWith('@riv-alumni.com'))
        claims = { accessLevel: 2 };

      // Create the updated user document
      const updatedUser: User = {
        'User ID': user.uid,
        'Email': user.email || null,
        'Photo URL': user.photoURL || null,
        'Display Name': user.displayName || null,
        'Membership ID': memberUid,
        'refreshTime': firestore.FieldValue.serverTimestamp(),
        'updatedAt': firestore.FieldValue.serverTimestamp(),
        'createdAt': firestore.FieldValue.serverTimestamp(),
      };

      try {
        // Set custom user claims
        await auth().setCustomUserClaims(user.uid, claims);
      } catch (e) {
        logger.error(e);
        return null;
      }

      return t.set(userRef, updatedUser, { merge: true });
    })
    .catch(logger.error);
};
