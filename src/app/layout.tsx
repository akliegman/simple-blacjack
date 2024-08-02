import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { DeckProvider } from "@/providers/game";

import "@/app/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Blackjack",
  description:
    "A simple blackjack game built with Next.js, created by @akliegman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          "flex",
          "flex-col",
          "h-screen",
          "w-screen",
        )}
      >
        <DeckProvider>{children}</DeckProvider>
      </body>
    </html>
  );
}
