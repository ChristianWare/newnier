import AllBlogsPosts from "@/components/BlogPage/AllBlogsPosts/AllBlogsPosts";
import BlogPageIntro from "@/components/BlogPage/BlogPageIntro/BlogPageIntro";
import FinalCTA2 from "@/components/shared/FinalCTA2/FinalCTA2";
import Footer from "@/components/shared/Footer/Footer";
import Nav from "@/components/shared/Nav/Nav";

export default function BlogPage() {
  return (
    <main>
      <Nav />
      <BlogPageIntro />
      <AllBlogsPosts />
      <FinalCTA2 />
      <Footer />
    </main>
  );
}
