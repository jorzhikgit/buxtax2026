import type { Metadata } from "next";

import { CtaBanner } from "@/components/site/cta-banner";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accounting Services Kazakhstan",
  description:
    "Accounting outsourcing, payroll, VAT, tax reporting, ESF and 1C setup services for IP and LLP clients in Kazakhstan."
};

export default function ServicesPage() {
  return (
    <>
      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow="Services"
            title="Accounting services for Kazakhstan businesses"
            description="Commercial service pages targeting accounting services Kazakhstan, accounting for IP Kazakhstan and accounting for LLP Kazakhstan."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-space pt-0">
        <div className="container">
          <CtaBanner
            title="Need a monthly accounting proposal?"
            description="Share your business type, document volume and payroll setup. We will scope the service and recommend the right support model."
          />
        </div>
      </section>
    </>
  );
}
