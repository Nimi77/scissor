import { sql } from "@vercel/postgres";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "process.env.NEXTAUTH_SECRET",
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        try {
          const response =
            await sql`SELECT * FROM users WHERE email = ${credentials.email}`;

          const user = response.rows[0];

          if (!user) return null;

          const passwordCorrect = await compare(
            credentials.password,
            user.password
          );

          if (!passwordCorrect) {
            return null;
          } else {
            return { id: user.id, email: user.email };
          }
        } catch (error) {
          console.log("Error", error);
          return null;
        }
      },
    }),
  ],
  // callbacks: {
  //   async signIn({ user, credentials }) {
  //     const isAllowedToSignIn = "true";

  //     if (isAllowedToSignIn) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  //   async redirect({ url, baseUrl }) {
  //     if (url.startsWith("/")) return `${url}`;
  //     return baseUrl;
  //   },
  //   async session({ session, token }) {
  //     session.user = token.user as typeof session.user;
  //     return session;
  //   },
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.user = user;
  //     }
  //     return token;
  //   },
  // },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
