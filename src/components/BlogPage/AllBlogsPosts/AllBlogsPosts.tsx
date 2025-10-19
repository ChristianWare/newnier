import { client } from "@/sanity/lib/client";
import styles from "./AllBlogsPosts.module.css";
import BlogCardTwo from "../BlogCardTwo/BlogCardTwo";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import { urlFor } from "@/sanity/lib/image";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  coverImage?: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  };
};

async function getPosts(): Promise<Post[]> {
  const query = `
    *[_type == "post"] | order(publishedAt desc) 
    {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      coverImage{asset, alt, _type}
    }
  `;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function AllBlogsPosts() {
  const posts = await getPosts();

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          {posts.map((p) => (
            <BlogCardTwo
              key={p._id}
              post={{
                title: p.title,
                href: `/blog/${p.slug.current}`,
                date: p.publishedAt,
                excerpt: p.excerpt ?? "",
                imageUrl: p.coverImage
                  ? urlFor(p.coverImage)
                      .width(800)
                      .height(600)
                      .fit("crop")
                      .url()
                  : undefined,
                imageAlt: p.coverImage?.alt ?? p.title,
              }}
            />
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}
