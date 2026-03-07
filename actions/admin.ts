"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasSupabaseServiceEnv } from "@/lib/supabase/config";
import { slugify } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const postSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(10),
  excerpt: z.string().min(20),
  slug: z.string().min(3),
  tags: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  content: z.string().min(60),
  published: z.boolean()
});

export async function adminLoginAction(input: unknown) {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Enter a valid email and password." };
  }

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword(parsed.data);

    if (error) {
      return { success: false, message: error.message };
    }
  } catch {
    return {
      success: false,
      message: "Admin login failed. Check Supabase auth configuration."
    };
  }

  redirect("/admin/dashboard");
}

export async function adminLogoutAction() {
  try {
    const supabase = createServerSupabaseClient();
    await supabase.auth.signOut();
  } catch {
    // Ignore logout errors and continue redirect.
  }

  redirect("/admin/login");
}

export async function saveBlogPostAction(input: unknown) {
  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Please complete all blog fields." };
  }

  if (!hasSupabaseServiceEnv()) {
    return {
      success: false,
      message: "Supabase service role env vars are required to save blog posts."
    };
  }

  const supabase = createAdminSupabaseClient();
  const payload = parsed.data;
  const now = new Date().toISOString();

  const data = {
    title: payload.title,
    excerpt: payload.excerpt,
    slug: slugify(payload.slug),
    tags: payload.tags
      ? payload.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [],
    cover_image: payload.coverImage || null,
    content: payload.content,
    published: payload.published,
    updated_at: now
  };

  const response = payload.id
    ? await supabase.from("blog_posts").update(data).eq("id", payload.id)
    : await supabase.from("blog_posts").insert({ ...data, created_at: now });

  if (response.error) {
    return { success: false, message: response.error.message };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  if (payload.slug) {
    revalidatePath(`/blog/${slugify(payload.slug)}`);
  }

  return { success: true, message: "Blog post saved." };
}

export async function deleteBlogPostAction(id: string) {
  if (!hasSupabaseServiceEnv()) {
    return { success: false, message: "Supabase service role is not configured." };
  }

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: true, message: "Blog post deleted." };
}

export async function toggleBlogPublishAction(id: string, published: boolean) {
  if (!hasSupabaseServiceEnv()) {
    return { success: false, message: "Supabase service role is not configured." };
  }

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("blog_posts")
    .update({
      published,
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: true, message: "Publish status updated." };
}

export async function deleteLeadAction(id: string) {
  if (!hasSupabaseServiceEnv()) {
    return { success: false, message: "Supabase service role is not configured." };
  }

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/leads");
  return { success: true, message: "Lead deleted." };
}

export async function uploadBlogImageAction(formData: FormData) {
  if (!hasSupabaseServiceEnv()) {
    return {
      success: false,
      message: "Supabase service role env vars are required to upload blog images."
    };
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { success: false, message: "Select an image file first." };
  }

  const supabase = createAdminSupabaseClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabase.storage
    .from("blog-images")
    .upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: false
    });

  if (error) {
    return { success: false, message: error.message };
  }

  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);

  return { success: true, message: "Image uploaded.", url: data.publicUrl };
}
