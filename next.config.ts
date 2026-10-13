import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.wobbio.com",
      },
      {
        protocol: "https",
        hostname: "erisietsmisgegaan.nl",
      },
    ],
  },
  async redirects() {
    return [
      {
        // De Reeshof-pagina is opgegaan in de Tilburg-pagina; die beschrijft
        // nu het hele werkgebied, inclusief de wijken van de Reeshof.
        source: "/relatietherapie-reeshof",
        destination: "/relatietherapie-tilburg",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Service worker van de admin-app altijd vers ophalen.
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
        ],
      },
    ];
  },
};

export default nextConfig;
