// [...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface LoginResponse {
  tokens: {
    access: string;
    refresh: string;
  };
  user: {
    id: string;
    email: string;
    // Add other user fields as needed
  };
}

interface User {
  id: string;
  email: string;
  accessToken: string;
  // Add other user fields as needed
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const response = await fetch(process.env.BACK_END_URL + '/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          const data: LoginResponse = await response.json();
          if (data.tokens) {
            const accessToken = data.tokens.access;
            const user: User = { ...data.user, accessToken };
            return user;
          } else {
            throw new Error('Invalid username or password');
          }
        } else {
          console.error(response);
          throw new Error('No Server Response');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as User;  // Cast user to your custom User type
        token.id = customUser.id;
        token.accessToken = customUser.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {}; // Ensure session.user is initialized
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    maxAge: 2 * 60 * 60, // 2 hours in seconds
    updateAge: 60 * 60,  // Update session every hour (optional)
  },
  pages: {
    signIn: '/', // Customize the login page URL
  },
});

export { handler as GET, handler as POST };
