import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tic Tac Toe - Fun Emoji Game",
  description: "Play Tic Tac Toe with emojis! Choose your animal and fruit combo, pick grid size, and enjoy this fun game built with React and Next.js.",
  keywords: ["tic tac toe", "game", "emoji", "react", "next.js", "puzzle"],
  authors: [{ name: "Josue Batey" }],
  creator: "Josue Batey",
  openGraph: {
    title: "Tic Tac Toe - Fun Emoji Game",
    description: "Play Tic Tac Toe with emojis! Choose your animal and fruit combo.",
    type: "website",
    url: "https://tictactoe-jb.vercel.app",
    siteName: "Tic Tac Toe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tic Tac Toe - Fun Emoji Game",
    description: "Play Tic Tac Toe with emojis!",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/jb-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/jb-logo.svg" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
