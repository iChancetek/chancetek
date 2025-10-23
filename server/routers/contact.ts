import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";

export const contactRouter = router({
  // Submit contact form
  submitContactForm: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        company: z.string().optional(),
        message: z.string().min(10, "Message must be at least 10 characters"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Notify owner about the contact form submission
        const success = await notifyOwner({
          title: "New Contact Form Submission",
          content: `
Name: ${input.name}
Email: ${input.email}
Company: ${input.company || "Not provided"}
Message: ${input.message}
Timestamp: ${new Date().toISOString()}
          `,
        });

        if (!success) {
          throw new Error("Failed to send notification");
        }

        return {
          success: true,
          message: "Thank you for your message! We'll get back to you soon.",
        };
      } catch (error) {
        console.error("Contact form submission error:", error);
        throw new Error("Failed to submit contact form");
      }
    }),

  // Subscribe to newsletter
  subscribeNewsletter: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email address"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Notify owner about newsletter subscription
        const success = await notifyOwner({
          title: "New Newsletter Subscription",
          content: `
Email: ${input.email}
Timestamp: ${new Date().toISOString()}
          `,
        });

        if (!success) {
          throw new Error("Failed to subscribe");
        }

        return {
          success: true,
          message: "Successfully subscribed to our newsletter!",
        };
      } catch (error) {
        console.error("Newsletter subscription error:", error);
        throw new Error("Failed to subscribe to newsletter");
      }
    }),

  // Request demo
  requestDemo: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        company: z.string().optional(),
        service: z.string(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Notify owner about demo request
        const success = await notifyOwner({
          title: "New Demo Request",
          content: `
Name: ${input.name}
Email: ${input.email}
Company: ${input.company || "Not provided"}
Service: ${input.service}
Message: ${input.message || "No additional message"}
Timestamp: ${new Date().toISOString()}
          `,
        });

        if (!success) {
          throw new Error("Failed to submit demo request");
        }

        return {
          success: true,
          message: "Demo request submitted successfully! We'll be in touch soon.",
        };
      } catch (error) {
        console.error("Demo request error:", error);
        throw new Error("Failed to submit demo request");
      }
    }),
});

