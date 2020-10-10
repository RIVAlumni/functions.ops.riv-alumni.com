import { logger, EventContext } from 'firebase-functions';

import { Member } from '../models';

export const onCreateMember = (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: EventContext,
  db: FirebaseFirestore.Firestore
) => {
  const updatedMember = <Member>{
    'Membership ID': snapshot.id,
    'updatedAt': FirebaseFirestore.FieldValue.serverTimestamp(),
    'createdAt': FirebaseFirestore.FieldValue.serverTimestamp(),
  };

  return snapshot.ref.set(updatedMember, { merge: true }).catch(logger.error);
};
