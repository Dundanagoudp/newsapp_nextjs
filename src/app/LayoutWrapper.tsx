'use client';

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./components/Header/Header";
import Navbar from "./components/Header/Navbar";
import { TopBar } from "./components/Header/TopBar";
import Footer from "./components/Footer/Footer";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Check if the current route starts with /auth
  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) {
    // Only render the content without header/footer
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col flex-grow min-h-screen">
      <TopBar />
      <Header />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
