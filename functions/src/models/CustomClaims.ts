/**
 * CustomClaims represent the additional data set in the user's account.
 *
 * Access Levels
 * Level 0:
 * - No Access
 *
 * Level 1:
 * - Able to check own membership profile
 * - Able to check events participated before
 * - Able to check total VIA hours accumulated
 *
 * Level 2:
 * - Everything from Level 1
 * - Edit other membership profiles
 * - Edit all event details
 * - Edit VIA hours
 *
 * Level 3:
 * - Everything from Level 2
 * - Create/delete members
 * - Create/delete events
 * - Create/delete participations
 */
export interface CustomClaims {
  accessLevel: number;
}
