import Link from "next/link";
import Script from "next/script";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { AccountingPriceCalculator } from "@/components/calculators/accounting-price-calculator";
import { IpTaxCalculator } from "@/components/calculators/ip-tax-calculator";
import { PayrollTaxCalculator } from "@/components/calculators/payroll-tax-calculator";
import { SalaryCalculator } from "@/components/calculators/salary-calculator";
import { VatCalculator } from "@/components/calculators/vat-calculator";
import { BlogCard } from "@/components/site/blog-card";
import { CtaBanner } from "@/components/site/cta-banner";
import { FAQList } from "@/components/site/faq-list";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { TestimonialCard } from "@/components/site/testimonial-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPaginatedPublishedPosts, renderMarkdown } from "@/lib/blog";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";
import { getPublishedServicePages } from "@/lib/service-pages";
import { siteConfig } from "@/lib/site";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

export async function HomePageContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const latestPosts = (await getPaginatedPublishedPosts(1, 3)).posts;

  return (
    <>
      <section className="section-space pt-14 sm:pt-20">
        <div className="container grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                {dict.home.heroEyebrow}
              </p>
              <h1 className="font-display text-5xl leading-tight sm:text-6xl">
                {dict.home.heroTitle}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                {dict.home.heroDescription}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={localizePath("/contacts", locale)}>
                <Button size="lg">{dict.buttons.getConsultation}</Button>
              </Link>
              <Link href={localizePath("/tax-calculators", locale)}>
                <Button size="lg" variant="secondary">
                  {dict.buttons.calculateTaxes}
                </Button>
              </Link>
            </div>
          </div>
          <Card className="overflow-hidden border-primary/10 bg-[#163642] text-white">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-3xl">{dict.home.heroCardTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dict.benefits.map((benefit) => (
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
            eyebrow={dict.home.aboutEyebrow}
            title={dict.home.aboutTitle}
            description={dict.home.aboutDescription}
          />
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <Card>
              <CardContent className="p-8 text-sm leading-8 text-muted-foreground">
                {dict.home.aboutParagraph}
              </CardContent>
            </Card>
            <Card className="bg-accent">
              <CardContent className="grid h-full place-items-center p-8">
                <div className="max-w-sm space-y-3 text-center">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    {dict.home.aboutCardLabel}
                  </p>
                  <p className="font-display text-4xl">{dict.home.aboutCardTitle}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow={dict.home.servicesEyebrow}
            title={dict.home.servicesTitle}
            description={dict.home.servicesDescription}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {dict.services.slice(0, 6).map((service) => (
              <ServiceCard key={service.title} service={service} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow={dict.home.calculatorsEyebrow}
            title={dict.home.calculatorsTitle}
            description={dict.home.calculatorsDescription}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dict.calculatorCards.map((calculator) => (
              <Card key={calculator.href} className="bg-white">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">{calculator.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm leading-7 text-muted-foreground">
                    {calculator.description}
                  </p>
                  <Link href={localizePath(calculator.href, locale)}>
                    <Button variant="secondary">{dict.buttons.openCalculator}</Button>
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
            eyebrow={dict.home.blogEyebrow}
            title={dict.home.blogTitle}
            description={dict.home.blogDescription}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow={dict.home.testimonialsEyebrow}
            title={dict.home.testimonialsTitle}
            description={dict.home.testimonialsDescription}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {dict.testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow={dict.home.faqEyebrow}
            title={dict.home.faqTitle}
            description={dict.home.faqDescription}
          />
          <FAQList items={dict.faqs.slice(0, 4)} />
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <LeadCaptureForm
            locale={locale}
            source="landing"
            title={dict.home.leadTitle}
            description={dict.home.leadDescription}
          />
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container">
          <CtaBanner
            locale={locale}
            title={dict.ctaBanner.title}
            description={dict.ctaBanner.description}
          />
        </div>
      </section>
    </>
  );
}

export async function ServicesPageContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const servicePages = (await getPublishedServicePages()).slice(0, 8);

  return (
    <>
      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow={dict.servicesPage.eyebrow}
            title={dict.servicesPage.title}
            description={dict.servicesPage.description}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {dict.services.map((service) => (
              <ServiceCard key={service.title} service={service} locale={locale} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-space pt-0">
        <div className="container space-y-8">
          <SectionHeading
            eyebrow="SEO Pages"
            title="Популярные страницы по бухгалтерским услугам"
            description="Эти страницы созданы под частотные запросы Google по бухгалтерии в Казахстане и крупных городах."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {servicePages.map((page) => (
              <Link
                key={page.slug}
                href={localizePath(`/services/${page.slug}`, locale)}
                className="rounded-[24px] border border-border bg-white p-5 text-sm font-medium text-foreground shadow-soft hover:text-primary"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space pt-0">
        <div className="container">
          <CtaBanner
            locale={locale}
            title={dict.servicesPage.ctaTitle}
            description={dict.servicesPage.ctaDescription}
          />
        </div>
      </section>
    </>
  );
}

export function PricingPageContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow={dict.nav[2].label}
          title={dict.pricing.headingTitle}
          description={dict.pricing.headingDescription}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {dict.pricing.packages.map((item) => (
            <Card key={item.title} className="bg-white">
              <CardHeader>
                <CardTitle className="font-display text-3xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-3xl font-semibold">{item.price}</p>
                <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <AccountingPriceCalculator locale={locale} />
      </div>
    </section>
  );
}

export function CalculatorLandingPageContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow={dict.calculatorPage.eyebrow}
          title={dict.calculatorPage.title}
          description={dict.calculatorPage.description}
        />
        <AccountingPriceCalculator locale={locale} />
      </div>
    </section>
  );
}

export function TaxCalculatorsPageContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow={dict.taxCalculatorsPage.eyebrow}
          title={dict.taxCalculatorsPage.title}
          description={dict.taxCalculatorsPage.description}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {dict.calculatorCards.map((calculator) => (
            <Card key={calculator.href}>
              <CardHeader>
                <CardTitle className="font-display text-3xl">{calculator.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm leading-7 text-muted-foreground">
                  {calculator.description}
                </p>
                <Link href={localizePath(calculator.href, locale)}>
                  <Button variant="secondary">{dict.buttons.openCalculator}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SalaryCalculatorPageContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow={dict.calculatorCards[0].title}
          title={dict.metadata.salaryCalculator.title}
          description={dict.metadata.salaryCalculator.description}
        />
        <SalaryCalculator locale={locale} />
      </div>
    </section>
  );
}

export function IpTaxCalculatorPageContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow={dict.calculatorCards[1].title}
          title={dict.metadata.ipTaxCalculator.title}
          description={dict.metadata.ipTaxCalculator.description}
        />
        <IpTaxCalculator locale={locale} />
      </div>
    </section>
  );
}

export function VatCalculatorPageContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow={dict.calculatorCards[2].title}
          title={dict.metadata.vatCalculator.title}
          description={dict.metadata.vatCalculator.description}
        />
        <VatCalculator locale={locale} />
      </div>
    </section>
  );
}

export function PayrollTaxCalculatorPageContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow={dict.calculatorCards[3].title}
          title={dict.metadata.payrollTaxCalculator.title}
          description={dict.metadata.payrollTaxCalculator.description}
        />
        <PayrollTaxCalculator locale={locale} />
      </div>
    </section>
  );
}

export async function BlogPageContent({
  locale,
  page
}: {
  locale: Locale;
  page: number;
}) {
  const dict = getDictionary(locale);
  const { posts, totalPages, currentPage } = await getPaginatedPublishedPosts(page);

  return (
    <section className="section-space">
      <div className="container space-y-12">
        <SectionHeading
          eyebrow={dict.blogPage.eyebrow}
          title={dict.blogPage.title}
          description={dict.blogPage.description}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length: totalPages }, (_, index) => {
            const targetPage = index + 1;
            const href = `${localizePath("/blog", locale)}?page=${targetPage}`;
            return (
              <Link key={targetPage} href={href}>
                <Button variant={targetPage === currentPage ? "default" : "secondary"}>
                  {targetPage}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export async function BlogPostContent({
  locale,
  post
}: {
  locale: Locale;
  post: BlogPost;
}) {
  const dict = getDictionary(locale);
  const html = await renderMarkdown(post.content);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name
    }
  };

  return (
    <section className="section-space">
      <Script
        id={`article-jsonld-${locale}-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="container max-w-4xl space-y-10">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="font-display text-5xl leading-tight">{post.title}</h1>
          <p className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</p>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
        </div>
        <Card>
          <CardContent className="p-8">
            <article className="prose-tax" dangerouslySetInnerHTML={{ __html: html }} />
          </CardContent>
        </Card>
        <LeadCaptureForm
          locale={locale}
          source="blog"
          title={dict.blogPost.leadTitle}
          description={dict.blogPost.leadDescription}
        />
      </div>
    </section>
  );
}

export function FAQPageContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faqs.map((item) => ({
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
        id={`faq-jsonld-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container space-y-12">
        <SectionHeading
          eyebrow={dict.faqPage.eyebrow}
          title={dict.faqPage.title}
          description={dict.faqPage.description}
        />
        <FAQList items={dict.faqs} />
      </div>
    </section>
  );
}

export function ContactsPageContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="section-space">
      <div className="container grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow={dict.contactsPage.eyebrow}
            title={dict.contactsPage.title}
            description={dict.contactsPage.description}
          />
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-2xl">{dict.contactsPage.cardTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>{dict.contactsPage.phoneLabel}: {siteConfig.phone}</p>
              <p>{dict.contactsPage.emailLabel}: {siteConfig.email}</p>
              <p>{dict.contactsPage.cityLabel}: {siteConfig.city}, {siteConfig.region}</p>
              <p>{dict.contactsPage.telegramLabel}: {siteConfig.telegram}</p>
              <p>{dict.contactsPage.companyScope}</p>
            </CardContent>
          </Card>
        </div>
        <LeadCaptureForm
          locale={locale}
          source="landing"
          title={dict.contactsPage.formTitle}
          description={dict.contactsPage.formDescription}
        />
      </div>
    </section>
  );
}

export function PrivacyPageContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="section-space">
      <div className="container max-w-4xl space-y-8">
        <h1 className="font-display text-5xl">{dict.privacyPage.title}</h1>
        <Card>
          <CardContent className="space-y-6 p-8 text-sm leading-8 text-muted-foreground">
            {dict.privacyPage.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
