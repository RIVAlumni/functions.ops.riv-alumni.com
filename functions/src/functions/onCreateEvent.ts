import { firestore } from 'firebase-admin';
import { logger, EventContext } from 'firebase-functions';

import { Event } from '../models';

/**
 * onCreateEvent listens for a new document creation in `events` collection.
 *
 * @remarks
 * This function will only add missing keys that can't be added as a user.
 *
 * @param snapshot the event data when the function was triggered.
 * @param context the details of the function call.
 * @param db the reference for interacting with the database.
 */
export const onCreateEvent = (
  snapshot: firestore.DocumentSnapshot,
  context: EventContext,
  db: firestore.Firestore
) => {
  const data = snapshot.data() as Event;

  const updatedEvent: Event = {
    'Event Code': Number(snapshot.id),
    'Event Year': data['Event Year'],
    'Event Name': data['Event Name'],
    'Event Overall In-Charge': data['Event Overall In-Charge'],
    'Event Assistant In-Charge': data['Event Assistant In-Charge'],
    'Google Drive': data['Google Drive'],
    'Roles': data['Roles'],
    'updatedAt': firestore.FieldValue.serverTimestamp(),
    'createdAt': firestore.FieldValue.serverTimestamp(),
  };

  return snapshot.ref.set(updatedEvent, { merge: true }).catch(logger.error);
};
