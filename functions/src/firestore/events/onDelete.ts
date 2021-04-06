import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { EventAggregation } from '../../models';
import {
  DEPLOYMENT_REGION,
  DEPLOYMENT_SETTINGS,
  REF_AGN_EVENTS_DOC,
  COUNT_DECREMENT,
} from '../../constants';

const firestore = admin.firestore();
const { FieldValue } = admin.firestore;

export const firestoreEventsOnDelete = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('/events/{docId}')
  .onDelete(async () => {
    const aggregationRef = firestore.doc(REF_AGN_EVENTS_DOC);

    /**
     * Decrement `events` aggregation count by 1.
     */
    const updatedAggregation: EventAggregation = {
      eventsCount: FieldValue.increment(COUNT_DECREMENT),
    };

    try {
      return aggregationRef.set(updatedAggregation, { merge: true });
    } catch (error) {
      return functions.logger.error(error);
    }
  });
