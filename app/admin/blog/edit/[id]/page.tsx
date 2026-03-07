import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { BlogEditorForm } from "@/components/admin/blog-editor-form";
import { requireAdminUser } from "@/lib/auth";
import { getAdminPostById } from "@/lib/blog";

export default async function AdminEditBlogPage({
  params
}: {
  params: { id: string };
}) {
  await requireAdminUser();
  const { id } = params;
  const post = await getAdminPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <AdminShell title="Edit Blog Article" description="Update markdown content and publishing status.">
      <BlogEditorForm post={post} />
    </AdminShell>
  );
}
