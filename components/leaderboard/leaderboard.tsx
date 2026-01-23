"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw, Trophy, Medal, Award } from "lucide-react"

interface TeamData {
  rank: number
  teamName: string
  cp1: string
  cp2: string
  cp3: string
  cp4: string
  cp5: string
  cp6: string
  cp7: string
  cp8: string
  total: number
}

interface LeaderboardProps {
  apiRoute: string
  domainTitle: string
}

export default function Leaderboard({ apiRoute, domainTitle }: LeaderboardProps) {
  const [teams, setTeams] = useState<TeamData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)

  const parseCSV = useCallback((csvText: string): TeamData[] => {
    const lines = csvText.trim().split("\n")
    // Skip header row
    const dataLines = lines.slice(1)

    const parsedTeams: TeamData[] = dataLines
      .filter((line) => line.trim() !== "")
      .map((line) => {
        // Handle CSV with potential commas in values
        const values: string[] = []
        let currentValue = ""
        let insideQuotes = false

        for (let i = 0; i < line.length; i++) {
          const char = line[i]
          if (char === '"') {
            insideQuotes = !insideQuotes
          } else if (char === "," && !insideQuotes) {
            values.push(currentValue.trim())
            currentValue = ""
          } else {
            currentValue += char
          }
        }
        values.push(currentValue.trim())

        const parseValue = (val: string | undefined): string => {
          if (!val || val === "" || val === "undefined" || val === "null") {
            return "-"
          }
          return val
        }

        const parseNumber = (val: string | undefined): number => {
          if (!val || val === "" || val === "-") return 0
          const num = Number.parseFloat(val)
          return Number.isNaN(num) ? 0 : num
        }

        // Calculate total from all checkpoint values if total column is missing or 0
        const cp1Val = parseNumber(values[1])
        const cp2Val = parseNumber(values[2])
        const cp3Val = parseNumber(values[3])
        const cp4Val = parseNumber(values[4])
        const cp5Val = parseNumber(values[5])
        const cp6Val = parseNumber(values[6])
        const cp7Val = parseNumber(values[7])
        const cp8Val = parseNumber(values[8])
        // const juryVal = parseNumber(values[9])
        const totalFromCSV = parseNumber(values[9])
        
        // Use CSV total if available, otherwise calculate from checkpoints
        const calculatedTotal = cp1Val + cp2Val + cp3Val + cp4Val + cp5Val + cp6Val + cp7Val + cp8Val
        const total = totalFromCSV > 0 ? totalFromCSV : calculatedTotal

        return {
          rank: 0,
          teamName: parseValue(values[0]) || "Unknown Team",
          cp1: parseValue(values[1]),
          cp2: parseValue(values[2]),
          cp3: parseValue(values[3]),
          cp4: parseValue(values[4]),
          cp5: parseValue(values[5]),
          cp6: parseValue(values[6]),
          cp7: parseValue(values[7]),
          cp8: parseValue(values[8]),
          // jury: parseValue(values[9]),
          total: total,
        }
      })

    // Sort by total score descending (highest score first)
    parsedTeams.sort((a, b) => b.total - a.total)

    // Assign ranks after sorting
    return parsedTeams.map((team, index) => ({
      ...team,
      rank: index + 1,
    }))
  }, [])

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(apiRoute, {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard data")
      }

      const csvText = await response.text()
      const parsedTeams = parseCSV(csvText)
      setTeams(parsedTeams)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      console.error("Error fetching leaderboard:", err)
      setError("Unable to load leaderboard data. Please check the CSV URL.")
    } finally {
      setLoading(false)
    }
  }, [apiRoute, parseCSV])

  useEffect(() => {
    fetchData()

    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [fetchData])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return null
    }
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-400/10 border-yellow-400/30"
      case 2:
        return "bg-gray-300/10 border-gray-300/30"
      case 3:
        return "bg-amber-600/10 border-amber-600/30"
      default:
        return "bg-card/50 border-border"
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {domainTitle}
              </h1>
              <p className="text-muted-foreground">Live Leaderboard</p>
            </div>

            <div className="flex items-center gap-4">
              {lastUpdated && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 text-center">
            <p className="text-destructive">{error}</p>
            <p className="text-muted-foreground text-sm mt-2">
              Make sure the Google Sheets CSV URL is correct and publicly accessible.
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading leaderboard...</p>
          </div>
        )}

        {/* Leaderboard Table */}
        {!loading && !error && teams.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Rank
                  </th>
                  <th className="text-left py-4 px-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Team
                  </th>
                  <th className="text-center py-4 px-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    CP1
                  </th>
                  <th className="text-center py-4 px-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    CP2
                  </th>
                  <th className="text-center py-4 px-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    CP3
                  </th>
                  <th className="text-center py-4 px-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    CP4
                  </th>
                  <th className="text-center py-4 px-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    CP5
                  </th>
                  <th className="text-center py-4 px-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    CP6
                  </th>
                  <th className="text-center py-4 px-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    CP7
                  </th>
                  <th className="text-center py-4 px-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    CP8
                  </th>
                  <th className="text-center py-4 px-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Jury
                  </th>
                  <th className="text-center py-4 px-3 text-xs uppercase tracking-wider text-primary font-semibold">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr
                    key={`${team.teamName}-${team.rank}`}
                    className={`border-b border-border/50 transition-colors hover:bg-primary/5 ${getRankStyle(
                      team.rank
                    )}`}
                  >
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        {getRankIcon(team.rank)}
                        <span
                          className={`font-bold ${
                            team.rank <= 3 ? "text-lg" : "text-base"
                          } ${
                            team.rank === 1
                              ? "text-yellow-400"
                              : team.rank === 2
                              ? "text-gray-300"
                              : team.rank === 3
                              ? "text-amber-600"
                              : "text-muted-foreground"
                          }`}
                        >
                          #{team.rank}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className="font-medium text-foreground">
                        {team.teamName}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center text-muted-foreground">
                      {team.cp1}
                    </td>
                    <td className="py-4 px-2 text-center text-muted-foreground">
                      {team.cp2}
                    </td>
                    <td className="py-4 px-2 text-center text-muted-foreground">
                      {team.cp3}
                    </td>
                    <td className="py-4 px-2 text-center text-muted-foreground">
                      {team.cp4}
                    </td>
                    <td className="py-4 px-2 text-center text-muted-foreground">
                      {team.cp5}
                    </td>
                    <td className="py-4 px-2 text-center text-muted-foreground">
                      {team.cp6}
                    </td>
                    <td className="py-4 px-2 text-center text-muted-foreground">
                      {team.cp7}
                    </td>
                    <td className="py-4 px-2 text-center text-muted-foreground">
                      {team.cp8}
                    </td>
                    <td className="py-4 px-2 text-center text-muted-foreground">
                      {team.jury}
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span
                        className={`font-bold text-lg ${
                          team.rank === 1
                            ? "text-yellow-400"
                            : team.rank === 2
                            ? "text-gray-300"
                            : team.rank === 3
                            ? "text-amber-600"
                            : "text-primary"
                        }`}
                      >
                        {team.total}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && teams.length === 0 && (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Teams Yet
            </h3>
            <p className="text-muted-foreground">
              The leaderboard will populate once teams start participating.
            </p>
          </div>
        )}

        {/* Auto-refresh indicator */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            This leaderboard refreshes automatically every 5 seconds
          </p>
        </div>
      </div>
    </div>
  )
}
