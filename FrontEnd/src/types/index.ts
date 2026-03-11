export type Role = 'USER' | 'ADMIN';

export interface User {
  name: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: Role;
}
