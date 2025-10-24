import React from 'react';
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles, Brain, Zap, Shield, TrendingUp, Code2 } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                  Shape the Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">ChanceTEK</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your trusted IT Services and AI Solutions Partner. Harness the power of generative AI, intelligent agents, and cutting-edge technology to transform your business.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Explore Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-96 lg:h-full hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-3xl p-8 backdrop-blur-sm border border-blue-500/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Brain className="w-8 h-8 text-blue-400" />
                    <span className="text-sm font-semibold">AI-Powered Solutions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-8 h-8 text-purple-400" />
                    <span className="text-sm font-semibold">Lightning-Fast Deployment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-400" />
                    <span className="text-sm font-semibold">Enterprise Security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Core Modules</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI-driven solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Generative AI", description: "Create, ideate, and generate content with advanced AI models", icon: Sparkles },
              { title: "Agentic AI Agents", description: "Autonomous, goal-driven multi-step AI agents for complex tasks", icon: Brain },
              { title: "RAG AI Assistants", description: "Context-specific AI task agents with retrieval-augmented generation", icon: TrendingUp },
              { title: "Chatbots", description: "Real-time, data-driven conversational bots for customer engagement", icon: Code2 },
              { title: "Fine-Tuning", description: "Train domain-specific models for your unique business requirements", icon: Zap },
              { title: "Data Science", description: "Advanced analytics and insights from your business data", icon: TrendingUp },
            ].map((module, idx) => {
              const Icon = module.icon;
              return (
                <div key={idx} className="p-6 rounded-xl bg-card border border-border hover:border-blue-500/50 transition-colors">
                  <Icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                  <p className="text-muted-foreground">{module.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Modules Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Additional Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete suite of services to support your digital transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Data Engineering",
              "DevOps",
              "Web Development",
              "Graphic Design",
              "IT Management",
              "Cloud Services",
            ].map((service, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 hover:border-blue-500/50 transition-colors">
                <h3 className="text-lg font-semibold">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Transform Your Business?</h2>
          <p className="text-lg text-muted-foreground">
            Let's discuss how ChanceTEK's AI solutions can drive innovation and growth for your organization.
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
