import { AdminShell } from "@/components/admin/admin-shell";
import { BlogEditorForm } from "@/components/admin/blog-editor-form";
import { requireAdminUser } from "@/lib/auth";

export default async function AdminNewBlogPage() {
  await requireAdminUser();

  return (
    <AdminShell title="New Blog Article" description="Create a new markdown article.">
      <BlogEditorForm />
    </AdminShell>
  );
}
