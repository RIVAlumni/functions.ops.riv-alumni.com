import { Metadata } from './metadata';

export interface Event extends Metadata {
  /**
   * @readonly
   * Unique event identifier.
   */
  readonly 'Event Code': number;
  /**
   * @readonly
   * Year of occurrence of the event.
   */
  readonly 'Event Year': number;
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
