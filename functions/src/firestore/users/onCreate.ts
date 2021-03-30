import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { User, UserAccessLevels, UserAggregation } from '../../models';
import { DEPLOYMENT_REGION, DEPLOYMENT_SETTINGS } from '../../constants';

const firestore = admin.firestore;
const batch = firestore().batch();
const ref = firestore().collection('members');
const aggregationRef = firestore().doc('aggregations/users');

export default functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('users/{docId}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data() as User;
    const query = ref.where('Email', '==', data['Email']).limit(1);

    try {
      const result = (await query.get()).docs;

      if (result.length && result[0]) {
        const resultId = result[0].id;

        const updateData: User = {
          'User ID': data['User ID'],
          'Email': data['Email'],
          'Photo URL': data['Photo URL'],
          'Display Name': data['Display Name'],
          'Membership ID': resultId,
          'Access Level': Number(UserAccessLevels.Alumni),
          'updatedAt': firestore.FieldValue.serverTimestamp(),
          'createdAt': data['createdAt'],
        };

        batch.set(snapshot.ref, updateData, { merge: true });
      }
    } catch (e) {
      console.error(new Error(e));
    }

    const aggregation: UserAggregation = {
      usersCount: firestore.FieldValue.increment(1),
    };

    batch.set(aggregationRef, aggregation, { merge: true });

    return batch.commit();
  });
