import type { BlogPost, FAQItem, LeadSource, ServiceItem, Testimonial } from "@/types";

export const siteConfig = {
  name: "BuxTax Kazakhstan",
  url: "https://buxtax-kz.vercel.app",
  description:
    "Accounting outsourcing, tax reporting, payroll processing and Kazakhstan tax calculators for LLPs, IPs, startups and freelancers.",
  phone: "+7 (700) 000-00-00",
  email: "hello@buxtax.kz",
  city: "Almaty",
  region: "Kazakhstan",
  telegram: "@buxtaxkz"
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/calculator", label: "Price Calculator" },
  { href: "/tax-calculators", label: "Tax Calculators" },
  { href: "/blog", label: "Blog" },
  { href: "/contacts", label: "Contacts" }
];

export const services: ServiceItem[] = [
  {
    title: "Accounting outsourcing for LLP (ТОО)",
    description:
      "Monthly bookkeeping, management reports, tax submissions, bank reconciliation and founder-ready finance reporting for LLPs in Kazakhstan.",
    href: "/contacts"
  },
  {
    title: "Accounting services for IP (ИП)",
    description:
      "Routine bookkeeping and tax support for IPs on simplified and general regimes with practical guidance on reporting deadlines.",
    href: "/contacts"
  },
  {
    title: "Payroll accounting",
    description:
      "Payroll runs, salary calculation, payslips, кадровый accounting, tax and social payment calculations under the 2026 Kazakhstan rules.",
    href: "/contacts"
  },
  {
    title: "Tax reporting preparation",
    description:
      "Preparation and submission support for tax reports, reconciliation with KGD and deadline tracking for small and growing companies.",
    href: "/contacts"
  },
  {
    title: "VAT accounting",
    description:
      "VAT registration analysis, 300.00 reporting support, transaction reviews and practical treatment for Kazakhstan VAT operations.",
    href: "/contacts"
  },
  {
    title: "Electronic invoices (ЭСФ)",
    description:
      "ЭСФ setup, issue workflows, document controls and integration guidance for teams that need cleaner digital compliance.",
    href: "/contacts"
  },
  {
    title: "1C accounting system setup",
    description:
      "1C implementation, chart of accounts setup, document templates and workflows tailored to Kazakhstan reporting needs.",
    href: "/contacts"
  },
  {
    title: "Business registration",
    description:
      "Support with IP and LLP registration, tax regime selection and post-registration accounting setup so clients launch cleanly.",
    href: "/contacts"
  }
];

export const benefits = [
  "Kazakhstan-specific tax logic for salary, VAT and business tax estimates",
  "Lead capture on high-intent pages with free consultation follow-up",
  "Support for IP, LLP, startups, freelancers and service businesses",
  "SEO landing pages and calculator pages targeting commercial search intent",
  "Supabase-backed CRM and blog workflow for fast operational updates",
  "Telegram alerts for new leads from landing pages, calculators and blog"
];

export const testimonials: Testimonial[] = [
  {
    name: "Aruzhan S.",
    role: "Founder, e-commerce LLP",
    quote:
      "We moved payroll and accounting to BuxTax and finally got predictable monthly reporting. The team understands Kazakhstan tax details and communicates clearly."
  },
  {
    name: "Maksat T.",
    role: "Individual Entrepreneur",
    quote:
      "The calculator brought us in, but the консультация closed the deal. They explained the simplified regime and monthly tax burden in plain language."
  },
  {
    name: "Aigerim D.",
    role: "COO, SaaS startup",
    quote:
      "Useful for startups that need accounting, payroll, ESF and VAT support without building a full in-house finance team."
  }
];

