// app/page.tsx
import type { ReactNode } from "react";
import BlogCards from "./posts/blogcards";
import { MoviesLayout } from "./movies/movielayout";

export default function Home(): ReactNode {
  return (
    <main>
      <BlogCards/>
      <MoviesLayout/>
    </main>
  );
}