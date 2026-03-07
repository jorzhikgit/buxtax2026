import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getPostBySlug, getPublishedPosts, renderMarkdown } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.createdAt,
      images: post.coverImage ? [{ url: post.coverImage }] : []
    },
    alternates: {
      canonical: `/blog/${post.slug}`
    }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const html = await renderMarkdown(post.content);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name
    }
  };

  return (
    <section className="section-space">
      <Script
        id={`article-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="container max-w-4xl space-y-10">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="font-display text-5xl leading-tight">{post.title}</h1>
          <p className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</p>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
        </div>
        <Card>
          <CardContent className="p-8">
            <article
              className="prose-tax"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </CardContent>
        </Card>
        <LeadCaptureForm
          source="blog"
          title="Need help applying this to your company?"
          description="Leave a lead and a Kazakhstan accountant will review your situation in more detail."
        />
      </div>
    </section>
  );
}
