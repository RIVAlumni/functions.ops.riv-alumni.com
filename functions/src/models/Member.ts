/**
 * Member represents an alumni that has joined us for activities/events before.
 *
 * @property [Membership ID]
 * Represents the unique identifier of the registered member.
 *
 * @property [Full Name]
 * Represents the legal name of the member.
 *
 * @property [Gender]
 * Represents the sex of the member.
 *
 * @property [Email]
 * Represents the contactable email address of the member.
 *
 * @property [Contact Number]
 * Represents the contactable phone number of the member.
 *
 * @property [Home Number]
 * Represents the contactable landline that can be used for contacting
 * unreachable emergency contacts.
 *
 * @property [Current School]
 * Represents the school that the member is currently studying at.
 *
 * @property [Graduating Class]
 * Represents the class that the member has graduated from.
 *
 * @property [Graduating Year]
 * Represents the year that the member has graduated from.
 *
 * @property [Name of Next-Of-Kin]
 * Represents the contactable addressee during emergency situations.
 *
 * @property [Relationship with Next-Of-Kin]
 * Represents the relationship that the member has with the caretaker.
 *
 * @property [Contact Number of Next-Of-Kin]
 * Represents the contactable phone number of the caretaker.
 *
 * @property [updatedAt]
 * SYSTEM VALUE. Represents the timestamp when the document is updated.
 *
 * @property [createdAt]
 * SYSTEM VALUE. Represents the timestamp when the document is created.
 */
export interface Member {
  'Membership ID': string;
  'Full Name': string;
  'Gender': string;
  'Email': string | null;
  'Contact Number': number;
  'Home Number': number | null;
  'Current School': string | null;
  'Graduating Class': string;
  'Graduating Year': number;
  'Name of Next-Of-Kin': string;
  'Relationship with Next-Of-Kin': string;
  'Contact Number of Next-Of-Kin': number;
  'updatedAt': FirebaseFirestore.FieldValue;
  'createdAt': FirebaseFirestore.FieldValue;
}
