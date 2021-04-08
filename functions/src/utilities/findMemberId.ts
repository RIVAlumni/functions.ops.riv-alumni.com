import { firestore } from 'firebase-admin';

import { REF_MEMBERS_COL } from '../constants';

export const findMemberId = async (email: string): Promise<string | null> => {
  const ref = firestore().collection(REF_MEMBERS_COL);
  const query = ref.where('Email', '==', email).limit(1);

  try {
    const result = (await query.get()).docs;
    if (!result.length) return Promise.resolve(null);
    return Promise.resolve(result[0].id);
  } catch (error) {
    return Promise.reject(error);
  }
};
