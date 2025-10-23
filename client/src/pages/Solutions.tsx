import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Brain, Eye, Phone, Users, Database, Zap, MessageSquare, Cpu } from "lucide-react";

export default function Solutions() {
  const solutions = [
    {
      title: "Computer Vision Solutions",
      description: "Extract actionable insights from images and videos using advanced computer vision technology.",
      icon: Eye,
      useCases: ["Object Detection", "Image Classification", "Video Analysis", "Quality Control"]
    },
    {
      title: "Executive AI Assistant",
      description: "Intelligent assistant that manages scheduling, emails, tasks, and administrative workflows.",
      icon: Users,
      useCases: ["Calendar Management", "Email Automation", "Task Prioritization", "Meeting Summaries"]
    },
    {
      title: "AI SDR Agents",
      description: "Automate lead qualification, outreach, and follow-up with intelligent sales development agents.",
      icon: Zap,
      useCases: ["Lead Qualification", "Outreach Automation", "Follow-up Management", "Pipeline Acceleration"]
    },
    {
      title: "Voice AI Agents",
      description: "Deploy conversational voice support for inbound and outbound calls with natural language understanding.",
      icon: Phone,
      useCases: ["Customer Support", "Lead Qualification", "Appointment Booking", "Survey Automation"]
    },
    {
      title: "RAG Agents",
      description: "Provide accurate answers from internal company data using retrieval-augmented generation.",
      icon: Database,
      useCases: ["Knowledge Base Search", "Document Analysis", "Q&A Systems", "Internal Support"]
    },
    {
      title: "Cache-Aware Agents (CAG)",
      description: "Optimized AI agents that leverage caching for improved performance and reduced latency.",
      icon: Cpu,
      useCases: ["Fast Response Times", "Cost Optimization", "Scalable Processing", "Real-time Analytics"]
    },
    {
      title: "RAG Chatbots",
      description: "Real-time, data-driven conversational bots that learn from your business knowledge base.",
      icon: MessageSquare,
      useCases: ["Customer Service", "Product Support", "FAQ Automation", "Lead Engagement"]
    },
    {
      title: "Agentic AI Systems",
      description: "Autonomous, goal-driven multi-step AI agents capable of complex reasoning and execution.",
      icon: Brain,
      useCases: ["Process Automation", "Decision Making", "Complex Workflows", "Adaptive Learning"]
    },
    {
      title: "LLM Fine-Tuning",
      description: "Train domain-specific language models optimized for your unique business requirements.",
      icon: Zap,
      useCases: ["Domain Adaptation", "Custom Terminology", "Industry-specific Knowledge", "Improved Accuracy"]
    },
    {
      title: "Workflow Automation",
      description: "End-to-end business process automation integrating AI, RPA, and intelligent workflows.",
      icon: Cpu,
      useCases: ["Process Optimization", "Error Reduction", "Cost Savings", "Productivity Gains"]
    },
    {
      title: "AI SQL Agents",
      description: "Query databases in plain English and get real-time insights with natural language interfaces.",
      icon: Database,
      useCases: ["Natural Language Queries", "Real-time Analytics", "Data Exploration", "Report Generation"]
    },
    {
      title: "Generative AI Platform",
      description: "Complete platform for content generation, ideation, and creative automation.",
      icon: Brain,
      useCases: ["Content Creation", "Code Generation", "Design Assistance", "Ideation & Brainstorming"]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold">AI & Automation Solutions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge AI agents, chatbots, and automation solutions to transform your business operations
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, idx) => {
              const Icon = solution.icon;
              return (
                <div
                  key={idx}
                  className="group p-8 rounded-xl bg-card border border-border hover:border-purple-500/50 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                  <p className="text-muted-foreground mb-6">{solution.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Use Cases:</p>
                    <ul className="space-y-2">
                      {solution.useCases.map((useCase, uidx) => (
                        <li key={uidx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose ChanceTEK?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "AI-Powered", description: "Leverage latest AI models and technologies" },
              { title: "Scalable", description: "Solutions that grow with your business" },
              { title: "Secure", description: "Enterprise-grade security and compliance" },
              { title: "Expert Team", description: "Experienced AI and automation specialists" },
            ].map((benefit, idx) => (
              <div key={idx} className="text-center space-y-3">
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Implement AI Solutions?</h2>
          <p className="text-lg text-muted-foreground">
            Let's explore how our AI solutions can automate and optimize your business processes.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
              Start Your AI Journey
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

