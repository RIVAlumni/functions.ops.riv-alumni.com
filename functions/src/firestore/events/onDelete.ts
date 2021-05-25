import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { Event, EventAggregation } from '../../models';
import {
  DEPLOYMENT_REGION,
  DEPLOYMENT_SETTINGS,
  REF_AGN_EVENTS_DOC,
  COUNT_DECREMENT,
} from '../../constants';

const storage = admin.storage();
const firestore = admin.firestore();
const { FieldValue } = admin.firestore;

export const firestoreEventsOnDelete = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('/events/{docId}')
  .onDelete(async (snapshot) => {
    const data = snapshot.data() as Event;
    const storageRef = storage
      .bucket('rivalumniops-events')
      .file(`thumbnails/${data['Event Code']}`);

    const aggregationRef = firestore.doc(REF_AGN_EVENTS_DOC);

    /**
     * Decrement `events` aggregation count by 1.
     */
    const updatedAggregation: EventAggregation = {
      eventsCount: FieldValue.increment(COUNT_DECREMENT),
    };

    /**
     * Attempt to delete the event thumbnail.
     * Must be separate from the decrement of aggregation count.
     */
    try {
      await storageRef.delete();
    } catch (error) {
      functions.logger.error(error);
    }

    try {
      return aggregationRef.set(updatedAggregation, { merge: true });
    } catch (error) {
      return functions.logger.error(error);
    }
  });
