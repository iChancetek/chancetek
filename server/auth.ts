
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import * as s from "drizzle/schema";
import { Auth, type AuthConfig } from "@auth/core";
import Google from "@auth/core/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const AUTH_SECRET = process.env.AUTH_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment"
  );
}

if (!AUTH_SECRET) {
  throw new Error("Missing AUTH_SECRET in environment");
}

export const authConfig: AuthConfig = {
  adapter: DrizzleAdapter(db, s),
  secret: AUTH_SECRET,
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};

export const auth = (req: Request, res: Response) => Auth(req, authConfig);
