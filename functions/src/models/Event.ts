import { firestore } from 'firebase-admin';

export interface Event {
  /**
   * @readonly
   * Unique event identifier.
   */
  'Event Code': number;
  /**
   * @readonly
   * Year of occurrence of the event.
   */
  'Event Year': number;
  /**
   * Name of the event.
   */
  'Event Name': string;
  /**
   * Picture thumbnail of the event.
   */
  'Event Thumbnail': string;
  /**
   * Unique membership identifier for the overall in-charge.
   */
  'Event Overall In-Charge': string;
  /**
   * Unique membership identifier for the assistant in-charge.
   */
  'Event Assistant In-Charge': string;
  /**
   * Link towards the event folder in Google Drive.
   */
  'Google Drive': string;
  /**
   * Roles available for the event.
   */
  'Roles': EventRoles[];
  /**
   * Determines if VIA Hours computed are valid.
   */
  'Official Event': boolean;
  /**
   * @readonly
   * Timestamp of the last document update.
   */
  'updatedAt': firestore.FieldValue;
  /**
   * @readonly
   * Timestamp of when the document was created.
   */
  'createdAt': firestore.FieldValue;
}

export interface EventRoles {
  /**
   * Unique identifier of the role.
   */
  ID: string;
  /**
   * Definition of the role.
   */
  Definition: string;
}
