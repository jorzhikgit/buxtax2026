import Link from "next/link";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { BlogCard } from "@/components/site/blog-card";
import { CtaBanner } from "@/components/site/cta-banner";
import { FAQList } from "@/components/site/faq-list";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { benefits, calculatorCards, faqs, services, testimonials } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";

export default async function HomePage() {
  const latestPosts = (await getPublishedPosts()).slice(0, 3);

  return (
    <>
      <section className="section-space pt-14 sm:pt-20">
        <div className="container grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Kazakhstan accounting and tax outsourcing
              </p>
              <h1 className="font-display text-5xl leading-tight sm:text-6xl">
                Professional Accounting Services in Kazakhstan
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Accounting outsourcing, tax reporting and payroll services for businesses.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contacts">
                <Button size="lg">Get Free Consultation</Button>
              </Link>
              <Link href="/tax-calculators">
                <Button size="lg" variant="secondary">
                  Calculate Taxes
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Focus</p>
                  <p className="mt-2 text-3xl font-semibold">IP + LLP</p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Lead magnets</p>
                  <p className="mt-2 text-3xl font-semibold">4 calculators</p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">Coverage</p>
                  <p className="mt-2 text-3xl font-semibold">Kazakhstan</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card className="overflow-hidden border-primary/10 bg-[#163642] text-white">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-3xl">Why this site converts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-[24px] bg-white/8 p-4 text-sm leading-7">
                  {benefit}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow="About Company"
            title="Accounting operations built for Kazakhstan business reality"
            description="BuxTax Kazakhstan combines compliance execution with lead-generation tools. The website is designed to rank for commercial accounting queries, turn calculator traffic into consultations, and support ongoing client acquisition."
          />
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <Card>
              <CardContent className="p-8 text-sm leading-8 text-muted-foreground">
                We help Individual Entrepreneurs, LLPs, startups, freelancers and small
                businesses with bookkeeping, payroll, VAT, tax reporting, ESF workflows, 1C
                setup and business registration. Every service page and calculator is tuned for
                Kazakhstan-specific search intent such as salary calculator Kazakhstan, IP tax
                calculator Kazakhstan, accounting for LLP Kazakhstan and accounting services
                Kazakhstan.
              </CardContent>
            </Card>
            <Card className="bg-accent">
              <CardContent className="grid h-full place-items-center p-8">
                <div className="max-w-sm space-y-3 text-center">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Conversion system
                  </p>
                  <p className="font-display text-4xl">Traffic to calculator to lead to consult</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow="Services"
            title="Core accounting services for IP, LLP and payroll operations"
            description="Service pages are written to rank for high-intent search terms while keeping the consultation CTA visible across the funnel."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow="Calculator Preview"
            title="Lead-generation calculators for tax and payroll intent"
            description="Each calculator is designed to answer a practical tax question, show a result immediately, then capture leads with a consultation form."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {calculatorCards.map((calculator) => (
              <Card key={calculator.href} className="bg-white">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">{calculator.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm leading-7 text-muted-foreground">
                    {calculator.description}
                  </p>
                  <Link href={calculator.href}>
                    <Button variant="secondary">Open calculator</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow="Blog"
            title="Latest accounting and tax articles"
            description="The blog supports local SEO with Kazakhstan-specific topics and internal links to service pages and calculators."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted by founders, IPs and growing teams"
            description="Social proof blocks support conversion on transactional service pages and tax calculator pages."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers to common accounting questions in Kazakhstan"
            description="Short answers improve on-page trust and help search engines understand the site structure."
          />
          <FAQList items={faqs.slice(0, 4)} />
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <LeadCaptureForm
            source="landing"
            title="Get a free accounting consultation"
            description="Tell us about your company, tax regime and accounting problem. We will reply with a practical next step."
          />
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container">
          <CtaBanner
            title="Need a fast answer on payroll, VAT or tax regime choice?"
            description="Use the calculators to estimate your numbers, then leave a lead for a Kazakhstan-specific accountant review."
          />
        </div>
      </section>
    </>
  );
}
