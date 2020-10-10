/**
 * Event represents an event that is upcoming or has already occurred before.
 *
 * @property [Event Code]
 * Represents the unique identifier of the event.
 * Note: Format is in YYYYMMDD
 *
 * @property [Event Year]
 * Represents the year that the event was held.
 *
 * @property [Event Name]
 * Represents the title of the event.
 *
 * @property [Event Overall In-Charge]
 * Represents the unique identifier of the member overall in-charge of the event.
 *
 * @property [Event Assistant In-Charge]
 * Represents the unique identifer of the member second in-charge of the event.
 *
 * @property [Google Drive]
 * Represents the URL to the Google Drive folder of the event.
 *
 * @property [Roles]
 * Represents the roles available for the event.
 *
 * @property [updatedAt]
 * SYSTEM VALUE. Represents the timestamp when the document is updated.
 *
 * @property [createdAt]
 * SYSTEM VALUE. Represents the timestamp when the document is created.
 */
export interface Event {
  'Event Code': number;
  'Event Year': number;
  'Event Name': string;
  'Event Overall In-Charge': string;
  'Event Assistant In-Charge': string;
  'Google Drive': string;
  'Roles': EventRoles[];
  'updatedAt': FirebaseFirestore.FieldValue;
  'createdAt': FirebaseFirestore.FieldValue;
}

export interface EventRoles {
  ID: string;
  Definition: string;
}
