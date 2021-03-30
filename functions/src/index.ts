import { initializeApp } from 'firebase-admin';
import { exportFunctions } from 'better-firebase-functions';

initializeApp();
exportFunctions({ __filename, exports });
