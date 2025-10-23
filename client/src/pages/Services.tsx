import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Code2, Database, Cloud, Palette, Settings, Zap, TrendingUp, Shield } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Generative AI",
      description: "Leverage cutting-edge generative AI models for content creation, ideation, and intelligent automation.",
      icon: Zap,
      features: ["Text Generation", "Code Generation", "Creative Content", "Ideation & Brainstorming"]
    },
    {
      title: "Agentic AI Agents",
      description: "Deploy autonomous, goal-driven AI agents capable of multi-step reasoning and complex task execution.",
      icon: TrendingUp,
      features: ["Multi-step Reasoning", "Autonomous Execution", "Goal-driven Actions", "Adaptive Learning"]
    },
    {
      title: "RAG AI Assistants",
      description: "Build context-aware AI assistants that leverage your internal data for accurate, relevant responses.",
      icon: Database,
      features: ["Retrieval-Augmented Generation", "Context Awareness", "Knowledge Integration", "Real-time Updates"]
    },
    {
      title: "Chatbots & Conversational AI",
      description: "Deploy intelligent chatbots for customer engagement, support, and lead qualification.",
      icon: Code2,
      features: ["Natural Language Processing", "Multi-channel Support", "24/7 Availability", "Sentiment Analysis"]
    },
    {
      title: "Data Engineering",
      description: "Build robust data pipelines and infrastructure to maximize the potential of your data assets.",
      icon: Database,
      features: ["ETL Pipelines", "Data Warehousing", "Stream Processing", "Data Quality Management"]
    },
    {
      title: "DevOps & Infrastructure",
      description: "Streamline operations with continuous integration, delivery, and deployment solutions.",
      icon: Settings,
      features: ["CI/CD Pipelines", "Infrastructure as Code", "Container Orchestration", "Monitoring & Logging"]
    },
    {
      title: "Web Development",
      description: "End-to-end web and mobile application development with modern technologies and best practices.",
      icon: Code2,
      features: ["Full-stack Development", "Responsive Design", "Progressive Web Apps", "Mobile Apps"]
    },
    {
      title: "Cloud Services",
      description: "Multi-cloud optimization and management across AWS, Azure, and Google Cloud Platform.",
      icon: Cloud,
      features: ["Cloud Migration", "Multi-cloud Strategy", "Cost Optimization", "Security & Compliance"]
    },
    {
      title: "Graphic Design & Branding",
      description: "Create compelling visual identities and user experiences that resonate with your audience.",
      icon: Palette,
      features: ["Brand Identity", "UI/UX Design", "Visual Assets", "Motion Graphics"]
    },
    {
      title: "IT Management & Consulting",
      description: "End-to-end system monitoring, optimization, and strategic IT consulting for enterprise success.",
      icon: Settings,
      features: ["System Monitoring", "Performance Optimization", "Security Audits", "Strategic Planning"]
    },
    {
      title: "Fine-tuning & Model Training",
      description: "Train domain-specific AI models tailored to your unique business requirements and data.",
      icon: Zap,
      features: ["Custom Model Training", "Domain Adaptation", "Performance Optimization", "Continuous Learning"]
    },
    {
      title: "Data Science & Analytics",
      description: "Extract actionable insights from your data through advanced analytics and machine learning.",
      icon: TrendingUp,
      features: ["Predictive Analytics", "Statistical Analysis", "Business Intelligence", "Data Visualization"]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900/20 to-transparent">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive suite of IT services and AI solutions designed to drive innovation and growth
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="group p-8 rounded-xl bg-card border border-border hover:border-blue-500/50 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Need a Custom Solution?</h2>
          <p className="text-lg text-muted-foreground">
            Let's discuss how we can tailor our services to meet your specific business needs.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Schedule a Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

