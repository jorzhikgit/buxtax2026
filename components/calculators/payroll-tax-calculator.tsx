"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { ResultRow } from "@/components/calculators/result-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculatorComplianceNote, calculatePayrollTax } from "@/lib/tax";
import type { Locale } from "@/lib/i18n";

interface PayrollTaxFormValues {
  salary: number;
}

export function PayrollTaxCalculator({ locale }: { locale?: Locale }) {
  const { register, watch } = useForm<PayrollTaxFormValues>({
    defaultValues: {
      salary: 400_000
    }
  });

  const values = watch();
  const result = useMemo(() => calculatePayrollTax(Number(values.salary)), [values]);

  return (
    <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-2xl">Payroll taxes calculator</CardTitle>
          <p className="text-sm leading-7 text-muted-foreground">
            Estimate the employer contribution side of payroll taxes in Kazakhstan.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Employee salary</label>
            <Input type="number" min={0} {...register("salary", { valueAsNumber: true })} />
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
            <ResultRow label="Social contributions" value={result.socialContributions} />
            <ResultRow
              label="Employer medical insurance"
              value={result.employerMedicalInsurance}
            />
            <ResultRow
              label="Employer pension contributions"
              value={result.employerPensionContributions}
            />
            <ResultRow label="Social tax" value={result.socialTax} />
            <ResultRow label="Employer contributions" value={result.employerTaxes} emphasize />
            <ResultRow label="Total cost" value={result.totalCost} emphasize />
          </CardContent>
        </Card>
        <LeadCaptureForm
          source="calculator"
          description="If you need monthly payroll processing, leave your details and we will prepare a payroll support offer."
          locale={locale}
        />
      </div>
    </div>
  );
}
