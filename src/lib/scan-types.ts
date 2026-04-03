export type Sentiment = "positive" | "negative" | "neutral"

export type GoogleResult = {
  url: string
  title: string
  snippet: string
  sentiment: Sentiment
  position: number
}

export type PlatformResult = {
  platform: string
  url: string
  found: boolean
  username: string
}

export type Problem = {
  type: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
}

export type ScanData = {
  query: string
  score: number
  status: "running" | "completed" | "failed"
  googleResults: GoogleResult[]
  platformResults: PlatformResult[]
  sentiment: { positive: number; negative: number; neutral: number }
  problemsDetected: Problem[]
}

export const DEMO_SCAN: ScanData = {
  query: "Jean Dupont",
  score: 62,
  status: "completed",
  googleResults: [
    {
      url: "https://linkedin.com/in/jeandupont",
      title: "Jean Dupont - Directeur Marketing | LinkedIn",
      snippet:
        "Jean Dupont est Directeur Marketing chez Acme Corp avec 15 ans d'experience...",
      sentiment: "positive",
      position: 1,
    },
    {
      url: "https://twitter.com/jeandupont",
      title: "Jean Dupont (@jeandupont) / X",
      snippet: "Passionné de tech et marketing digital. Paris, France.",
      sentiment: "neutral",
      position: 2,
    },
    {
      url: "https://forum-arnaque.com/jean-dupont-avis",
      title: "Avis sur Jean Dupont - Forum consommateurs",
      snippet:
        "Plusieurs plaintes ont été déposées concernant les pratiques commerciales...",
      sentiment: "negative",
      position: 3,
    },
    {
      url: "https://www.maddyness.com/interview-jean-dupont",
      title: "Interview : Jean Dupont révolutionne le marketing B2B",
      snippet:
        "Rencontre avec un pionnier du marketing automation en France...",
      sentiment: "positive",
      position: 4,
    },
    {
      url: "https://glassdoor.com/avis/acme-corp",
      title: "Avis Acme Corp - Un management discutable",
      snippet: "L'ancien directeur marketing Jean Dupont a laissé une equipe démotivée...",
      sentiment: "negative",
      position: 5,
    },
  ],
  platformResults: [
    { platform: "LinkedIn", url: "https://linkedin.com/in/jeandupont", found: true, username: "jeandupont" },
    { platform: "Twitter/X", url: "https://twitter.com/jeandupont", found: true, username: "jeandupont" },
    { platform: "Facebook", url: "", found: false, username: "" },
    { platform: "Instagram", url: "", found: false, username: "" },
    { platform: "GitHub", url: "https://github.com/jeandupont", found: true, username: "jeandupont" },
    { platform: "YouTube", url: "", found: false, username: "" },
    { platform: "TikTok", url: "", found: false, username: "" },
    { platform: "Reddit", url: "https://reddit.com/u/jeandupont", found: true, username: "jeandupont" },
    { platform: "Medium", url: "", found: false, username: "" },
    { platform: "Pinterest", url: "", found: false, username: "" },
    { platform: "Viadeo", url: "", found: false, username: "" },
    { platform: "Malt", url: "https://malt.fr/profile/jeandupont", found: true, username: "jeandupont" },
  ],
  sentiment: { positive: 40, negative: 35, neutral: 25 },
  problemsDetected: [
    {
      type: "contenu_negatif",
      description:
        "Contenu negatif en position 3 sur Google : plainte consommateurs sur forum-arnaque.com",
      severity: "high",
    },
    {
      type: "avis_negatif",
      description:
        "Avis negatif Glassdoor mentionnant votre nom en position 5",
      severity: "medium",
    },
    {
      type: "profils_manquants",
      description:
        "Profils absents sur Facebook, Instagram et YouTube — opportunite de renforcer votre presence",
      severity: "low",
    },
  ],
}
