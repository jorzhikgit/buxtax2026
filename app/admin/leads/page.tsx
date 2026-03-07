import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { LeadsTable } from "@/components/admin/leads-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdminUser } from "@/lib/auth";
import { getLeads } from "@/lib/admin-data";

export default async function AdminLeadsPage({
  searchParams
}: {
  searchParams?: { q?: string; source?: string; page?: string };
}) {
  await requireAdminUser();
  const params = searchParams ?? {};
  const page = Number(params.page ?? "1");
  const source = params.source ?? "all";
  const q = params.q ?? "";
  const { leads, totalPages } = await getLeads({
    query: q,
    source,
    page
  });

  return (
    <AdminShell
      title="Leads CRM"
      description="Search, filter and manage incoming leads."
    >
      <Card>
        <CardContent className="p-6">
          <form className="grid gap-4 md:grid-cols-[1fr,220px,140px]">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search by name, email or phone"
              className="h-12 rounded-2xl border border-input bg-background px-4 text-sm"
            />
            <select
              name="source"
              defaultValue={source}
              className="h-12 rounded-2xl border border-input bg-background px-4 text-sm"
            >
              <option value="all">All sources</option>
              <option value="landing">Landing</option>
              <option value="calculator">Calculator</option>
              <option value="blog">Blog</option>
            </select>
            <Button type="submit">Filter</Button>
          </form>
        </CardContent>
      </Card>
      <LeadsTable leads={leads} />
      <div className="flex items-center justify-center gap-3">
        {Array.from({ length: totalPages }, (_, index) => {
          const targetPage = index + 1;
          return (
            <Link
              key={targetPage}
              href={`/admin/leads?page=${targetPage}&source=${source}&q=${encodeURIComponent(q)}`}
            >
              <Button variant={targetPage === page ? "default" : "secondary"}>
                {targetPage}
              </Button>
            </Link>
          );
        })}
      </div>
    </AdminShell>
  );
}
