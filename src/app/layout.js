import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "@/components/SessionProvider";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Homestay Review Analyzer",
  description: "AI-powered homestay review analysis",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Providers>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}