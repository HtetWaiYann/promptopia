import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider(
            {
                clientId: process.env.GOOGLE_CLIENT_ID ?? "",
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            }
        )
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user }) {
            try {
                await connectDB();
                // check if user exists in database
                const userExists = await User.findOne({ email: user?.email });
    
                // if not, create user
                if (!userExists) {
                    User.create({
                        email: user?.email,
                        username: user?.name?.replaceAll(" ", "").toLowerCase(),
                        image: user?.image,
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async session({ session }) {
            await connectDB();

            const sessionUser = await User.findOne({ email: session?.user?.email });
            if (session && session.user) {
                session.user.id = sessionUser?._id.toString();
            }

            return session;
        }
    }
});

export { handler as GET, handler as POST };