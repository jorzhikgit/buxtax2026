import type { Metadata } from "next";

import { IpTaxCalculator } from "@/components/calculators/ip-tax-calculator";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "IP Tax Calculator Kazakhstan",
  description:
    "Estimate Individual Entrepreneur taxes in Kazakhstan using the simplified and general regime assumptions for 2026."
};

export default function IpTaxCalculatorPage() {
  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow="IP Tax Calculator"
          title="IP tax calculator Kazakhstan"
          description="Compare business tax estimates for an Individual Entrepreneur and turn tax questions into consultation leads."
        />
        <IpTaxCalculator />
      </div>
    </section>
  );
}
