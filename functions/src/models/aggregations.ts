import { firestore } from 'firebase-admin';

export interface UserAggregation {
  usersCount: firestore.FieldValue;
}

export interface MemberAggregation {
  membersCount: firestore.FieldValue;
}

export interface EventAggregation {
  eventsCount: firestore.FieldValue;
}

export interface ParticipationAggregation {
  participationsCount: firestore.FieldValue;
}
