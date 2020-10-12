import { firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import { Participation } from '../models';

/**
 * onCreateParticipation listens for a new document creation in
 * `participations` collection.
 *
 * @remarks
 * This function will only add missing keys that can't be added as a user.
 *
 * @param snapshot the participation data when the function was triggered.
 * @param context the details of the function call.
 * @param db the reference for interacting with the database.
 */
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
    'Role': data['Role'],
    'updatedAt': firestore.FieldValue.serverTimestamp(),
    'createdAt': firestore.FieldValue.serverTimestamp()
  };

  return snapshot.ref
    .set(updatedParticipation, { merge: true })
    .catch(logger.error);
};
