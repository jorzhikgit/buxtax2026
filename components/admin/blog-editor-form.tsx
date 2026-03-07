"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { saveBlogPostAction, uploadBlogImageAction } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BlogPost } from "@/types";

interface BlogEditorValues {
  id?: string;
  title: string;
  excerpt: string;
  slug: string;
  tags: string;
  coverImage: string;
  content: string;
  published: boolean;
}

export function BlogEditorForm({ post }: { post?: BlogPost | null }) {
  const [status, setStatus] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, startUploadTransition] = useTransition();

  const { register, handleSubmit, setValue, watch } = useForm<BlogEditorValues>({
    defaultValues: {
      id: post?.id,
      title: post?.title ?? "",
      excerpt: post?.excerpt ?? "",
      slug: post?.slug ?? "",
      tags: post?.tags.join(", ") ?? "",
      coverImage: post?.coverImage ?? "",
      content: post?.content ?? "",
      published: post?.published ?? false
    }
  });

  const coverImage = watch("coverImage");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-2xl">
          {post ? "Edit article" : "New article"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={handleSubmit((values) =>
            startTransition(async () => {
              const result = await saveBlogPostAction(values);
              setStatus(result.message);
            })
          )}
        >
          <Input placeholder="Title" {...register("title")} />
          <Input placeholder="Slug" {...register("slug")} />
          <Textarea placeholder="Excerpt" {...register("excerpt")} />
          <Input placeholder="Tags (comma separated)" {...register("tags")} />
          <Input placeholder="Cover image URL" {...register("coverImage")} />
          <div className="rounded-[24px] border border-dashed border-border p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;

                  startUploadTransition(async () => {
                    const formData = new FormData();
                    formData.append("file", file);
                    const result = await uploadBlogImageAction(formData);
                    setUploadState(result.message);
                    if (result.success && result.url) {
                      setValue("coverImage", result.url, { shouldDirty: true });
                    }
                  });
                }}
              />
              <span className="text-sm text-muted-foreground">
                {isUploading ? "Uploading..." : uploadState ?? "Upload to Supabase Storage"}
              </span>
            </div>
            {coverImage ? (
              <p className="mt-3 break-all text-xs text-muted-foreground">{coverImage}</p>
            ) : null}
          </div>
          <Textarea
            placeholder="Markdown content"
            className="min-h-[320px]"
            {...register("content")}
          />
          <label className="flex items-center gap-3 text-sm font-medium">
            <input type="checkbox" className="h-4 w-4 rounded" {...register("published")} />
            Publish article
          </label>
          <Button disabled={isPending}>{isPending ? "Saving..." : "Save article"}</Button>
          {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
