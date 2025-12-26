import { Suspense } from "react";
import AllBlogsPosts from "@/components/BlogPage/AllBlogsPosts/AllBlogsPosts";
import BlogPageIntro from "@/components/BlogPage/BlogPageIntro/BlogPageIntro";
import FinalCTA2 from "@/components/shared/FinalCTA2/FinalCTA2";
import Footer from "@/components/shared/Footer/Footer";
import Nav from "@/components/shared/Nav/Nav";

export default function BlogPage() {
  return (
    <main>
      <BlogPageIntro />
      {/* Anything that renders a client component using useSearchParams must be inside Suspense */}
      <Suspense
        fallback={
          <section style={{ padding: "2rem 0" }}>
            <p>Loading posts…</p>
          </section>
        }
      >
        <AllBlogsPosts />
      </Suspense>{" "}
      <FinalCTA2 />
      <Footer />
    </main>
  );
}
