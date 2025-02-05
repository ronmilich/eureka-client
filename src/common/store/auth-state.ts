import { signal } from '@preact/signals-react';
import { User } from '../models';

export const user = signal<User>();

export const AuthStateActions = {
  setUser: (userDetails: User) => (user.value = userDetails),
  clearUser: () => (user.value = undefined),
};
