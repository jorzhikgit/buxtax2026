"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { ResultRow } from "@/components/calculators/result-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { calculatorComplianceNote, calculateVat } from "@/lib/tax";
import type { Locale } from "@/lib/i18n";

interface VatFormValues {
  amount: number;
  type: "add" | "remove";
}

export function VatCalculator({ locale }: { locale?: Locale }) {
  const { register, watch } = useForm<VatFormValues>({
    defaultValues: {
      amount: 1_000_000,
      type: "add"
    }
  });

  const values = watch();
  const result = useMemo(
    () => calculateVat(Number(values.amount), values.type),
    [values]
  );

  return (
    <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-2xl">VAT calculator Kazakhstan</CardTitle>
          <p className="text-sm leading-7 text-muted-foreground">
            Add VAT or remove VAT using the Kazakhstan 2026 standard 16% VAT rate.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input type="number" min={0} {...register("amount", { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">VAT type</label>
            <Select {...register("type")}>
              <option value="add">Add VAT</option>
              <option value="remove">Remove VAT</option>
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
            <ResultRow label="VAT amount" value={result.vatAmount} />
            <ResultRow label="Total amount" value={result.totalAmount} emphasize />
          </CardContent>
        </Card>
        <LeadCaptureForm
          source="calculator"
          description="Need help with VAT registration, reporting or ESF workflow? Leave your details for a VAT consultation."
          locale={locale}
        />
      </div>
    </div>
  );
}
