import axios from 'axios';
import { User } from '../models';

interface IAuthApi {
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  getUserDetals: () => Promise<User>;
  forgotPassword: (email: string, password: string) => Promise<User>;
}

export class AuthApi implements IAuthApi {
  async forgotPassword(email: string, password: string): Promise<User> {
    try {
      const { data } = await axios.post<User>('/users/forgot-password', { email, password });
      return data;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { data } = await axios.post<User>('/users/login', { email, password });
      return data;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post('/users/logout');
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async getUserDetals(): Promise<User> {
    try {
      const { data } = await axios.get<User>('/users/details');
      return data;
    } catch (err) {
      throw new Error(err as any);
    }
  }
}
