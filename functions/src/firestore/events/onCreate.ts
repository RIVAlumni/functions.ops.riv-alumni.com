import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { EventAggregation } from '../../models';
import {
  DEPLOYMENT_REGION,
  DEPLOYMENT_SETTINGS,
  REF_AGN_EVENTS_DOC,
  COUNT_INCREMENT,
} from '../../constants';

const firestore = admin.firestore();
const { FieldValue } = admin.firestore;

const aggregationsRef = firestore.doc(REF_AGN_EVENTS_DOC);

export const firestoreEventsOnCreate = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('/events/{docId}')
  .onCreate(async () => {
    /**
     * Increment `events` aggregation count by 1.
     */
    const updatedAggregation: EventAggregation = {
      eventsCount: FieldValue.increment(COUNT_INCREMENT),
    };

    try {
      return aggregationsRef.set(updatedAggregation, { merge: true });
    } catch (args) {
      return functions.logger.error(args);
    }
  });
