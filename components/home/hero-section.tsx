"use client"

import { useEffect, useState } from "react"

const quotes = [
  "Think smart. Build steadily. Improve continuously.",
  "No eliminations. No shortcuts. Only progress.",
  "24 hours of pure innovation.",
  "Your ideas, refined through every checkpoint.",
]

export default function HeroSection() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
        setIsVisible(true)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Title */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide">
            24-HOUR HACKATHON
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-tight mb-6">
          <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
            RAMpage
          </span>
          <span className="text-primary ml-4">v2.6</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          A 24-hour continuous innovation challenge
        </p>

        {/* Animated Quote */}
        <div className="h-16 flex items-center justify-center">
          <p
            className={`text-lg md:text-xl text-foreground/80 italic transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            &ldquo;{quotes[currentQuote]}&rdquo;
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm">Explore Domains</span>
            <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
    </section>
  )
}
