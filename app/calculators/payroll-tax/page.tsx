import type { Metadata } from "next";

import { PayrollTaxCalculator } from "@/components/calculators/payroll-tax-calculator";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Payroll Tax Calculator Kazakhstan",
  description:
    "Estimate employer payroll taxes, contributions and full salary cost in Kazakhstan."
};

export default function PayrollTaxCalculatorPage() {
  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow="Payroll Taxes"
          title="Payroll tax calculator for Kazakhstan employers"
          description="Useful for founders, HR and finance managers who need quick payroll cost visibility."
        />
        <PayrollTaxCalculator />
      </div>
    </section>
  );
}
