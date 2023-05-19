
import jwtDecode from "jwt-decode";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginUser, My_auth_token, UserSession } from "types/next-auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/token/", credentials);
          const data = res.data;

          if (res.status === 200) {
            const user: LoginUser = {
              token: data,
              myusername: credentials?.username,
            };
            return user as any;
          } else {
            // throw new Error(data.message || "Failed to log in");
            return null
          }
        } catch (error) {
          // throw new Error("Failed to log in");
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const tokenPayload: UserSession = jwtDecode(user.token.access);
        token.my_user = tokenPayload;
        token.my_auth_token = user.token;
      }

      return token;
    },

    async session({ session, token }) {
      session.token = token.my_auth_token as My_auth_token;
      session.user = token.my_user as UserSession;

      return session;
    },
  },
});
