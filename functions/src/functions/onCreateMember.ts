import { firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import { Member } from '../models';

/**
 * onCreateMember listens for a new document creation in `members` collection.
 *
 * @remarks
 * This function will only add missing keys that can't be added as a user.
 *
 * @param snapshot the document snapshot when the function was triggered.
 * @param context the details of the function call.
 * @param db the reference for interacting with the database.
 */
export const onCreateMember = (
  snapshot: firestore.DocumentSnapshot,
  context: EventContext,
  db: firestore.Firestore
) => {
  const data = snapshot.data() as Member;

  const updatedMember: Member = {
    'Membership ID': snapshot.id,
    'Full Name': data['Full Name'],
    'Gender': data['Gender'],
    'Email': data['Email'],
    'Contact Number': data['Contact Number'],
    'Home Number': data['Home Number'],
    'Current School': data['Current School'],
    'Graduating Class': data['Graduating Class'],
    'Graduating Year': data['Graduating Year'],
    'Name of Next-Of-Kin': data['Name of Next-Of-Kin'],
    'Relationship with Next-Of-Kin': data['Relationship with Next-Of-Kin'],
    'Contact Number of Next-Of-Kin': data['Contact Number of Next-Of-Kin'],
    'updatedAt': firestore.FieldValue.serverTimestamp(),
    'createdAt': firestore.FieldValue.serverTimestamp()
  };

  return snapshot.ref.set(updatedMember, { merge: true }).catch(logger.error);
};
