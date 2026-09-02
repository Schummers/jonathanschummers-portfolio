import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy PostHog derriere mon propre domaine. Sans ca, les bloqueurs de pub
  // (et les VPN d'entreprise, frequents chez les recruteurs) coupent l'ingestion
  // et je ne vois qu'une partie des visites.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
