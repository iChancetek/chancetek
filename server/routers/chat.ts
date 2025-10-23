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
import { invokeLLM } from "../_core/llm";

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

      // Get conversation history for context
      const messages = await getChatMessages(input.conversationId);

      // Prepare messages for LLM
      const llmMessages = messages.map((msg) => ({
        role: msg.role as "user" | "assistant" | "system",
        content: msg.content,
      }));

      // Add current user message
      llmMessages.push({
        role: "user" as const,
        content: input.message,
      });

      // Get AI response
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are ChanceTEK's AI Assistant, an expert in IT services and AI solutions. You help users learn about our services including:
- Generative AI solutions
- Agentic AI Agents
- RAG AI Assistants
- Chatbots and conversational AI
- Data Engineering and Science
- DevOps and Cloud Services
- Web Development
- Graphic Design and IT Management

Be helpful, professional, and knowledgeable about our offerings. Provide detailed information about our services and guide users to the right solutions for their needs.`,
          },
          ...llmMessages,
        ],
      });

      const assistantMessage =
        typeof response.choices[0]?.message?.content === "string"
          ? response.choices[0].message.content
          : "I apologize, but I couldn't generate a response.";

      // Store assistant response
      await addChatMessage(input.conversationId, "assistant", assistantMessage);

      // Update conversation title if it's the first message
      if (messages.length === 0) {
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

