import { firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import { Member } from '../models';

export const onCreateMember = (
  snapshot: firestore.DocumentSnapshot,
  context: EventContext,
  db: FirebaseFirestore.Firestore
) => {
  const data = snapshot.data() as Member;

  const updatedMember: Member = {
    'Membership ID': snapshot.id,
    'Full Name': data['Full Name'],
    'Gender': data.Gender,
    'Email': data.Email,
    'Contact Number': data['Contact Number'],
    'Home Number': data['Home Number'],
    'Current School': data['Current School'],
    'Graduating Class': data['Graduating Class'],
    'Graduating Year': data['Graduating Year'],
    'Name of Next-Of-Kin': data['Name of Next-Of-Kin'],
    'Relationship with Next-Of-Kin': data['Relationship with Next-Of-Kin'],
    'Contact Number of Next-Of-Kin': data['Contact Number of Next-Of-Kin'],
    'updatedAt': firestore.FieldValue.serverTimestamp(),
    'createdAt': firestore.FieldValue.serverTimestamp(),
  };

  return snapshot.ref.set(updatedMember, { merge: true }).catch(logger.error);
};
