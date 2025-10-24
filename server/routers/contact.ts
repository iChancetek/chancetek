import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { db } from "../db";

export const contactRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        company: z.string().optional(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await db.contact.create({
          data: {
            name: input.name,
            email: input.email,
            company: input.company,
            message: input.message,
          },
        });
        return { success: true };
      } catch (error) {
        console.error("Error saving contact form data:", error);
        return { success: false, message: "Failed to save contact information." };
      }
    }),
});
