import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { User, UserAccessLevels } from '../../models';
import { findMemberId } from '../../utilities/findMemberId';
import { DEPLOYMENT_REGION, DEPLOYMENT_SETTINGS } from '../../constants';

const { FieldValue } = admin.firestore;

export const firestoreUsersOnCreate = functions
  .region(DEPLOYMENT_REGION)
  .runWith(DEPLOYMENT_SETTINGS)
  .firestore.document('/users/{docId}')
  .onCreate(async (snapshot) => {
    /**
     * Convert snapshot into document data.
     */
    let user: User = snapshot.data() as User;
    let accessLevel: UserAccessLevels = UserAccessLevels.Anonymous;

    try {
      const memberId = await findMemberId(user['Email']);
      if (memberId) accessLevel = UserAccessLevels.Alumni;

      user = {
        'User ID': user['User ID'],
        'Email': user['Email'],
        'Photo URL': user['Photo URL'],
        'Display Name': user['Display Name'],
        'Membership ID': memberId,
        'Access Level': Number(accessLevel),
        'updatedAt': FieldValue.serverTimestamp(),
        'createdAt': user['createdAt'],
      };
    } catch (error) {
      functions.logger.error(error);
    }

    try {
      return snapshot.ref.set(user, { merge: true });
    } catch (error) {
      return functions.logger.error(error);
    }
  });
