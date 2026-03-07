import type { Metadata } from "next";

import { SalaryCalculator } from "@/components/calculators/salary-calculator";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Salary Calculator Kazakhstan",
  description:
    "Calculate net salary, ИПН, ОПВ, ОСМС, employer taxes and total payroll cost in Kazakhstan."
};

export default function SalaryCalculatorPage() {
  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow="Salary Calculator"
          title="Salary calculator Kazakhstan for payroll planning"
          description="Estimate employee deductions and full employer cost with a calculator optimized for Kazakhstan payroll search intent."
        />
        <SalaryCalculator />
      </div>
    </section>
  );
}
