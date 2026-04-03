import { internalMutation } from "./_generated/server";

type PlatformSeed = {
  name: string;
  url: string;
  category: "social" | "review" | "directory" | "professional";
  domainAuthority: number;
  sherlockSupported: boolean;
  autoCreatable: boolean;
  guideUrl?: string;
};

const platforms: PlatformSeed[] = [
  // Social
  { name: "LinkedIn", url: "https://linkedin.com", category: "social", domainAuthority: 98, sherlockSupported: true, autoCreatable: false },
  { name: "Twitter/X", url: "https://x.com", category: "social", domainAuthority: 94, sherlockSupported: true, autoCreatable: true },
  { name: "Facebook", url: "https://facebook.com", category: "social", domainAuthority: 96, sherlockSupported: true, autoCreatable: true },
  { name: "Instagram", url: "https://instagram.com", category: "social", domainAuthority: 93, sherlockSupported: true, autoCreatable: true },
  { name: "TikTok", url: "https://tiktok.com", category: "social", domainAuthority: 92, sherlockSupported: true, autoCreatable: true },
  { name: "YouTube", url: "https://youtube.com", category: "social", domainAuthority: 100, sherlockSupported: true, autoCreatable: true },
  { name: "Pinterest", url: "https://pinterest.com", category: "social", domainAuthority: 94, sherlockSupported: true, autoCreatable: true },
  { name: "Reddit", url: "https://reddit.com", category: "social", domainAuthority: 97, sherlockSupported: true, autoCreatable: true },
  { name: "Snapchat", url: "https://snapchat.com", category: "social", domainAuthority: 91, sherlockSupported: true, autoCreatable: true },
  { name: "Threads", url: "https://threads.net", category: "social", domainAuthority: 85, sherlockSupported: false, autoCreatable: true },
  { name: "Mastodon", url: "https://mastodon.social", category: "social", domainAuthority: 78, sherlockSupported: true, autoCreatable: true },
  { name: "Bluesky", url: "https://bsky.app", category: "social", domainAuthority: 75, sherlockSupported: true, autoCreatable: true },

  // Review
  { name: "Google Reviews", url: "https://google.com/maps", category: "review", domainAuthority: 99, sherlockSupported: false, autoCreatable: false },
  { name: "Trustpilot", url: "https://trustpilot.com", category: "review", domainAuthority: 93, sherlockSupported: true, autoCreatable: true },
  { name: "Glassdoor", url: "https://glassdoor.com", category: "review", domainAuthority: 91, sherlockSupported: true, autoCreatable: true },
  { name: "Yelp", url: "https://yelp.com", category: "review", domainAuthority: 94, sherlockSupported: true, autoCreatable: true },
  { name: "Tripadvisor", url: "https://tripadvisor.com", category: "review", domainAuthority: 93, sherlockSupported: true, autoCreatable: true },
  { name: "Avis Vérifiés", url: "https://avis-verifies.com", category: "review", domainAuthority: 72, sherlockSupported: false, autoCreatable: false },
  { name: "Trustfolio", url: "https://trustfolio.co", category: "review", domainAuthority: 45, sherlockSupported: false, autoCreatable: true },

  // Directory
  { name: "Pages Jaunes", url: "https://pagesjaunes.fr", category: "directory", domainAuthority: 85, sherlockSupported: false, autoCreatable: true },
  { name: "Societe.com", url: "https://societe.com", category: "directory", domainAuthority: 80, sherlockSupported: false, autoCreatable: false },
  { name: "Infogreffe", url: "https://infogreffe.fr", category: "directory", domainAuthority: 78, sherlockSupported: false, autoCreatable: false },
  { name: "Kompass", url: "https://kompass.com", category: "directory", domainAuthority: 75, sherlockSupported: false, autoCreatable: true },
  { name: "Europages", url: "https://europages.fr", category: "directory", domainAuthority: 72, sherlockSupported: false, autoCreatable: true },
  { name: "118712", url: "https://118712.fr", category: "directory", domainAuthority: 60, sherlockSupported: false, autoCreatable: false },
  { name: "Bing Places", url: "https://bingplaces.com", category: "directory", domainAuthority: 70, sherlockSupported: false, autoCreatable: true },
  { name: "Apple Maps", url: "https://mapsconnect.apple.com", category: "directory", domainAuthority: 88, sherlockSupported: false, autoCreatable: true },

  // Professional
  { name: "GitHub", url: "https://github.com", category: "professional", domainAuthority: 95, sherlockSupported: true, autoCreatable: true },
  { name: "Medium", url: "https://medium.com", category: "professional", domainAuthority: 95, sherlockSupported: true, autoCreatable: true },
  { name: "Indeed", url: "https://indeed.com", category: "professional", domainAuthority: 95, sherlockSupported: true, autoCreatable: true },
  { name: "Viadeo", url: "https://viadeo.com", category: "professional", domainAuthority: 70, sherlockSupported: true, autoCreatable: true },
  { name: "Malt", url: "https://malt.fr", category: "professional", domainAuthority: 72, sherlockSupported: true, autoCreatable: true },
  { name: "Behance", url: "https://behance.net", category: "professional", domainAuthority: 92, sherlockSupported: true, autoCreatable: true },
  { name: "Dribbble", url: "https://dribbble.com", category: "professional", domainAuthority: 90, sherlockSupported: true, autoCreatable: true },
  { name: "Stack Overflow", url: "https://stackoverflow.com", category: "professional", domainAuthority: 95, sherlockSupported: true, autoCreatable: true },
  { name: "Dev.to", url: "https://dev.to", category: "professional", domainAuthority: 85, sherlockSupported: true, autoCreatable: true },
  { name: "Hashnode", url: "https://hashnode.com", category: "professional", domainAuthority: 78, sherlockSupported: true, autoCreatable: true },
  { name: "Crunchbase", url: "https://crunchbase.com", category: "professional", domainAuthority: 90, sherlockSupported: false, autoCreatable: false },
  { name: "AngelList", url: "https://angel.co", category: "professional", domainAuthority: 88, sherlockSupported: true, autoCreatable: true },
  { name: "Wellfound", url: "https://wellfound.com", category: "professional", domainAuthority: 82, sherlockSupported: false, autoCreatable: true },
  { name: "About.me", url: "https://about.me", category: "professional", domainAuthority: 88, sherlockSupported: true, autoCreatable: true },
];

export const seedPlatforms = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("platforms").collect();
    if (existing.length > 0) return { skipped: true, count: existing.length };

    for (const platform of platforms) {
      await ctx.db.insert("platforms", platform);
    }

    return { seeded: true, count: platforms.length };
  },
});
