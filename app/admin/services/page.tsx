import { AdminShell } from "@/components/admin/admin-shell";
import { ServicePagesTable } from "@/components/admin/service-pages-table";
import { requireAdminUser } from "@/lib/auth";
import { getAllServicePages } from "@/lib/service-pages";

export default async function AdminServicesPage() {
  await requireAdminUser();
  const pages = await getAllServicePages();

  return (
    <AdminShell
      title="SEO Service Pages"
      description="Edit dynamic landing pages for accounting service and city queries."
    >
      <ServicePagesTable pages={pages} />
    </AdminShell>
  );
}
