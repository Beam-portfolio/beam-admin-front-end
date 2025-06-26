// Context and provider for public password reset (forgot/reset via email)
'use client';

import { createContext, useCallback } from 'react';
import axios, { endpoints } from 'src/utils/axios';

export type PublicResetContextType = {
  sendResetCode: (email: string) => Promise<void>;
  resetPasswordWithCode: (email: string, code: string, newPassword: string) => Promise<void>;
};

export const PublicResetContext = createContext({} as PublicResetContextType);

export function PublicResetProvider({ children }: { children: React.ReactNode }) {
  // Send reset code to email
  const sendResetCode = useCallback(async (email: string) => {
    await axios.post(endpoints.auth.forgotPasswordCode, { email });
  }, []);

  // Reset password with code
  const resetPasswordWithCode = useCallback(
    async (email: string, code: string, newPassword: string) => {
      await axios.post(endpoints.auth.resetPasswordCode, { email, code, newPassword });
    },
    []
  );

  return (
    <PublicResetContext.Provider value={{ sendResetCode, resetPasswordWithCode }}>
      {children}
    </PublicResetContext.Provider>
  );
}
