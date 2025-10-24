
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import * as s from "drizzle/schema";
import { Auth, type AuthConfig } from "@auth/core";
import Google from "@auth/core/providers/google";
import { ENV } from "./_core/env";

if (!ENV.google.clientId || !ENV.google.clientSecret) {
  throw new Error(
    "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in .env.local"
  );
}

export const authConfig: AuthConfig = {
  adapter: DrizzleAdapter(db, s),
  secret: ENV.authSecret,
  providers: [
    Google({
      clientId: ENV.google.clientId,
      clientSecret: ENV.google.clientSecret,
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
