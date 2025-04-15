// app/page.tsx
import NewsCards from "@/components/newscards";
import type { ReactNode } from "react";

export default function Home(): ReactNode {
  return (
    <main>
      <NewsCards/>
    </main>
  );
}