export const faqs: FAQItem[] = [
  {
    question: "Do you work with both IP and LLP clients in Kazakhstan?",
    answer:
      "Yes. We support ИП and ТОО clients across bookkeeping, payroll, VAT, tax reporting, 1C setup and founder advisory."
  },
  {
    question: "Are the calculators tailored to Kazakhstan tax rules?",
    answer:
      "Yes. The calculators use Kazakhstan-specific assumptions for 2026 and clearly label estimates, caps and legacy regimes where needed."
  },
  {
    question: "Can I leave a lead after using a calculator?",
    answer:
      "Yes. Every calculator presents a lead form after the result so prospects can request a consultation while intent is high."
  },
  {
    question: "Do you help with VAT registration and reporting?",
    answer:
      "Yes. We help with VAT registration thresholds, reporting workflows, transaction review and monthly compliance support."
  },
  {
    question: "Can you take over payroll for a small team?",
    answer:
      "Yes. We support salary calculations, social payments, payroll taxes and ongoing monthly payroll processing."
  }
];

export const calculatorCards = [
  {
    title: "Salary calculator Kazakhstan",
    description:
      "Estimate employee deductions, employer taxes, net salary and total payroll cost under Kazakhstan payroll rules.",
    href: "/calculators/salary"
  },
  {
    title: "IP tax calculator",
    description:
      "Estimate business taxes for an Individual Entrepreneur under the 2026 Kazakhstan tax regime assumptions.",
    href: "/calculators/ip-tax"
  },
  {
    title: "VAT calculator",
    description:
      "Add VAT or remove VAT using the 2026 standard Kazakhstan VAT rate.",
    href: "/calculators/vat"
  },
  {
    title: "Payroll tax calculator",
    description:
      "Quick payroll tax estimate for employers who want to understand full employment cost in Kazakhstan.",
    href: "/calculators/payroll-tax"
  }
];

export const pricingHighlights = [
  {
    title: "Starter IP",
    price: "from 45 000 KZT",
    description: "For freelancers and solo IPs with low monthly document flow."
  },
  {
    title: "Growth LLP",
    price: "from 95 000 KZT",
    description: "For LLPs with payroll, VAT exposure and regular reporting."
  },
  {
    title: "Payroll + Reporting",
    price: "from 70 000 KZT",
    description: "Dedicated monthly payroll processing and tax filing support."
  }
];

export const leadSourceLabels: Record<LeadSource, string> = {
  landing: "Landing",
  calculator: "Calculator",
  blog: "Blog"
};

