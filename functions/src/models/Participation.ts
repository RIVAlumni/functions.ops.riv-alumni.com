/**
 * Participation represents the participation record for a specific event.
 *
 * @property [Membership ID]
 * Represents the unique identifier of the member.
 *
 * @property [Event Code]
 * Represents the unique identifier of the event.
 *
 * @property [Role]
 * Represents the role that the member has played in the event.
 *
 * @property [VIA Hours]
 * Represents the amount of VIA Hours the member has accumulated.
 *
 * @property [updatedAt]
 * SYSTEM VALUE. Represents the timestamp when the document is updated.
 *
 * @property [createdAt]
 * SYSTEM VALUE. Represents the timestamp when the document is created.
 */
export interface Participation {
  'Membership ID': string;
  'Event Code': number;
  'Role': string;
  'VIA Hours': number;
  'updatedAt': FirebaseFirestore.FieldValue;
  'createdAt': FirebaseFirestore.FieldValue;
}
