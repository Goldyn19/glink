import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const response = await fetch(process.env.BACK_END_URL + '/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        if (response.status === 200) {
          const data: LoginResponse = await response.json();
          if (data.tokens) {
            const accessToken = data.tokens.access;
            const user: User = { ...data.user, accessToken };
            return user;
          } else {
            throw new Error('Invalid username or password');
          }
        } else {
          console.log(response);
          throw new Error('No Server Response');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.tokens?.access;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/',  // Customize the login page URL
  }
});



export { handler as GET, handler as POST }