// Custom hook to access the PublicResetContext
'use client';

import { useContext } from 'react';
import { PublicResetContext } from '../context/jwt/public-reset-context';

export function usePublicResetContext() {
  const context = useContext(PublicResetContext);
  if (!context) throw new Error('usePublicResetContext must be used within a PublicResetProvider');
  return context;
}
