import { firestore } from 'firebase-admin';

export interface Metadata {
  /**
   * @readonly
   * Timestamp of the last document update.
   */
  readonly updatedAt: firestore.FieldValue;
  /**
   * @readonly
   * Timestamp of when the document was created.
   */
  readonly createdAt: firestore.FieldValue;
}
