"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { saveServicePageAction } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ServicePage } from "@/types";

interface ServicePageEditorValues {
  id?: string;
  slug: string;
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
}

export function ServicePageEditorForm({ page }: { page: ServicePage }) {
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit } = useForm<ServicePageEditorValues>({
    defaultValues: {
      id: page.id,
      slug: page.slug,
      title: page.title,
      content: page.content,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      published: page.published
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-2xl">Edit SEO service page</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={handleSubmit((values) =>
            startTransition(async () => {
              const result = await saveServicePageAction(values);
              setStatus(result.message);
            })
          )}
        >
          <Input placeholder="Slug" {...register("slug")} />
          <Input placeholder="Title" {...register("title")} />
          <Input placeholder="Meta title" {...register("metaTitle")} />
          <Textarea placeholder="Meta description" {...register("metaDescription")} />
          <Textarea className="min-h-[360px]" placeholder="SEO page content" {...register("content")} />
          <label className="flex items-center gap-3 text-sm font-medium">
            <input type="checkbox" className="h-4 w-4 rounded" {...register("published")} />
            Publish page
          </label>
          <Button disabled={isPending}>{isPending ? "Saving..." : "Save SEO page"}</Button>
          {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
