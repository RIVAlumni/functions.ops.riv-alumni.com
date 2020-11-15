import { firestore } from 'firebase-admin';

import { UserAccessLevels } from './AccessLevels';

export interface User {
  /**
   * @readonly
   * User identifier of the registered user.
   */
  'User ID': string;
  /**
   * @readonly
   * Email address of the registered user.
   */
  'Email': string | null;
  /**
   * Profile picture of the registered user.
   */
  'Photo URL': string | null;
  /**
   * Display Name of the registered user.
   */
  'Display Name': string | null;
  /**
   * @readonly
   * Membership document identifier of the registered user, with `null` being
   * equivalent to "not a member".
   */
  'Membership ID': string | null;
  /**
   * Levels of access granted to the registered user.
   */
  'Access Level': UserAccessLevels;
  /**
   * @readonly
   * Timestamp of the last document update.
   */
  'updatedAt': firestore.FieldValue;
  /**
   * @readonly
   * Timestamp of when the document is created.
   */
  'createdAt': firestore.FieldValue;
}
