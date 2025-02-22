import { Difficulty, IdeaStatus, ServiceType } from '../models';

export const SERVICE_TYPES: ServiceType[] = [
  'Mobile App',
  'Web App',
  'Desktop App',
  'SaaS',
  'API',
  'Platform',
  'Physical Product',
  'Hardware',
  'Iot Device',
  'Subscription Box',
  'Service',
  'Consulting',
  'Other',
];

export const IDEA_STATUSES: IdeaStatus[] = [
  'Draft',
  'Validated',
  'In Development',
  'Launched',
  'Approved',
  'Rejected',
];

export const DIFFICULTY: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Very Hard'];
