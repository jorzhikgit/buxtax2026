import Link from "next/link";

import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-[#163642] text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr,1fr,1fr]">
        <div className="space-y-4">
          <h3 className="font-display text-2xl">{siteConfig.name}</h3>
          <p className="max-w-md text-sm leading-7 text-white/72">
            Accounting outsourcing, payroll, tax reporting and lead-generating calculators
            tailored to Kazakhstan businesses.
          </p>
          <div className="space-y-1 text-sm text-white/80">
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.email}</p>
            <p>{siteConfig.city}, {siteConfig.region}</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            Navigation
          </h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/84">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            Legal
          </h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/84">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-white">
              FAQ
            </Link>
            <Link href="/admin/login" className="hover:text-white">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
