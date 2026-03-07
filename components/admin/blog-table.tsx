"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { deleteBlogPostAction, toggleBlogPublishAction } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

export function BlogTable({ posts }: { posts: BlogPost[] }) {
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-[28px] border border-border bg-white shadow-soft">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">/{post.slug}</p>
                </div>
              </TableCell>
              <TableCell>{post.published ? "Published" : "Draft"}</TableCell>
              <TableCell>{formatDate(post.updatedAt)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/blog/edit/${post.id}`}>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={isPending}
                    onClick={() =>
                      startTransition(async () => {
                        const result = await toggleBlogPublishAction(post.id, !post.published);
                        setStatus(result.message);
                      })
                    }
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isPending}
                    onClick={() =>
                      startTransition(async () => {
                        const result = await deleteBlogPostAction(post.id);
                        setStatus(result.message);
                      })
                    }
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {status ? <p className="p-4 text-sm text-muted-foreground">{status}</p> : null}
    </div>
  );
}
