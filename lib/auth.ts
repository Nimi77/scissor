import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        try {
          // Query to find user by email
          const response =
            await sql`SELECT * FROM users WHERE email = ${credentials.email}`;
          const user = response.rows[0];

          // Check if user exists
          if (!user) {
            throw new Error("No user found with this email");
          }

          // Compare passwords
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // Check if passwords match
          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }

          // Return user data if authentication is successful
          return { id: user.id, email: user.email };
        } catch (error) {
          throw new Error("Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};
