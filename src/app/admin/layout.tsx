import type { Metadata, Viewport } from "next";

// Eigen manifest voor de admin-app (installeerbaar als PWA, scope /admin/).
export const metadata: Metadata = {
  manifest: "/admin.webmanifest",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: "NW Admin", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#946B66",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
