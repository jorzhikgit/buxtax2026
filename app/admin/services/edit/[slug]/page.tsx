import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { ServicePageEditorForm } from "@/components/admin/service-page-editor-form";
import { requireAdminUser } from "@/lib/auth";
import { getAdminServicePageBySlug } from "@/lib/service-pages";

export default async function AdminServiceEditPage({
  params
}: {
  params: { slug: string };
}) {
  await requireAdminUser();
  const page = await getAdminServicePageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <AdminShell
      title="Edit SEO Page"
      description="Update title, body content and metadata for Google-indexable service pages."
    >
      <ServicePageEditorForm page={page} />
    </AdminShell>
  );
}
