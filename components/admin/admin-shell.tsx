import Link from "next/link";

import { adminLogoutAction } from "@/actions/admin";
import { Button } from "@/components/ui/button";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/leads", label: "Leads" }
];

export function AdminShell({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container section-space">
      <div className="grid gap-8 lg:grid-cols-[260px,1fr]">
        <aside className="rounded-[28px] border border-border bg-white p-6 shadow-soft">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Admin</p>
            <h1 className="font-display text-3xl">BuxTax CMS</h1>
          </div>
          <nav className="mt-8 flex flex-col gap-3">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form action={adminLogoutAction} className="mt-8">
            <Button variant="secondary" className="w-full">
              Logout
            </Button>
          </form>
        </aside>
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="font-display text-4xl">{title}</h2>
            {description ? <p className="text-muted-foreground">{description}</p> : null}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
