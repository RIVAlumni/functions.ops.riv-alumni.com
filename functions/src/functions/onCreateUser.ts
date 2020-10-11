import { auth, firestore } from 'firebase-admin';
import { logger } from 'firebase-functions';

import { User, Member, CustomClaims } from '../models';

export const onCreateUser = (
  user: auth.UserRecord,
  db: firestore.Firestore
) => {
  let memberUid: string | null = null;
  let claims: CustomClaims = { accessLevel: 0 };

  const userRef = db.doc(`users/${user.uid}`);
  const memberRef = db
    .collection('members')
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
