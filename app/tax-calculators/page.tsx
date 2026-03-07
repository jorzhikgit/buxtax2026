import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculatorCards } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tax Calculators Kazakhstan",
  description:
    "Open salary, IP tax, VAT and payroll tax calculators tailored to Kazakhstan tax and payroll rules."
};

export default function TaxCalculatorsPage() {
  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow="Tax Calculators"
          title="Kazakhstan tax and payroll calculators"
          description="Calculator pages are structured for transactional SEO, immediate value and post-calculation lead capture."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {calculatorCards.map((calculator) => (
            <Card key={calculator.href}>
              <CardHeader>
                <CardTitle className="font-display text-3xl">{calculator.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm leading-7 text-muted-foreground">
                  {calculator.description}
                </p>
                <Link href={calculator.href}>
                  <Button variant="secondary">Open calculator</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
