'use client';

import { ReactNode } from 'react';
import { SnackbarProvider as NotistackProvider, SnackbarOrigin } from 'notistack';

type Props = {
  children: ReactNode;
};

export default function SnackbarProvider({ children }: Props) {
  const snackbarOrigin: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'right',
  };

  return (
    <NotistackProvider maxSnack={5} autoHideDuration={3000} anchorOrigin={snackbarOrigin}>
      {children}
    </NotistackProvider>
  );
}
