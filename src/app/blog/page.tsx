import BlogPageIntro from "@/components/BlogPage/BlogPageIntro/BlogPageIntro";
import BlogSection from "@/components/BlogPage/BlogSection/BlogSection";
import FinalCTA2 from "@/components/shared/FinalCTA2/FinalCTA2";
import Footer from "@/components/shared/Footer/Footer";
import Nav from "@/components/shared/Nav/Nav";

export default function BlogPage() {
  return (
    <main>
      <Nav />
      <BlogPageIntro />
      <BlogSection />
      <FinalCTA2 />
      <Footer />
    </main>
  );
}
