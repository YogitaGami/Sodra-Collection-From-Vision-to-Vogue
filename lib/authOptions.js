import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
// import mongoose from "mongoose";
import User from "@/models/user";
// import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb"; // see below
import resend from "@/lib/resend";

export const authOptions = {
        adapter: MongoDBAdapter(clientPromise),
        session: {
          strategy: "database", // USE database strategy since you are using a sessions collection
        },
        // Configure one or more authentication providers
        providers: [
          GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
          }),
          // Passwordless / email sign in
          //   EmailProvider({
          //     server: process.env.MAIL_SERVER,
          //     from: 'NextAuth.js <no-reply@example.com>'
          //   }),
          EmailProvider({
            from: process.env.RESEND_EMAIL_FROM,
            async sendVerificationRequest({ identifier: email, url }) {
              const result = await resend.emails.send({
                from: process.env.RESEND_EMAIL_FROM,
                to: email,
                subject: "Your Magic Login Link",
                html: `
                  <div style="font-family: sans-serif;">
                    <h2>Welcome back 👋</h2>
                    <p>Click the link below to sign in:</p>
                    <a href="${url}" style="color:pink;">Sign in</a>
                  </div>
                  `,
              });
      
              if (result.error) {
                throw new Error(`Email send failed: ${result.error.message}`);
              }
            },
          }),
        ],
        callbacks: {
          async signIn({ user, account, profile }) {
            try {
              await connectDB();
              const email =
                account.provider === "github" || account.provider === "google"
                  ? profile.email
                  : user.email;
              if (!email) {
                console.error("Email is undefined or null");
                return false;
              }
              console.log("Email:", email);
      
              // Check if user already exists in the database
              const currentUser = await User.findOne({ email: email });
              console.log("Current user:", currentUser);
      
              if (!currentUser) {
                const isAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
                // Create a new user
                const newUser = new User({
                  email: email,
                  username: email.split("@")[0],
                  role: isAdmin ? "admin" : "user",
                });
                await newUser.save();
                console.log("New user created:", newUser);
              } else {
                console.log("User already exists:", currentUser);
              }
            } catch (error) {
              console.error("Error in signIn callback:", error);
              return res.status(500).json({ error: "Internal Server Error" });
            }
            return true;
          },
          async session({ session }) {
            try {
              await connectDB();
              if (!session?.user?.email) return session;
              console.log(session?.user?.id);
              // Look up the user in the Sodra DB using the email
              const sodraUser = await User.findOne({ email: session.user.email });
              // const dbUser = await User.findOne({ email: session.user.email });
      
              // if (dbUser) {
              //   session.user.name = dbUser.username;
              //   session.user.role = dbUser.role;
              // }
      
              if (sodraUser) {
                // Override NextAuth session user info with correct Sodra user fields
                session.user.id = sodraUser._id.toString(); // your Sodra DB _id
                session.user.name = sodraUser.username;     // your custom field
                session.user.role = sodraUser.role;         // 'admin' or 'user'
              } else {
                console.warn("No matching user found in Sodra DB for session");
              }
              console.log("SESSION CALLBACK: Returning session", session);
              return session;
            } catch (error) {
              console.error("Session error:", error);
              return session;
            }
          },
        },
        // pages: {
        //   signIn: "/auth/signin",
        // },
      }
