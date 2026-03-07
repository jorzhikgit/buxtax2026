import type { Metadata } from "next";

import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for lead collection, admin access and calculator form submissions."
};

export default function PrivacyPage() {
  return (
    <section className="section-space">
      <div className="container max-w-4xl space-y-8">
        <h1 className="font-display text-5xl">Privacy Policy</h1>
        <Card>
          <CardContent className="p-8 text-sm leading-8 text-muted-foreground">
            <p>
              We collect personal data submitted through consultation forms, calculator lead forms
              and blog lead forms. This includes name, phone, email, business type and message.
            </p>
            <p>
              The data is stored in Supabase, used for lead processing and may trigger Telegram
              notifications for internal response workflows. We do not sell lead data to third
              parties.
            </p>
            <p>
              By submitting a form, you consent to being contacted regarding accounting, payroll,
              tax reporting and related business services in Kazakhstan.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
