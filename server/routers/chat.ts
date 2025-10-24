import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  createChatConversation,
  getChatConversations,
  getChatConversation,
  addChatMessage,
  getChatMessages,
  updateConversationTitle,
} from "../db";
import { suggestionFlow } from "../../src/genkit/menuSuggestionFlow"; // Corrected import path

export const chatRouter = router({
  // Create a new conversation
  createConversation: protectedProcedure
    .input(z.object({ title: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const conversation = await createChatConversation(ctx.user.id, input.title);
      return conversation;
    }),

  // Get all conversations for the current user
  listConversations: protectedProcedure.query(async ({ ctx }) => {
    return await getChatConversations(ctx.user.id);
  }),

  // Get a specific conversation with all messages
  getConversation: protectedProcedure
    .input(z.object({ conversationId: z.number() }))
    .query(async ({ ctx, input }) => {
      const conversation = await getChatConversation(input.conversationId);
      if (!conversation || conversation.userId !== ctx.user.id) {
        throw new Error("Conversation not found");
      }
      const messages = await getChatMessages(input.conversationId);
      return { conversation, messages };
    }),

  // Send a message and get AI response
  sendMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify conversation ownership
      const conversation = await getChatConversation(input.conversationId);
      if (!conversation || conversation.userId !== ctx.user.id) {
        throw new Error("Conversation not found");
      }

      // Add user message to database
      await addChatMessage(input.conversationId, "user", input.message);

      // Get AI response from the suggestion flow
      const assistantMessage = await suggestionFlow(input.message);

      // Store assistant response
      await addChatMessage(input.conversationId, "assistant", assistantMessage);

      // Update conversation title if it's the first message
      const messages = await getChatMessages(input.conversationId);
      if (messages.length === 1) {
        const title = input.message.substring(0, 50);
        await updateConversationTitle(input.conversationId, title);
      }

      return {
        userMessage: input.message,
        assistantMessage,
      };
    }),

  // Delete a conversation
  deleteConversation: protectedProcedure
    .input(z.object({ conversationId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const conversation = await getChatConversation(input.conversationId);
      if (!conversation || conversation.userId !== ctx.user.id) {
        throw new Error("Conversation not found");
      }
      // TODO: Implement soft delete or actual deletion
      return { success: true };
    }),
});
