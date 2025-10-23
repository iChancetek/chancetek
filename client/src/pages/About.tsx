import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Users, Zap, Target } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900/20 to-transparent">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold">About ChanceTEK</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Shaping the future of technology through innovative AI solutions and expert IT services
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Who We Are</h2>
              <p className="text-lg text-muted-foreground">
                ChanceTEK is a leading IT services and AI solutions provider dedicated to helping organizations transform their operations through cutting-edge technology and intelligent automation.
              </p>
              <p className="text-lg text-muted-foreground">
                With a team of experienced engineers, data scientists, and AI specialists, we deliver tailored solutions that drive innovation, improve efficiency, and unlock new business opportunities.
              </p>
              <p className="text-lg text-muted-foreground">
                Our mission is to empower businesses of all sizes to harness the power of artificial intelligence and modern technology to achieve their strategic goals.
              </p>
            </div>
            <div className="relative h-96 hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-3xl p-8 backdrop-blur-sm border border-blue-500/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Zap className="w-16 h-16 text-blue-400 mx-auto" />
                  <h3 className="text-2xl font-bold">Innovation First</h3>
                  <p className="text-muted-foreground">Pushing boundaries with cutting-edge AI and technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Excellence",
                description: "Committed to delivering the highest quality solutions and services"
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "Working closely with clients to understand and exceed their expectations"
              },
              {
                icon: Zap,
                title: "Innovation",
                description: "Continuously exploring new technologies and methodologies"
              },
              {
                icon: Award,
                title: "Integrity",
                description: "Building trust through transparency and ethical business practices"
              },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="text-center space-y-4 p-6 rounded-xl bg-card border border-border">
                  <Icon className="w-12 h-12 text-blue-400 mx-auto" />
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Generative AI",
                items: ["Large Language Models", "Content Generation", "Code Generation", "AI Fine-tuning"]
              },
              {
                title: "AI Agents & Automation",
                items: ["Autonomous Agents", "Workflow Automation", "RPA Solutions", "Intelligent Bots"]
              },
              {
                title: "Data & Cloud",
                items: ["Data Engineering", "Cloud Architecture", "DevOps", "Data Science"]
              },
            ].map((expertise, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20">
                <h3 className="text-2xl font-semibold mb-6">{expertise.title}</h3>
                <ul className="space-y-3">
                  {expertise.items.map((item, iidx) => (
                    <li key={iidx} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Projects Delivered" },
              { number: "100+", label: "Happy Clients" },
              { number: "25+", label: "Team Members" },
              { number: "5+", label: "Years of Experience" },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-4xl font-bold text-blue-400">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Join Us on This Journey</h2>
          <p className="text-lg text-muted-foreground">
            Whether you're looking to implement AI solutions or transform your IT infrastructure, we're here to help.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

