import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { create_new_user } from "./app/api/database/database"

//Derived from https://www.youtube.com/watch?v=I_YCC_nFt70
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    async session({session})
    {
      return session
    },
    async signIn({profile})
    {
      await create_new_user(profile?.name || "Name", profile?.email || "example@example.co.uk");
      return true;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
        },
    }
}) 