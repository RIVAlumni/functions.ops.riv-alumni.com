import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { ParticipationAggregation } from '../../models';
import {
  DEPLOYMENT_REGION,
  DEPLOYMENT_SETTINGS,
  REF_AGN_PARTICIPATIONS_DOC,
  COUNT_INCREMENT,
} from '../../constants';

const firestore = admin.firestore();
const { FieldValue } = admin.firestore;

export const firestoreParticipationsOnCreate = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('/participations/{docId}')
  .onCreate(async () => {
    const aggregationRef = firestore.doc(REF_AGN_PARTICIPATIONS_DOC);

    /**
     * Increment `participations` aggregation count by 1.
     */
    const updatedAggregation: ParticipationAggregation = {
      participationsCount: FieldValue.increment(COUNT_INCREMENT),
    };

    try {
      return aggregationRef.set(updatedAggregation, { merge: true });
    } catch (error) {
      return functions.logger.error(error);
    }
  });
