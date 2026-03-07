export const kzTaxConstants2026 = {
  minWage: 85_000,
  mrp: 4_325,
  vatRate: 0.16,
  salary: {
    employeePensionRate: 0.1,
    employeeMedicalRate: 0.02,
    incomeTaxRate: 0.1,
    socialContributionRate: 0.05,
    employerMedicalRate: 0.03,
    employerPensionRate: 0.035,
    socialTaxRate: 0.06,
    pensionCapByMinWage: 50,
    medicalCapByMinWage: 10,
    socialContributionCapByMinWage: 7,
    employerMedicalCapByMinWage: 10,
    employerPensionCapByMinWage: 50
  },
  business: {
    simplifiedRate: 0.04,
    generalIpIncomeTaxRate: 0.1
  }
} as const;

export type SalaryEmployeeType = "resident" | "foreign" | "disabled";
export type SalaryTaxRegime = "general" | "it-park" | "small-business";

export interface SalaryCalculationInput {
  grossSalary: number;
  employeeType: SalaryEmployeeType;
  taxRegime: SalaryTaxRegime;
}

export interface SalaryCalculationResult {
  grossSalary: number;
  individualIncomeTax: number;
  pensionContributions: number;
  medicalInsurance: number;
  socialContributions: number;
  employerMedicalInsurance: number;
  employerPensionContributions: number;
  socialTax: number;
  employerTaxes: number;
  netSalary: number;
  totalEmployerCost: number;
}

function capIncome(value: number, multiplier: number) {
  return Math.min(value, kzTaxConstants2026.minWage * multiplier);
}

export function calculateSalary({
  grossSalary,
  employeeType,
  taxRegime
}: SalaryCalculationInput): SalaryCalculationResult {
  const rates = kzTaxConstants2026.salary;
  const pensionBase = capIncome(grossSalary, rates.pensionCapByMinWage);
  const medicalBase = capIncome(grossSalary, rates.medicalCapByMinWage);
  const socialContributionBase = capIncome(
    grossSalary,
    rates.socialContributionCapByMinWage
  );
  const employerMedicalBase = capIncome(
    grossSalary,
    rates.employerMedicalCapByMinWage
  );
  const employerPensionBase = capIncome(
    grossSalary,
    rates.employerPensionCapByMinWage
  );

  const pensionContributions =
    employeeType === "foreign" ? 0 : pensionBase * rates.employeePensionRate;
  const medicalInsurance = medicalBase * rates.employeeMedicalRate;
  const taxableIncome = Math.max(grossSalary - pensionContributions - medicalInsurance, 0);

  const incomeTaxRate = taxRegime === "it-park" ? 0 : rates.incomeTaxRate;
  const individualIncomeTax =
    employeeType === "disabled" ? taxableIncome * 0.05 : taxableIncome * incomeTaxRate;

  const socialContributions =
    employeeType === "foreign" ? 0 : socialContributionBase * rates.socialContributionRate;
  const employerMedicalInsurance = employerMedicalBase * rates.employerMedicalRate;
  const employerPensionContributions =
    employeeType === "foreign" ? 0 : employerPensionBase * rates.employerPensionRate;
  const socialTaxBase =
    taxRegime === "small-business" ? grossSalary * 0.85 : grossSalary;
  const socialTax = socialTaxBase * rates.socialTaxRate;

  const employerTaxes =
    socialContributions +
    employerMedicalInsurance +
    employerPensionContributions +
    socialTax;

  const netSalary =
    grossSalary - pensionContributions - medicalInsurance - individualIncomeTax;

  return {
    grossSalary,
    individualIncomeTax,
    pensionContributions,
    medicalInsurance,
    socialContributions,
    employerMedicalInsurance,
    employerPensionContributions,
    socialTax,
    employerTaxes,
    netSalary,
    totalEmployerCost: grossSalary + employerTaxes
  };
}

export function calculateAccountingPrice(input: {
  companyType: "ip" | "llp";
  taxRegime: "simplified" | "general" | "vat";
  employeeCount: number;
  monthlyDocuments: number;
}) {
  const base = input.companyType === "ip" ? 35_000 : 65_000;
  const regimeMultiplier =
    input.taxRegime === "general" ? 1.35 : input.taxRegime === "vat" ? 1.55 : 1;
  const employeeCost = input.employeeCount * 6_500;
  const documentCost = input.monthlyDocuments * 750;

  return Math.round((base + employeeCost + documentCost) * regimeMultiplier);
}

export function calculateVat(amount: number, type: "add" | "remove") {
  const rate = kzTaxConstants2026.vatRate;

  if (type === "add") {
    const vatAmount = amount * rate;
    return {
      vatAmount,
      totalAmount: amount + vatAmount
    };
  }

  const vatAmount = amount - amount / (1 + rate);
  return {
    vatAmount,
    totalAmount: amount
  };
}

export function calculateIpTax(input: {
  monthlyIncome: number;
  regime: "simplified" | "patent" | "general";
}) {
  const monthlyIncome = input.monthlyIncome;

  if (input.regime === "patent") {
    return {
      available: false,
      note: "Patent regime was abolished in Kazakhstan on January 1, 2026.",
      monthlyTax: 0,
      annualTax: 0
    };
  }

  if (input.regime === "simplified") {
    const monthlyTax = monthlyIncome * kzTaxConstants2026.business.simplifiedRate;
    return {
      available: true,
      note: "Estimate based on the 2026 simplified declaration regime at 4%.",
      monthlyTax,
      annualTax: monthlyTax * 12
    };
  }

  const assumedExpenseRatio = 0.3;
  const taxableProfit = monthlyIncome * (1 - assumedExpenseRatio);
  const monthlyTax =
    taxableProfit * kzTaxConstants2026.business.generalIpIncomeTaxRate;

  return {
    available: true,
    note: "Estimate for the general regime using a conservative 30% assumed expense ratio.",
    monthlyTax,
    annualTax: monthlyTax * 12
  };
}

export function calculatePayrollTax(salary: number) {
  const breakdown = calculateSalary({
    grossSalary: salary,
    employeeType: "resident",
    taxRegime: "general"
  });

  return {
    socialContributions: breakdown.socialContributions,
    employerMedicalInsurance: breakdown.employerMedicalInsurance,
    employerPensionContributions: breakdown.employerPensionContributions,
    socialTax: breakdown.socialTax,
    employerTaxes: breakdown.employerTaxes,
    totalCost: breakdown.totalEmployerCost
  };
}

export const calculatorComplianceNote =
  "Calculator results are estimates based on Kazakhstan 2026 tax rules and standard assumptions. Final amounts may change due to deductions, caps, sector benefits, residency, disability status, local rate adjustments, and specific contract conditions.";
