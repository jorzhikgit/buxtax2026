"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { ResultRow } from "@/components/calculators/result-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { calculatorComplianceNote, calculateIpTax } from "@/lib/tax";
import { formatCurrency } from "@/lib/utils";

interface IpTaxFormValues {
  monthlyIncome: number;
  regime: "simplified" | "patent" | "general";
}

export function IpTaxCalculator() {
  const { register, watch } = useForm<IpTaxFormValues>({
    defaultValues: {
      monthlyIncome: 1_500_000,
      regime: "simplified"
    }
  });

  const values = watch();
  const result = useMemo(
    () =>
      calculateIpTax({
        monthlyIncome: Number(values.monthlyIncome),
        regime: values.regime
      }),
    [values]
  );

  return (
    <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-2xl">IP tax calculator Kazakhstan</CardTitle>
          <p className="text-sm leading-7 text-muted-foreground">
            Compare tax burden for an Individual Entrepreneur under the Kazakhstan 2026 tax rules.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Monthly income</label>
            <Input type="number" min={0} {...register("monthlyIncome", { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tax regime</label>
            <Select {...register("regime")}>
              <option value="simplified">Simplified</option>
              <option value="general">General</option>
              <option value="patent">Patent (legacy, unavailable since 01 Jan 2026)</option>
            </Select>
          </div>
          <p className="text-xs leading-6 text-muted-foreground">{calculatorComplianceNote}</p>
        </CardContent>
      </Card>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl">Result summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ResultRow label="Monthly tax" value={result.monthlyTax} />
            <ResultRow label="Annual tax" value={result.annualTax} emphasize />
            <div className="mt-4 rounded-[24px] bg-accent p-4 text-sm leading-7 text-muted-foreground">
              <p className="font-semibold text-foreground">
                {result.available ? formatCurrency(result.monthlyTax) : "Legacy regime warning"}
              </p>
              <p className="mt-2">{result.note}</p>
            </div>
          </CardContent>
        </Card>
        <LeadCaptureForm
          source="calculator"
          description="Share your income level and we will verify the most suitable tax regime and reporting obligations for your IP."
        />
      </div>
    </div>
  );
}
