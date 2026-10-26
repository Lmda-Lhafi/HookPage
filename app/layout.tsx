import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

import "./globals.css";



export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Itch.io Game Description Generator | Product Spotlight",
    template: "%s | Product Spotlight",
  },
  description: "Turn rough notes into itch.io-ready game copy: hooks, pitches, descriptions, feature lists, and calls to action.",
  applicationName: "Product Spotlight",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Product Spotlight",
    title: "Itch.io Game Description Generator | Product Spotlight",
    description: "Create and share copy-ready descriptions for indie games on itch.io.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
