import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getGoogleOAuthURL, getGoogleUser } from "../_core/oauth";
import { setCookie } from "../_core/cookies";
import { db } from "../db";

export const authRouter = router({
  user: publicProcedure.query(async ({ ctx }) => {
    if (ctx.user) {
      return ctx.user;
    }
    return null;
  }),

  googleLogin: publicProcedure.query(() => {
    return { url: getGoogleOAuthURL() };
  }),

  googleCallback: publicProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ input, ctx }) => {
      const googleUser = await getGoogleUser({ code: input.code });
      let user = await db.user.findUnique({ where: { email: googleUser.email } });

      if (!user) {
        user = await db.user.create({
          data: {
            email: googleUser.email,
            name: googleUser.name,
            image: googleUser.picture,
          },
        });
      }

      const session = await db.session.create({
        data: {
          userId: user.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        },
      });

      setCookie(ctx.res, "session", session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: session.expiresAt,
      });

      return { success: true };
    }),

  logout: publicProcedure.mutation(async ({ ctx }) => {
    if (ctx.sessionId) {
      await db.session.delete({ where: { id: ctx.sessionId } });
      setCookie(ctx.res, "session", "", { expires: new Date(0), path: "/" });
    }
    return { success: true };
  }),
});
