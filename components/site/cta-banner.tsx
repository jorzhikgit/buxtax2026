import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CtaBanner({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[32px] bg-[#163642] p-8 text-white shadow-soft sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
          <p className="text-sm leading-7 text-white/78 sm:text-base">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contacts">
            <Button size="lg">Get Free Consultation</Button>
          </Link>
          <Link href="/tax-calculators">
            <Button variant="secondary" size="lg">
              Open Calculators
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
