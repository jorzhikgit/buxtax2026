"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { ResultRow } from "@/components/calculators/result-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  calculatorComplianceNote,
  calculateSalary,
  type SalaryEmployeeType,
  type SalaryTaxRegime
} from "@/lib/tax";
import type { Locale } from "@/lib/i18n";

interface SalaryFormValues {
  grossSalary: number;
  employeeType: SalaryEmployeeType;
  taxRegime: SalaryTaxRegime;
}

export function SalaryCalculator({ locale }: { locale?: Locale }) {
  const { register, watch } = useForm<SalaryFormValues>({
    defaultValues: {
      grossSalary: 400_000,
      employeeType: "resident",
      taxRegime: "general"
    }
  });

  const values = watch();
  const result = useMemo(
    () =>
      calculateSalary({
        grossSalary: Number(values.grossSalary),
        employeeType: values.employeeType,
        taxRegime: values.taxRegime
      }),
    [values]
  );

  return (
    <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-2xl">Salary calculator Kazakhstan</CardTitle>
          <p className="text-sm leading-7 text-muted-foreground">
            Calculate payroll deductions and employer taxes for salary budgeting in Kazakhstan.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Gross salary (KZT)</label>
            <Input type="number" min={0} {...register("grossSalary", { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Employee type</label>
            <Select {...register("employeeType")}>
              <option value="resident">Resident employee</option>
              <option value="foreign">Foreign employee</option>
              <option value="disabled">Employee with benefit assumptions</option>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tax regime</label>
            <Select {...register("taxRegime")}>
              <option value="general">General regime</option>
              <option value="small-business">Small business preference estimate</option>
              <option value="it-park">IT relief estimate</option>
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
            <ResultRow label="Individual income tax (ИПН)" value={result.individualIncomeTax} />
            <ResultRow label="Pension contributions (ОПВ)" value={result.pensionContributions} />
            <ResultRow label="Medical insurance (ОСМС)" value={result.medicalInsurance} />
            <ResultRow label="Employer social contributions (СО)" value={result.socialContributions} />
            <ResultRow
              label="Employer medical insurance"
              value={result.employerMedicalInsurance}
            />
            <ResultRow
              label="Employer pension contributions (ОПВР)"
              value={result.employerPensionContributions}
            />
            <ResultRow label="Employer social tax" value={result.socialTax} />
            <ResultRow label="Employer taxes" value={result.employerTaxes} emphasize />
            <ResultRow label="Net salary" value={result.netSalary} emphasize />
            <ResultRow label="Total employer cost" value={result.totalEmployerCost} emphasize />
          </CardContent>
        </Card>
        <LeadCaptureForm source="calculator" locale={locale} />
      </div>
    </div>
  );
}
