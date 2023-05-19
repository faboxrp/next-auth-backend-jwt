import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

interface My_auth_token {
  access: string,
  refresh: string,
}

interface LoginUser {
  token: My_auth_token,
  myusername?: string,
}

interface UserSession {
  user_id: number;
  username: string;
  email: string;
  token_type: string;
  jti: string;
  iat: number;
  exp: number;
}

declare module "next-auth/jwt" {
  interface JWT {
    my_auth_token?: My_auth_token,
    my_user?: UserSession
  }
}

declare module "next-auth" {

  interface User extends LoginUser {

  }

  // interface User {
  //   my_auth_token?: My_auth_token,
  //   my_user?: UserSession,

  // }

  // interface Token {
  //   my_access_token?: My_access_token,
  // }

  interface Session {
    user: UserSession,
    token: My_auth_token,
  }
}





