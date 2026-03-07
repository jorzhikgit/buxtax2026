import type { Metadata } from "next";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacts",
  description:
    "Contact BuxTax Kazakhstan for accounting outsourcing, payroll support, tax reporting and calculator follow-up consultations."
};

export default function ContactsPage() {
  return (
    <section className="section-space">
      <div className="container grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Contacts"
            title="Talk to a Kazakhstan accountant"
            description="Use this page for high-intent consultation requests from services, pricing and calculator pages."
          />
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-2xl">Contact details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>Phone: {siteConfig.phone}</p>
              <p>Email: {siteConfig.email}</p>
              <p>City: {siteConfig.city}, Kazakhstan</p>
              <p>Telegram: {siteConfig.telegram}</p>
              <p>
                Working with IP, LLP, startups, small business teams and freelancers across
                Kazakhstan.
              </p>
            </CardContent>
          </Card>
        </div>
        <LeadCaptureForm
          source="landing"
          title="Request an accountant consultation"
          description="Tell us what you need help with and we will reply with the next operational step."
        />
      </div>
    </section>
  );
}
