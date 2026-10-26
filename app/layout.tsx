import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

import "./globals.css";



export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "HookPage | Itch.io Game Description Generator",
    template: "%s | HookPage",
  },
  description: "HookPage turns rough indie game notes into itch.io-ready hooks, pitches, descriptions, feature lists, and calls to action.",
  applicationName: "HookPage",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "HookPage",
    title: "HookPage | Itch.io Game Description Generator",
    description: "Create and share copy-ready descriptions for indie games on itch.io with HookPage.",
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
