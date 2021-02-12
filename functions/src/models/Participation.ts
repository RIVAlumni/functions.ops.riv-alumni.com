import { firestore } from 'firebase-admin';

export interface Participation {
  /**
   * @readonly
   * Unique participation identifier for the event.
   */
  'Participation ID': string;
  /**
   * @readonly
   * Unique membership identifer of the alumni.
   */
  'Membership ID': string;
  /**
   * @readonly
   * Unique event identifier.
   */
  'Event Code': number;
  /**
   * Unique identifer of the role.
   */
  'Role': string;
  /**
   * VIA hours accumulated by the alumni.
   */
  'VIA Hours': number;
  /**
   * @readonly
   */
  'updatedAt': firestore.FieldValue;
  /**
   * @readonly
   */
  'createdAt': firestore.FieldValue;
}