export const samplePosts: BlogPost[] = [
  {
    id: "sample-1",
    slug: "salary-calculator-kazakhstan-2026",
    title: "Salary calculator Kazakhstan 2026: what employers should include",
    excerpt:
      "A practical breakdown of payroll cost in Kazakhstan, including ИПН, ОПВ, ОСМС, social tax and employer contributions.",
    content: `# Salary calculator Kazakhstan 2026

Understanding payroll in Kazakhstan requires more than looking at the employee's gross salary. Employers also need to budget for **ОПВР**, **social contributions**, **social tax**, and **OSMS contributions**.

## Key items included in payroll cost

- Employee pension contributions (ОПВ)
- Employee medical insurance contributions (ОСМС)
- Individual income tax (ИПН)
- Employer social contributions (СО)
- Employer medical insurance contributions (ОСМС)
- Employer mandatory pension contributions (ОПВР)
- Employer social tax

## Why this matters for small businesses

If you are a startup, LLP or growing service company, payroll cost planning affects hiring pace, pricing and monthly cash flow. A salary calculator should therefore show:

1. Net salary
2. Employer taxes and contributions
3. Total employer cost

## Need a precise payroll setup?

Use our calculator and leave a lead for a Kazakhstan-specific payroll review.`,
    coverImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    tags: ["salary calculator Kazakhstan", "payroll accounting", "ИПН"],
    published: true,
    createdAt: "2026-02-28T09:00:00.000Z",
    updatedAt: "2026-02-28T09:00:00.000Z"
  },
  {
    id: "sample-2",
    slug: "ip-tax-calculator-kazakhstan",
    title: "IP tax calculator Kazakhstan: simplified vs general regime",
    excerpt:
      "How to compare tax burden for an Individual Entrepreneur in Kazakhstan and why 2026 regime changes matter.",
    content: `# IP tax calculator Kazakhstan

Since **January 1, 2026**, Kazakhstan uses an updated tax code. For many entrepreneurs, the practical comparison is between the **simplified declaration regime** and the **general regime**.

## Important change

The **patent regime** was abolished from **January 1, 2026**. If you see old online calculators still offering patent as a live option, that information is outdated.

## Simplified regime

For eligible businesses, the simplified declaration regime uses a **4% rate** under the 2026 rules, subject to local adjustments and eligibility criteria.

## General regime

Under the general regime, the real tax burden depends on documented deductible expenses. For quick lead-generation estimation, calculators often compare revenue against an assumed expense ratio and show an estimate only.

## Recommendation

Use the calculator for a fast estimate, then request a consultation for the final regime selection.`,
    coverImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    tags: ["IP tax calculator Kazakhstan", "accounting for IP Kazakhstan"],
    published: true,
    createdAt: "2026-02-20T10:00:00.000Z",
    updatedAt: "2026-02-20T10:00:00.000Z"
  },
  {
    id: "sample-3",
    slug: "accounting-for-llp-kazakhstan-guide",
    title: "Accounting for LLP Kazakhstan: core monthly checklist",
    excerpt:
      "A concise guide to monthly bookkeeping, payroll, VAT and management reporting for LLPs in Kazakhstan.",
    content: `# Accounting for LLP Kazakhstan

An LLP in Kazakhstan usually needs a repeatable monthly finance process covering bookkeeping, payroll, tax review and reporting deadlines.

## Monthly checklist

- Reconcile bank and cash transactions
- Post supplier and customer documents
- Review VAT implications and ESF workflow
- Process payroll and statutory contributions
- Prepare tax reporting and management numbers

## When outsourcing helps

Outsourcing is usually most efficient for small and mid-sized teams that need compliance and reporting without a full in-house accounting department.`,
    coverImage:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    tags: ["accounting for LLP Kazakhstan", "VAT reporting", "ЭСФ"],
    published: true,
    createdAt: "2026-02-12T11:30:00.000Z",
    updatedAt: "2026-02-12T11:30:00.000Z"
  },
  {
    id: "sample-4",
    slug: "vat-reporting-kazakhstan-2026",
    title: "VAT reporting Kazakhstan 2026: new standard rate and planning tips",
    excerpt:
      "What changed for VAT in Kazakhstan from January 1, 2026 and how businesses should update pricing and reporting workflows.",
    content: `# VAT reporting Kazakhstan 2026

From **January 1, 2026**, the standard VAT rate in Kazakhstan is **16%**. That changes pricing assumptions, invoice templates and internal accounting controls.

## What businesses should review

- Price lists and contracts
- Invoice templates and ESF settings
- VAT registration thresholds
- Reporting procedures for taxable turnover

## Use case for a VAT calculator

A VAT calculator helps sales, finance and founders quickly compare net and gross pricing under the 16% rate.`,
    coverImage:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    tags: ["VAT calculator", "VAT reporting", "accounting services Kazakhstan"],
    published: true,
    createdAt: "2026-02-04T08:45:00.000Z",
    updatedAt: "2026-02-04T08:45:00.000Z"
  },
  {
    id: "sample-5",
    slug: "electronic-invoices-esf-kazakhstan",
    title: "Electronic invoices ESF in Kazakhstan: what small businesses should standardize",
    excerpt:
      "A practical overview of ESF operations, common process gaps and what accountants should monitor.",
    content: `# Electronic invoices ESF in Kazakhstan

ЭСФ discipline is not just an IT task. It affects VAT treatment, client communication and document integrity.

## Standardize these items first

- Who issues invoices
- Who checks tax treatment
- How corrections are handled
- How invoice data is archived

## For growing teams

If sales, operations and accounting all touch invoicing, a documented ESF workflow prevents reporting issues later.`,
    coverImage:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80",
    tags: ["ESF electronic invoices", "accounting services Kazakhstan"],
    published: true,
    createdAt: "2026-01-24T14:00:00.000Z",
    updatedAt: "2026-01-24T14:00:00.000Z"
  }
];
