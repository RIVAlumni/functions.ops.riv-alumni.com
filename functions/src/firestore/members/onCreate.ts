import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { MemberAggregation } from '../../models';
import {
  DEPLOYMENT_REGION,
  DEPLOYMENT_SETTINGS,
  REF_AGN_MEMBERS_DOC,
} from '../../constants';

const firestore = admin.firestore();
const { FieldValue } = admin.firestore;

const aggregationsRef = firestore.doc(REF_AGN_MEMBERS_DOC);

export const firestoreMembersOnCreate = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('/members/{docId}')
  .onCreate(async () => {
    /**
     * Increment `members` aggregation count by 1.
     */
    const updatedAggregation: MemberAggregation = {
      membersCount: FieldValue.increment(1),
    };

    try {
      return aggregationsRef.set(updatedAggregation, { merge: true });
    } catch (error) {
      return functions.logger.error(error);
    }
  });
