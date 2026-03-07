import type { Metadata } from "next";

import { AccountingPriceCalculator } from "@/components/calculators/accounting-price-calculator";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Accounting Price Calculator Kazakhstan",
  description:
    "Estimate accounting outsourcing cost for IP and LLP companies in Kazakhstan based on tax regime, employees and monthly documents."
};

export default function CalculatorPage() {
  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow="Accounting Calculator"
          title="Estimate your monthly accounting service price"
          description="A fast commercial calculator for founders comparing outsourcing cost in Kazakhstan."
        />
        <AccountingPriceCalculator />
      </div>
    </section>
  );
}
