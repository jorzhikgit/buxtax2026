"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { calculatorComplianceNote, calculateAccountingPrice } from "@/lib/tax";
import { formatCurrency } from "@/lib/utils";

interface FormValues {
  companyType: "ip" | "llp";
  taxRegime: "simplified" | "general" | "vat";
  employeeCount: number;
  monthlyDocuments: number;
}

export function AccountingPriceCalculator() {
  const { register, watch } = useForm<FormValues>({
    defaultValues: {
      companyType: "ip",
      taxRegime: "simplified",
      employeeCount: 1,
      monthlyDocuments: 15
    }
  });

  const values = watch();
  const estimate = useMemo(
    () =>
      calculateAccountingPrice({
        companyType: values.companyType,
        taxRegime: values.taxRegime,
        employeeCount: Number(values.employeeCount),
        monthlyDocuments: Number(values.monthlyDocuments)
      }),
    [values]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-2xl">Accounting price calculator</CardTitle>
          <p className="text-sm leading-7 text-muted-foreground">
            Estimate your monthly accounting outsourcing fee in KZT based on business type,
            regime, payroll and document volume.
          </p>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company type</label>
              <Select {...register("companyType")}>
                <option value="ip">IP (ИП)</option>
                <option value="llp">LLP (ТОО)</option>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tax regime</label>
              <Select {...register("taxRegime")}>
                <option value="simplified">Simplified</option>
                <option value="general">General</option>
                <option value="vat">VAT + General</option>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of employees</label>
              <Input type="number" min={0} {...register("employeeCount", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Monthly documents</label>
              <Input
                type="number"
                min={0}
                {...register("monthlyDocuments", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className="rounded-[24px] bg-accent p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Estimated monthly price
            </p>
            <p className="mt-3 font-display text-4xl">{formatCurrency(estimate)}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{calculatorComplianceNote}</p>
          </div>
        </CardContent>
      </Card>
      <LeadCaptureForm
        source="calculator"
        title="Request a tailored accounting quote"
        description="Send your details and we will validate the estimate, scope the workload and prepare a practical monthly offer."
      />
    </div>
  );
}
