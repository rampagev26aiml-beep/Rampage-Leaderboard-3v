// Paste your Google Sheets CSV URLs here directly
// Format: File > Share > Publish to web > CSV

export const LEADERBOARD_URLS = {
  webdev: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqvqZvJjJaJ9KUa_Ro2OHFPBOSBRhxQ3om4kXixig_bioDmBCRykFrXbyJZsGSJERINdxS1WIZ2VnF/pub?gid=0&single=true&output=csv",

  aiml: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWco9OTuM6E2fwtptul0-vzfJkqgsZLTB1GKiWQBC2pqd_N9WHj4Ne_u17y3xBv-cmy44ZW6GtWN3s/pub?gid=252009932&single=true&output=csv",

  iot: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5EFMEnZM87o8kqXiStoO12rpg8a5XOC_psWeouno9CkDcB2wBiMwv7JqfeIDRJzohGJQQ9Pd-7pFt/pub?gid=2049671286&single=true&output=csv",

  blockchain: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRwsE12wo32qaCSycYiKhGt1baXvzzEN5xKLJAMwIXkrx9HqKUF1481eIfV2WZkN915JU95QmBqhxMo/pub?gid=1256650523&single=true&output=csv",
  
} as const

export type LeaderboardDomain = keyof typeof LEADERBOARD_URLS
