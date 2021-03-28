import { Metadata } from './metadata';

export interface Member extends Metadata {
  /**
   * @readonly
   * Unique membership identifier.
   */
  readonly 'Membership ID': string;
  /**
   * Legal full name of the alumni.
   */
  'Full Name': string;
  /**
   * Legal gender of the alumni.
   */
  'Gender': string;
  /**
   * Email address of the alumni.
   *
   * @remarks
   * Email addresses are used for identifying and linking pre-existing/new
   * user accounts to a membership account via a secured environment in
   * Cloud Functions.
   */
  'Email': string | null;
  /**
   * Contactable phone number of the alumni.
   */
  'Contact Number': number;
  /**
   * Secondary contactable phone number of the alumni.
   */
  'Home Number': number | null;
  /**
   * Current school of study of the alumni.
   */
  'Current School': string | null;
  /**
   * Graduating class of the alumni.
   */
  'Graduating Class': string;
  /**
   * Graduating year of the alumni.
   */
  'Graduating Year': number;
  /**
   * Name of the parent/guardian of the alumni.
   */
  'Name Of Next-Of-Kin': string;
  /**
   * Relationship of the parent/guardian with the alumni.
   */
  'Relationship With Next-Of-Kin': string;
  /**
   * Contactable number of the parent/guardian of the alumni.
   */
  'Contact Number Of Next-Of-Kin': number;
}
