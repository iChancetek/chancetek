import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";

export const servicesRouter = router({
  // Get all services
  listServices: publicProcedure.query(() => {
    const services = [
      {
        id: "generative-ai",
        title: "Generative AI",
        description: "Leverage cutting-edge generative AI models for content creation, ideation, and intelligent automation.",
        category: "AI Solutions",
        features: ["Text Generation", "Code Generation", "Creative Content", "Ideation & Brainstorming"],
      },
      {
        id: "agentic-ai",
        title: "Agentic AI Agents",
        description: "Deploy autonomous, goal-driven AI agents capable of multi-step reasoning and complex task execution.",
        category: "AI Solutions",
        features: ["Multi-step Reasoning", "Autonomous Execution", "Goal-driven Actions", "Adaptive Learning"],
      },
      {
        id: "rag-assistants",
        title: "RAG AI Assistants",
        description: "Build context-aware AI assistants that leverage your internal data for accurate, relevant responses.",
        category: "AI Solutions",
        features: ["Retrieval-Augmented Generation", "Context Awareness", "Knowledge Integration", "Real-time Updates"],
      },
      {
        id: "chatbots",
        title: "Chatbots & Conversational AI",
        description: "Deploy intelligent chatbots for customer engagement, support, and lead qualification.",
        category: "AI Solutions",
        features: ["Natural Language Processing", "Multi-channel Support", "24/7 Availability", "Sentiment Analysis"],
      },
      {
        id: "data-engineering",
        title: "Data Engineering",
        description: "Build robust data pipelines and infrastructure to maximize the potential of your data assets.",
        category: "Data & Infrastructure",
        features: ["ETL Pipelines", "Data Warehousing", "Stream Processing", "Data Quality Management"],
      },
      {
        id: "devops",
        title: "DevOps & Infrastructure",
        description: "Streamline operations with continuous integration, delivery, and deployment solutions.",
        category: "Data & Infrastructure",
        features: ["CI/CD Pipelines", "Infrastructure as Code", "Container Orchestration", "Monitoring & Logging"],
      },
      {
        id: "web-development",
        title: "Web Development",
        description: "End-to-end web and mobile application development with modern technologies and best practices.",
        category: "Development",
        features: ["Full-stack Development", "Responsive Design", "Progressive Web Apps", "Mobile Apps"],
      },
      {
        id: "cloud-services",
        title: "Cloud Services",
        description: "Multi-cloud optimization and management across AWS, Azure, and Google Cloud Platform.",
        category: "Data & Infrastructure",
        features: ["Cloud Migration", "Multi-cloud Strategy", "Cost Optimization", "Security & Compliance"],
      },
      {
        id: "graphic-design",
        title: "Graphic Design & Branding",
        description: "Create compelling visual identities and user experiences that resonate with your audience.",
        category: "Design",
        features: ["Brand Identity", "UI/UX Design", "Visual Assets", "Motion Graphics"],
      },
      {
        id: "it-management",
        title: "IT Management & Consulting",
        description: "End-to-end system monitoring, optimization, and strategic IT consulting for enterprise success.",
        category: "Consulting",
        features: ["System Monitoring", "Performance Optimization", "Security Audits", "Strategic Planning"],
      },
      {
        id: "fine-tuning",
        title: "Fine-tuning & Model Training",
        description: "Train domain-specific AI models tailored to your unique business requirements and data.",
        category: "AI Solutions",
        features: ["Custom Model Training", "Domain Adaptation", "Performance Optimization", "Continuous Learning"],
      },
      {
        id: "data-science",
        title: "Data Science & Analytics",
        description: "Extract actionable insights from your data through advanced analytics and machine learning.",
        category: "Data & Infrastructure",
        features: ["Predictive Analytics", "Statistical Analysis", "Business Intelligence", "Data Visualization"],
      },
    ];
    return services;
  }),

  // Get service details
  getService: publicProcedure
    .input(z.object({ serviceId: z.string() }))
    .query(({ input }) => {
      const services = [
        {
          id: "generative-ai",
          title: "Generative AI",
          description: "Leverage cutting-edge generative AI models for content creation, ideation, and intelligent automation.",
          longDescription:
            "Our Generative AI solutions empower your organization to create, ideate, and automate at scale. From content generation to code creation, we help you harness the power of large language models.",
          category: "AI Solutions",
          features: ["Text Generation", "Code Generation", "Creative Content", "Ideation & Brainstorming"],
          useCases: ["Content Marketing", "Code Assistance", "Creative Ideation", "Documentation Generation"],
          pricing: "Custom",
        },
        {
          id: "agentic-ai",
          title: "Agentic AI Agents",
          description: "Deploy autonomous, goal-driven AI agents capable of multi-step reasoning and complex task execution.",
          longDescription:
            "Build intelligent agents that can reason through complex problems, make decisions, and execute multi-step workflows autonomously.",
          category: "AI Solutions",
          features: ["Multi-step Reasoning", "Autonomous Execution", "Goal-driven Actions", "Adaptive Learning"],
          useCases: ["Process Automation", "Decision Support", "Complex Workflows", "Autonomous Operations"],
          pricing: "Custom",
        },
      ];
      return services.find((s) => s.id === input.serviceId);
    }),

  // Submit service inquiry
  submitInquiry: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        company: z.string().optional(),
        serviceId: z.string(),
        message: z.string().min(10),
      })
    )
    .mutation(async ({ input }) => {
      // Notify owner about the inquiry
      const success = await notifyOwner({
        title: "New Service Inquiry",
        content: `
Name: ${input.name}
Email: ${input.email}
Company: ${input.company || "Not provided"}
Service: ${input.serviceId}
Message: ${input.message}
        `,
      });

      if (!success) {
        throw new Error("Failed to submit inquiry");
      }

      return { success: true, message: "Inquiry submitted successfully" };
    }),

  // Get solutions
  listSolutions: publicProcedure.query(() => {
    const solutions = [
      {
        id: "computer-vision",
        title: "Computer Vision Solutions",
        description: "Extract actionable insights from images and videos using advanced computer vision technology.",
        useCases: ["Object Detection", "Image Classification", "Video Analysis", "Quality Control"],
      },
      {
        id: "executive-assistant",
        title: "Executive AI Assistant",
        description: "Intelligent assistant that manages scheduling, emails, tasks, and administrative workflows.",
        useCases: ["Calendar Management", "Email Automation", "Task Prioritization", "Meeting Summaries"],
      },
      {
        id: "ai-sdr",
        title: "AI SDR Agents",
        description: "Automate lead qualification, outreach, and follow-up with intelligent sales development agents.",
        useCases: ["Lead Qualification", "Outreach Automation", "Follow-up Management", "Pipeline Acceleration"],
      },
      {
        id: "voice-ai",
        title: "Voice AI Agents",
        description: "Deploy conversational voice support for inbound and outbound calls with natural language understanding.",
        useCases: ["Customer Support", "Lead Qualification", "Appointment Booking", "Survey Automation"],
      },
      {
        id: "rag-agents",
        title: "RAG Agents",
        description: "Provide accurate answers from internal company data using retrieval-augmented generation.",
        useCases: ["Knowledge Base Search", "Document Analysis", "Q&A Systems", "Internal Support"],
      },
      {
        id: "cag-agents",
        title: "Cache-Aware Agents (CAG)",
        description: "Optimized AI agents that leverage caching for improved performance and reduced latency.",
        useCases: ["Fast Response Times", "Cost Optimization", "Scalable Processing", "Real-time Analytics"],
      },
      {
        id: "rag-chatbots",
        title: "RAG Chatbots",
        description: "Real-time, data-driven conversational bots that learn from your business knowledge base.",
        useCases: ["Customer Service", "Product Support", "FAQ Automation", "Lead Engagement"],
      },
      {
        id: "agentic-systems",
        title: "Agentic AI Systems",
        description: "Autonomous, goal-driven multi-step AI agents capable of complex reasoning and execution.",
        useCases: ["Process Automation", "Decision Making", "Complex Workflows", "Adaptive Learning"],
      },
      {
        id: "llm-finetuning",
        title: "LLM Fine-Tuning",
        description: "Train domain-specific language models optimized for your unique business requirements.",
        useCases: ["Domain Adaptation", "Custom Terminology", "Industry-specific Knowledge", "Improved Accuracy"],
      },
      {
        id: "workflow-automation",
        title: "Workflow Automation",
        description: "End-to-end business process automation integrating AI, RPA, and intelligent workflows.",
        useCases: ["Process Optimization", "Error Reduction", "Cost Savings", "Productivity Gains"],
      },
      {
        id: "ai-sql",
        title: "AI SQL Agents",
        description: "Query databases in plain English and get real-time insights with natural language interfaces.",
        useCases: ["Natural Language Queries", "Real-time Analytics", "Data Exploration", "Report Generation"],
      },
      {
        id: "generative-platform",
        title: "Generative AI Platform",
        description: "Complete platform for content generation, ideation, and creative automation.",
        useCases: ["Content Creation", "Code Generation", "Design Assistance", "Ideation & Brainstorming"],
      },
    ];
    return solutions;
  }),

  // Get solution details
  getSolution: publicProcedure
    .input(z.object({ solutionId: z.string() }))
    .query(({ input }) => {
      const solutions = [
        {
          id: "computer-vision",
          title: "Computer Vision Solutions",
          description: "Extract actionable insights from images and videos using advanced computer vision technology.",
          useCases: ["Object Detection", "Image Classification", "Video Analysis", "Quality Control"],
          benefits: ["Real-time Analysis", "High Accuracy", "Scalable", "Cost-effective"],
        },
        {
          id: "executive-assistant",
          title: "Executive AI Assistant",
          description: "Intelligent assistant that manages scheduling, emails, tasks, and administrative workflows.",
          useCases: ["Calendar Management", "Email Automation", "Task Prioritization", "Meeting Summaries"],
          benefits: ["Time Savings", "Improved Productivity", "Better Organization", "24/7 Availability"],
        },
      ];
      return solutions.find((s) => s.id === input.solutionId);
    }),
});

