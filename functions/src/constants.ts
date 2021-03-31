import { DeploymentOptions } from 'firebase-functions';

export const DEPLOYMENT_REGION = 'asia-east2';
export const DEPLOYMENT_SETTINGS: DeploymentOptions = {
  memory: '1GB',
};

export const REF_USERS_COL = '/users';
export const REF_MEMBERS_COL = '/members';
export const REF_EVENTS_COL = '/events';
export const REF_PARTICIPATIONS_COL = '/participations';

export const REF_AGN_USERS_DOC = '/aggregations/users';
export const REF_AGN_MEMBERS_DOC = '/aggregations/members';
export const REF_AGN_EVENTS_DOC = '/aggregations/events';
export const REF_AGN_PARTICIPATIONS_DOC = '/aggregations/participations';
