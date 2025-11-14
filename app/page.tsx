"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/client";

export default function Home() {
  const { data: user, isLoading } = trpc.auth.me.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MD</span>
            </div>
            <h1 className="text-xl font-bold">Mr.Dark AI Agent</h1>
          </div>
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="h-10 w-24 bg-muted animate-pulse rounded-md" />
            ) : user ? (
              <Button asChild>
                <Link href="/chat">Go to Chat</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              AI Agent Platform
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              The ultimate AI assistant that combines the power of Codex, GPT, Claude, Cursor, and Manus.
              Execute code, browse the web, analyze data, and more - all in one place.
            </p>
            <div className="flex items-center justify-center space-x-4">
              {user ? (
                <Button size="lg" asChild>
                  <Link href="/chat">Start Chatting</Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link href="/login">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#features">Learn More</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <h3 className="text-3xl font-bold text-center mb-12">Powerful Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="💻"
              title="Code Execution"
              description="Run Python, JavaScript, and more in isolated sandbox environments"
            />
            <FeatureCard
              icon="🌐"
              title="Browser Automation"
              description="Automate web browsing, scraping, and form filling with Playwright"
            />
            <FeatureCard
              icon="📊"
              title="Data Analysis"
              description="Analyze data with pandas, create visualizations, and generate insights"
            />
            <FeatureCard
              icon="🔍"
              title="Web Search"
              description="Search the web, news, images, and more to get real-time information"
            />
            <FeatureCard
              icon="🎨"
              title="Image Generation"
              description="Generate images with DALL-E and Stable Diffusion"
            />
            <FeatureCard
              icon="🤖"
              title="Multi-Model Support"
              description="Choose from GPT-4, Claude 3, Gemini, and more"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Mr.Dark AI Agent Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}
