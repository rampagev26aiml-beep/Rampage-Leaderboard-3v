// Paste your Google Sheets CSV URLs here directly
// Format: File > Share > Publish to web > CSV

export const LEADERBOARD_URLS = {
  webdev: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2Iv6Rgnwvu50-UOhiLycW7CEhskkpReFkgIUmHtwx4rVR6MZeBMs-WlYZKC_WUQGIRzDAGmbSGV6t/pub?gid=726088989&single=true&output=csv",

  aiml: "PASTE_YOUR_AIML_CSV_URL_HERE",

  iot: "PASTE_YOUR_IOT_CSV_URL_HERE",

  blockchain: "PASTE_YOUR_BLOCKCHAIN_CSV_URL_HERE",
  
} as const

export type LeaderboardDomain = keyof typeof LEADERBOARD_URLS
