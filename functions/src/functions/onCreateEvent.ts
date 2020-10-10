import { logger, EventContext } from 'firebase-functions';

import { Event } from '../models';

export const onCreateEvent = (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: EventContext,
  db: FirebaseFirestore.Firestore
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
    'updatedAt': FirebaseFirestore.FieldValue.serverTimestamp(),
    'createdAt': FirebaseFirestore.FieldValue.serverTimestamp(),
  };

  return snapshot.ref.set(updatedEvent, { merge: true }).catch(logger.error);
};
