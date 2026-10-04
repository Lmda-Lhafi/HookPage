import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: "Product Spotlight Generator",
  description: "Generate itch.io game copy and share a preview page.",
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
