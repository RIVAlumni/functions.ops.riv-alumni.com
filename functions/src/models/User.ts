/**
 * User represents an OAuth2 user signed into the application.
 *
 * @property [User ID]        Represents the registered auth user.
 * @property [Email]          Represents the email registered by the auth user.
 * @property [Photo URL]      Represents the profile picture attached by the
 *                            auth user.
 * @property [Display Name]   Represents the name registered by the auth user.
 * @property [Membership ID]  Represents the related membership found in
 *                            `members` collection.
 * @property [refreshTime]    SYSTEM VALUE.
 *                            Represents if an auth token refresh is required.
 * @property [updatedAt]      SYSTEM VALUE.
 *                            Represents the time when the document is updated.
 * @property [createdAt]      SYSTEM VALUE.
 *                            Represents the time when the document is created.
 */
export interface User {
  'User ID': string;
  'Email': string;
  'Photo URL': string;
  'Display Name': string;
  'Membership ID': string | null;
  'refreshTime': FirebaseFirestore.FieldValue;
  'updatedAt': FirebaseFirestore.FieldValue;
  'createdAt': FirebaseFirestore.FieldValue;
}
