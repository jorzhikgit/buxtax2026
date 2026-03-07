import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { BlogTable } from "@/components/admin/blog-table";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/blog";
import { requireAdminUser } from "@/lib/auth";

export default async function AdminBlogPage() {
  await requireAdminUser();
  const posts = await getAllPosts();

  return (
    <AdminShell
      title="Blog"
      description="Create, edit, publish and delete markdown articles."
    >
      <div className="flex justify-end">
        <Link href="/admin/blog/new">
          <Button>New article</Button>
        </Link>
      </div>
      <BlogTable posts={posts} />
    </AdminShell>
  );
}
