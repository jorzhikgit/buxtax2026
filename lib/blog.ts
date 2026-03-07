import { cache } from "react";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { hasSupabaseServiceEnv } from "@/lib/supabase/config";
import { samplePosts } from "@/lib/site";
import type { BlogPost } from "@/types";

function normalizePost(row: Record<string, unknown>): BlogPost {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    excerpt: String(row.excerpt ?? ""),
    content: String(row.content ?? ""),
    coverImage: row.cover_image ? String(row.cover_image) : null,
    tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
    published: Boolean(row.published),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at)
  };
}

async function loadPostsFromSupabase() {
  if (!hasSupabaseServiceEnv()) {
    return samplePosts;
  }

  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return samplePosts;
    }

    return data.map(normalizePost);
  } catch {
    return samplePosts;
  }
}

export const getAllPosts = cache(async () => {
  return loadPostsFromSupabase();
});

export const getPublishedPosts = cache(async () => {
  const posts = await loadPostsFromSupabase();
  return posts.filter((post) => post.published);
});

export async function getPostBySlug(slug: string) {
  const posts = await loadPostsFromSupabase();
  return posts.find((post) => post.slug === slug && post.published) ?? null;
}

export async function getAdminPostById(id: string) {
  const posts = await loadPostsFromSupabase();
  return posts.find((post) => post.id === id) ?? null;
}

export async function getPaginatedPublishedPosts(page: number, perPage = 4) {
  const posts = await getPublishedPosts();
  const totalPages = Math.max(Math.ceil(posts.length / perPage), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    posts: posts.slice(start, start + perPage),
    totalPages,
    currentPage: safePage
  };
}

export async function renderMarkdown(markdown: string) {
  const parsed = matter(markdown);
  const processed = await remark().use(html).process(parsed.content);
  return processed.toString();
}
