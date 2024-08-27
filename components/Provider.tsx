"use client";

import { Session } from '@node_modules/next-auth/core/types';
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react';

const Provider = ({children, session}: { children: React.JSX.Element, session: Session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
