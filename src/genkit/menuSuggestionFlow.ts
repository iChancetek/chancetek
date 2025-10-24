import dotenv from 'dotenv';
import { genkit } from 'genkit';
import openAI, { gpt4o } from 'genkitx-openai';
import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { formatDocumentsAsString } from 'langchain/util/document';
import { SimpleDocumentStore } from 'langchain/storage';
import { GenkitTracer } from 'langchain/callbacks';
import { readFileSync } from 'fs';

dotenv.config();

const ai = genkit({
  plugins: [openAI({ apiKey: process.env.OPENAI_API_KEY })],
  model: gpt4o,
});

// Load and process the knowledge base
const knowledgeBaseContent = readFileSync('rag/knowledge_base.md', 'utf-8');
const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 512, chunkOverlap: 64 });
const splitDocs = await splitter.splitDocuments([
  new Document({ pageContent: knowledgeBaseContent }),
]);

// Create a retriever
const store = new SimpleDocumentStore();
await store.addDocuments(splitDocs);
const retriever = store.asRetriever();

export const suggestionFlow = ai.defineFlow(
  {
    name: 'suggestionFlow',
    inputSchema: { type: 'string' },
    outputSchema: { type: 'string' },
  },
  async (prompt: string) => {
    // Retrieve relevant documents
    const relevantDocs = await retriever.getRelevantDocuments(prompt, {
      callbacks: [new GenkitTracer()],
    });

    // Generate a response
    const response = await ai.generate({
      model: gpt4o,
      prompt: `Based on the following context, please answer the question.

Context:
${formatDocumentsAsString(relevantDocs)}

Question:
${prompt}`,
    });

    return response.text;
  }
);
