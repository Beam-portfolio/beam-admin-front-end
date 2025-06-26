'use client';

import { createContext } from 'react';
import { AuthUserType } from '../../types';

export type JWTContextType = {
  user: AuthUserType;
  method: string;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (data: any) => Promise<void>;
  socket: any;
  resetPassword: (data: any) => Promise<void>;
  createASeller: (data: any) => Promise<any>;
};

export const AuthContext = createContext({} as JWTContextType);
