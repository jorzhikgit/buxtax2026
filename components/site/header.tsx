import Link from "next/link";

import { Button } from "@/components/ui/button";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            BK
          </div>
          <div>
            <div className="font-display text-lg">{siteConfig.name}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Accounting in Kazakhstan
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <Link href="/tax-calculators">
            <Button variant="secondary">Calculate Taxes</Button>
          </Link>
          <Link href="/contacts">
            <Button>Get Free Consultation</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
