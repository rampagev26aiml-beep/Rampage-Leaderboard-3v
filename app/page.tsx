import HeroSection from "@/components/home/hero-section"
import DomainCards from "@/components/home/domain-cards"
import ParticipantHandbook from "@/components/home/participant-handbook"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DomainCards />
      <ParticipantHandbook />
    </main>
  )
}
