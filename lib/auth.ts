import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./actions";
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
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials are missing");
        }

        console.log("credentials", credentials);
        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await getUser(email);
        console.log(user);

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("passwordMatch", passwordMatch);

        if (passwordMatch) {
          console.log("logged in");
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  debug: true,
}