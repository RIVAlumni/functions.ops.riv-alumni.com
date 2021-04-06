import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { MemberAggregation } from '../../models';
import {
  DEPLOYMENT_REGION,
  DEPLOYMENT_SETTINGS,
  REF_AGN_MEMBERS_DOC,
  COUNT_DECREMENT,
} from '../../constants';

const firestore = admin.firestore();
const { FieldValue } = admin.firestore;

export const firestoreMembersOnDelete = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('/members/{docId}')
  .onDelete(async () => {
    const aggregationRef = firestore.doc(REF_AGN_MEMBERS_DOC);

    /**
     * Decrement `members` aggregation count by 1.
     */
    const updatedAggregation: MemberAggregation = {
      membersCount: FieldValue.increment(COUNT_DECREMENT),
    };

    try {
      return aggregationRef.set(updatedAggregation, { merge: true });
    } catch (error) {
      return functions.logger.error(error);
    }
  });
