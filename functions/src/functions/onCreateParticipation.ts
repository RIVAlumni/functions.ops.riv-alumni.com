import { firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import { Participation } from '../models';

export const onCreateParticipation = (
  snapshot: firestore.DocumentSnapshot,
  context: EventContext,
  db: firestore.Firestore
) => {
  const data = snapshot.data() as Participation;

  const updatedParticipation: Participation = {
    'Membership ID': data['Membership ID'],
    'Event Code': data['Event Code'],
    'VIA Hours': data['VIA Hours'],
    'Role': data.Role,
    'updatedAt': firestore.FieldValue.serverTimestamp(),
    'createdAt': firestore.FieldValue.serverTimestamp(),
  };

  return snapshot.ref
    .set(updatedParticipation, { merge: true })
    .catch(logger.error);
};
