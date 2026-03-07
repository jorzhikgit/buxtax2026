import type { Metadata } from "next";

import { VatCalculator } from "@/components/calculators/vat-calculator";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "VAT Calculator Kazakhstan",
  description:
    "Add VAT or remove VAT using the Kazakhstan 2026 16% VAT rate and request expert VAT support."
};

export default function VatCalculatorPage() {
  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow="VAT Calculator"
          title="VAT calculator Kazakhstan"
          description="Quickly add VAT or remove VAT for pricing, invoices and compliance checks."
        />
        <VatCalculator />
      </div>
    </section>
  );
}
