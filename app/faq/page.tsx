import type { Metadata } from "next";
import Script from "next/script";

import { FAQList } from "@/components/site/faq-list";
import { SectionHeading } from "@/components/site/section-heading";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about accounting outsourcing, payroll, tax reporting and Kazakhstan tax calculators."
};

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <section className="section-space">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container space-y-12">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Useful for conversion support, organic snippets and removing friction before consultation requests."
        />
        <FAQList items={faqs} />
      </div>
    </section>
  );
}
