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
  // De Reeshof-pagina is samengevoegd met de Tilburg-pagina: hij was voor 88%
  // een kopie daarvan en haalde nul klikken. permanent: true geeft een 308.
  async redirects() {
    return [
      {
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
    ];
  },
};

export default nextConfig;
