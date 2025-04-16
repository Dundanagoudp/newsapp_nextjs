// app/page.tsx
import type { ReactNode } from "react";
import BlogCards from "./posts/blogcards";
import { MoviesLayout } from "./movies/movielayout";
import ModalWithForm from "@/components/ui/modal-with-form";

export default function Home(): ReactNode {
  return (
    <main>
      <BlogCards/>
      <MoviesLayout/>
      {/* <ModalWithForm/> */}
    </main>
  );
}