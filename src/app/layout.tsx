// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import Header from "./components/Header/Header";
import Navbar from "./components/Header/Navbar";
import { TopBar } from "./components/Header/TopBar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "./components/Footer/Footer";
import { Providers } from "./providers"; // Optional: remove if not needed

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Your Site Title",
  description: "Your site description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <Providers> 
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col flex-grow">
              <TopBar />
              <Header />
              <Navbar />
              <main className="flex-grow">{children}</main>
            </div>
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
