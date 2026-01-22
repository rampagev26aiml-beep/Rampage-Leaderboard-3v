import { NextResponse } from "next/server"
import { LEADERBOARD_URLS } from "@/config/leaderboard-urls"

const CSV_URL = LEADERBOARD_URLS.aiml

export async function GET() {
  if (!CSV_URL || CSV_URL.includes("PASTE_YOUR")) {
    return NextResponse.json(
      { error: "CSV URL not configured. Update /config/leaderboard-urls.ts" },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(CSV_URL, {
      method: "GET",
      redirect: "follow",
      headers: {
        "Accept": "text/csv, text/plain, */*",
        "User-Agent": "Mozilla/5.0",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status}`)
    }

    const csvText = await response.text()
    return new NextResponse(csvText, {
      headers: {
        "Content-Type": "text/csv",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch leaderboard data: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    )
  }
}
