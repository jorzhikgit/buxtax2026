import Link from "next/link";

import { Button } from "@/components/ui/button";
import { localizePath, type Locale } from "@/lib/i18n";

export function CtaBanner({
  title,
  description,
  locale,
  consultationText = "Get Free Consultation",
  calculatorsText = "Open Calculators"
}: {
  title: string;
  description: string;
  locale?: Locale;
  consultationText?: string;
  calculatorsText?: string;
}) {
  const contactsHref = locale ? localizePath("/contacts", locale) : "/contacts";
  const calcHref = locale ? localizePath("/tax-calculators", locale) : "/tax-calculators";

  return (
    <div className="rounded-[32px] bg-[#163642] p-8 text-white shadow-soft sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
          <p className="text-sm leading-7 text-white/78 sm:text-base">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={contactsHref}>
            <Button size="lg">{consultationText}</Button>
          </Link>
          <Link href={calcHref}>
            <Button variant="secondary" size="lg">
              {calculatorsText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
