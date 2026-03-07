import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdminUser } from "@/lib/auth";
import { getDashboardStats } from "@/lib/admin-data";
import { hasSupabaseServiceEnv } from "@/lib/supabase/config";

export default async function AdminDashboardPage() {
  await requireAdminUser();
  const stats = await getDashboardStats();
  const cards = [
    { label: "Total leads", value: stats.totalLeads },
    { label: "Leads from calculators", value: stats.calculatorLeads },
    { label: "Leads this week", value: stats.leadsThisWeek },
    { label: "Total blog articles", value: stats.totalBlogArticles }
  ];

  return (
    <AdminShell
      title="Dashboard"
      description="Lead and content analytics for the accounting website."
    >
      {!hasSupabaseServiceEnv() ? (
        <Card className="bg-accent">
          <CardContent className="p-6 text-sm leading-7 text-muted-foreground">
            Supabase service role env vars are not configured. Dashboard stats and CRUD actions
            will remain in demo mode until you connect your project.
          </CardContent>
        </Card>
      ) : null}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader>
              <CardTitle className="text-base">{card.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-5xl">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
