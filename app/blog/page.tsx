import type { Metadata } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/site/blog-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { getPaginatedPublishedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Accounting Blog Kazakhstan",
  description:
    "Read articles about Kazakhstan tax changes, payroll accounting, VAT reporting, ESF and accounting for IP and LLP."
};

export const revalidate = 3600;

export default async function BlogPage({
  searchParams
}: {
  searchParams?: { page?: string };
}) {
  const params = searchParams ?? {};
  const page = Number(params.page ?? "1");
  const { posts, totalPages, currentPage } = await getPaginatedPublishedPosts(page);

  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow="Blog"
          title="Accounting and tax blog for Kazakhstan businesses"
          description="Markdown-based content with SEO metadata, OpenGraph support and ISR caching."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length: totalPages }, (_, index) => {
            const targetPage = index + 1;
            return (
              <Link key={targetPage} href={`/blog?page=${targetPage}`}>
                <Button variant={targetPage === currentPage ? "default" : "secondary"}>
                  {targetPage}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
