import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { ParticipationAggregation } from '../../models';
import {
  DEPLOYMENT_REGION,
  DEPLOYMENT_SETTINGS,
  REF_AGN_PARTICIPATIONS_DOC,
  COUNT_DECREMENT,
} from '../../constants';

const firestore = admin.firestore();
const { FieldValue } = admin.firestore;

const aggregationRef = firestore.doc(REF_AGN_PARTICIPATIONS_DOC);

export const firestoreParticipationsOnDelete = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('/participations/{docId}')
  .onDelete(async () => {
    /**
     * Decrement `participations` aggregation count by 1.
     */
    const updatedAggregation: ParticipationAggregation = {
      participationsCount: FieldValue.increment(COUNT_DECREMENT),
    };

    try {
      return aggregationRef.set(updatedAggregation, { merge: true });
    } catch (error) {
      return functions.logger.error(error);
    }
  });
