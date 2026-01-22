"use client"

import Link from "next/link"
import SpotlightCard from "@/components/effects/spotlight-card"
import { Code, Brain, Cpu, Link2 } from "lucide-react"

const domains = [
  {
    title: "Web Dev",
    description: "Build modern, responsive web applications with cutting-edge technologies.",
    href: "/leaderboard/webdev",
    icon: Code,
    color: "rgba(82, 39, 255, 0.25)",
  },
  {
    title: "AIML",
    description: "Create intelligent solutions powered by machine learning and AI.",
    href: "/leaderboard/aiml",
    icon: Brain,
    color: "rgba(139, 92, 246, 0.25)",
  },
  {
    title: "IOT",
    description: "Connect devices and build smart systems with Internet of Things.",
    href: "/leaderboard/iot",
    icon: Cpu,
    color: "rgba(6, 182, 212, 0.25)",
  },
  {
    title: "Blockchain",
    description: "Develop decentralized applications and smart contracts.",
    href: "/leaderboard/blockchain",
    icon: Link2,
    color: "rgba(16, 185, 129, 0.25)",
  },
]

export default function DomainCards() {
  return (
    <section className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Domain
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select your competition domain to view the live leaderboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, index) => (
            <Link
              key={domain.title}
              href={domain.href}
              className="block"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.5s ease forwards ${index * 0.1}s`,
              }}
            >
              <SpotlightCard
                spotlightColor={domain.color}
                className="h-full cursor-pointer group"
              >
                <div className="flex flex-col h-full min-h-[200px]">
                  <div className="mb-4">
                    <domain.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {domain.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-grow">
                    {domain.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                    View Live Leaderboard
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
