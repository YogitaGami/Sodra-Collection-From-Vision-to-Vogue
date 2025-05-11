import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // ✅ shared config
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
