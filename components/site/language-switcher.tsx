"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  defaultLocale,
  getDictionary,
  getLocaleFromPathname,
  getSwitchLocalePath,
  locales,
  type Locale
} from "@/lib/i18n";

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);
  const dict = getDictionary(locale);

  return (
    <div className="flex items-center gap-2">
      <Badge className="hidden sm:inline-flex">{dict.switcherLabel}</Badge>
      {locales.map((targetLocale) => {
        const isActive = targetLocale === locale;
        return (
          <Link
            key={targetLocale}
            href={getSwitchLocalePath(pathname, targetLocale)}
            className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background text-muted-foreground"
            }`}
            hrefLang={targetLocale}
            locale={false}
          >
            {formatLocaleShort(targetLocale)}
          </Link>
        );
      })}
    </div>
  );
}

function formatLocaleShort(locale: Locale) {
  return locale === defaultLocale ? "RU" : "KZ";
}
