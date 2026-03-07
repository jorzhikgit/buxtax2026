import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { hasSupabaseServiceEnv } from "@/lib/supabase/config";
import type { AdminDashboardStats, Lead } from "@/types";

function normalizeLead(row: Record<string, unknown>): Lead {
  return {
    id: String(row.id),
    name: String(row.name),
    phone: String(row.phone),
    email: String(row.email),
    business_type: String(row.business_type),
    message: row.message ? String(row.message) : null,
    source: row.source as Lead["source"],
    created_at: String(row.created_at)
  };
}

export async function getLeads({
  query,
  source,
  page = 1,
  perPage = 10
}: {
  query?: string;
  source?: string;
  page?: number;
  perPage?: number;
}) {
  if (!hasSupabaseServiceEnv()) {
    return {
      leads: [] as Lead[],
      total: 0,
      totalPages: 1
    };
  }

  const supabase = createAdminSupabaseClient();
  let builder = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (source && source !== "all") {
    builder = builder.eq("source", source);
  }

  if (query) {
    builder = builder.or(
      `name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%,business_type.ilike.%${query}%`
    );
  }

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const { data, error, count } = await builder.range(from, to);

  if (error || !data) {
    return {
      leads: [] as Lead[],
      total: 0,
      totalPages: 1
    };
  }

  return {
    leads: data.map(normalizeLead),
    total: count ?? data.length,
    totalPages: Math.max(Math.ceil((count ?? data.length) / perPage), 1)
  };
}

export async function getDashboardStats(): Promise<AdminDashboardStats> {
  if (!hasSupabaseServiceEnv()) {
    return {
      totalLeads: 0,
      calculatorLeads: 0,
      leadsThisWeek: 0,
      totalBlogArticles: 0
    };
  }

  const supabase = createAdminSupabaseClient();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [totalLeads, calculatorLeads, leadsThisWeek, blogPosts] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("source", "calculator"),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", weekAgo),
    supabase.from("blog_posts").select("*", { count: "exact", head: true })
  ]);

  return {
    totalLeads: totalLeads.count ?? 0,
    calculatorLeads: calculatorLeads.count ?? 0,
    leadsThisWeek: leadsThisWeek.count ?? 0,
    totalBlogArticles: blogPosts.count ?? 0
  };
}
