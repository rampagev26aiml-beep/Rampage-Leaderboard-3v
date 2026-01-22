import React from "react"
import { Clock, Target, Bot, AlertTriangle, Trophy } from "lucide-react"

export default function ParticipantHandbook() {
  return (
    <section className="relative px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Participant Handbook
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            RAMpage is not a typical hackathon. It is a 24-hour innovation experience
            designed to test thinking, consistency, improvement, and real-world
            feasibility, not just coding speed.
          </p>
          <p className="text-primary mt-4 font-medium">
            Evaluation is continuous, with multiple checkpoints and a live leaderboard
            till the very end.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Timeline */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">
                Event Timeline (24 Hours)
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Hackathon Duration: 9:00 AM - 9:00 AM (Next Day)
            </p>

            <div className="space-y-4">
              <TimelineRound
                title="ROUND 1: IDEATION SPRINT"
                items={["CP1: Rapid Quiz", "CP2: Idea Defense", "CP3: One-Page PPT Pitch"]}
              />
              <TimelineRound
                title="ROUND 2: DESIGN → BUILD"
                items={[
                  "CP4: Architecture / Flow Design",
                  "Build Windows",
                  "CP5: Mid-Build Progress Check",
                ]}
              />
              <TimelineRound
                title="ROUND 3: NIGHT STRATEGY & MATURITY"
                items={[
                  "CP6: Innovation Booster",
                  "CP7: Usability & Accessibility",
                  "CP8: Testing & Failure Handling",
                ]}
              />
            </div>
          </div>

          {/* Evaluation & Leaderboard */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">
                Evaluation & Leaderboard
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <ScoreCard label="Total Score" value="100 Points" />
                <ScoreCard label="CP1-CP8" value="70 Points" />
                <ScoreCard label="Final Jury" value="30 Points" />
                <ScoreCard label="Eliminations" value="None" highlight />
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4">
                <p className="text-foreground text-sm">
                  Rankings can change till the end. Stay focused and keep improving!
                </p>
              </div>
            </div>
          </div>

          {/* AI vs Human Evaluation */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bot className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">
                AI vs Human Evaluation
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                  AI Evaluated
                </p>
                <p className="text-foreground font-medium">CP1 to CP4</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                  Human Evaluated
                </p>
                <p className="text-foreground font-medium">CP5 to CP8 + Jury</p>
              </div>
            </div>
          </div>

          {/* Important Rules */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <h3 className="text-xl font-semibold text-foreground">Important Rules</h3>
            </div>

            <ul className="space-y-3">
              <RuleItem>Teams must attend all checkpoints</RuleItem>
              <RuleItem>Skipping a checkpoint gives zero points</RuleItem>
              <RuleItem>Teams can improve after every checkpoint</RuleItem>
              <RuleItem>Judges may ask why, not just what</RuleItem>
            </ul>
          </div>
        </div>

        {/* Final Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wide">
              Final Note
            </span>
          </div>
          <p className="text-xl md:text-2xl text-foreground font-medium max-w-3xl mx-auto text-balance">
            RAMpage is designed to push you, teach you, and leave you with something
            resume-worthy.
          </p>
        </div>
      </div>
    </section>
  )
}

function TimelineRound({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-l-2 border-primary/30 pl-4">
      <h4 className="text-sm font-semibold text-primary mb-2">{title}</h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-muted-foreground text-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ScoreCard({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-lg p-3 ${
        highlight
          ? "bg-primary/10 border border-primary/20"
          : "bg-secondary/50"
      }`}
    >
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </p>
      <p
        className={`font-semibold ${
          highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function RuleItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-muted-foreground">
      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
      <span>{children}</span>
    </li>
  )
}
