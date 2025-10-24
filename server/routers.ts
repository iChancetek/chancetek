import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { chatRouter } from "./routers/chat";
import { servicesRouter } from "./routers/services";
import { contactRouter } from "./routers/contact";
import { authRouter } from "./routers/auth";

export const appRouter = router({
  system: systemRouter,

  auth: authRouter,

  chat: chatRouter,
  services: servicesRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
