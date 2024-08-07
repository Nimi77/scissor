import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log("Received credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          const response = await sql`
            SELECT * FROM users WHERE email = ${credentials.email}
          `;
          const user = response.rows[0];

          console.log("Database response:", user);

          if (!user) {
            console.error("No user found with the given email");
            return null;
          }

          // Compare hashed password
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          console.log("Password comparison result:", isPasswordCorrect);

          if (!isPasswordCorrect) {
            console.error("Invalid credentials");
            return null;
          }
    
          return {
            id: user.id,
            email: user.email,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
};

export default authOptions;