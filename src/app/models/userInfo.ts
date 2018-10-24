import { Client } from './client';

export interface UserInfo {
  userKey: string;
  name: string;
  lastName: string;
  email: string;
  clients: Client[];
}
