import type { Metadata } from "next";

import { AccountingPriceCalculator } from "@/components/calculators/accounting-price-calculator";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingHighlights } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accounting Pricing Kazakhstan",
  description:
    "Review sample accounting package pricing for IP, LLP and payroll support in Kazakhstan, then calculate a tailored monthly estimate."
};

export default function PricingPage() {
  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent starting prices for Kazakhstan accounting services"
          description="Use package ranges for orientation, then validate the actual workload with the accounting price calculator."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {pricingHighlights.map((item) => (
            <Card key={item.title} className="bg-white">
              <CardHeader>
                <CardTitle className="font-display text-3xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-3xl font-semibold">{item.price}</p>
                <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <AccountingPriceCalculator />
      </div>
    </section>
  );
}
