import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/utils";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      async authorize(credentials){
        await connectDB()

        try {
          const existingUser = await User.findOne({email: credentials.email})
          if (!existingUser) {
            throw new Error("User doesn't exist")
          }

          if (existingUser && bcrypt.compare(existingUser.password, credentials.password)) {
            return existingUser
          }else {
            throw new Error("Password is incorrect")
          }
          
        } catch (error) {
          throw new Error(error)
        }
      }
    }
    ),
    
  ],
  pages: {
    error: "/login"
  }
});

export { handler as GET, handler as POST };
