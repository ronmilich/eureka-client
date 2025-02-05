export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export type UserRole = 'admin' | 'regular';
