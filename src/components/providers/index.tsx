'use client';

import { SnackbarProvider } from 'notistack';

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <SnackbarProvider
      maxSnack={5}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {children}
    </SnackbarProvider>
  );
}
