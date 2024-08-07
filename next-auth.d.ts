// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: string;
    accessToken: string;
  }

  interface User {
    id: string;
    tokens?: {
      access: string;
    };
  }

  interface JWT {
    id?: string;
    accessToken?: string;
  }
}
