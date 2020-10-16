import { firestore } from 'firebase-admin';

export interface User {
  /**
   * User identifier of the registered user.
   */
  'User ID': string;
  /**
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
   * Membership document identifier of the registered user, with `null` being
   * equivalent to "not a member".
   */
  'Membership ID': string | null;
  /**
   * Levels of access granted to the registered user.
   */
  'Access Level': number;
  /**
   * Timestamp of the last document update.
   */
  'updatedAt': firestore.FieldValue;
  /**
   * Timestamp of when the document is created.
   */
  'createdAt': firestore.FieldValue;
}
