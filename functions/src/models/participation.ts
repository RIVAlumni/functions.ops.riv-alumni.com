import { Metadata } from './metadata';

export interface Participation extends Metadata {
  /**
   * @readonly
   * Unique participation identifier for the event.
   */
  readonly 'Participation ID': string;
  /**
   * @readonly
   * Unique membership identifer of the alumni.
   */
  readonly 'Membership ID': string;
  /**
   * @readonly
   * Unique event identifier.
   */
  readonly 'Event Code': number;
  /**
   * Unique identifer of the role.
   */
  'Role': string;
  /**
   * VIA hours accumulated by the alumni.
   */
  'VIA Hours': number;
}
