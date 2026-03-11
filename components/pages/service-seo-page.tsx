import Link from "next/link";
import Script from "next/script";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { CtaBanner } from "@/components/site/cta-banner";
import { FAQList } from "@/components/site/faq-list";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";
import {
  getServicePageBenefits,
  getServicePageFaq
} from "@/lib/service-pages";
import { siteConfig } from "@/lib/site";
import type { ServicePage } from "@/types";

function paragraphs(content: string) {
  return content
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function ServiceSeoPage({
  page,
  locale = "ru"
}: {
  page: ServicePage;
  locale?: Locale;
}) {
  const dict = getDictionary(locale);
  const benefits = getServicePageBenefits(page.title);
  const faqItems = getServicePageFaq(page);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: page.title,
    description: page.metaDescription,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    },
    areaServed: "Kazakhstan",
    serviceType: page.title,
    url: `${siteConfig.url}${localizePath(`/services/${page.slug}`, locale)}`
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      <Script
        id={`service-jsonld-${page.slug}-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id={`service-faq-jsonld-${page.slug}-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="section-space pt-14 sm:pt-20">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              SEO Service Page
            </p>
            <h1 className="font-display text-5xl leading-tight sm:text-6xl">{page.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {page.metaDescription}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="#lead-form">
                <Button size="lg">{dict.buttons.getConsultation}</Button>
              </Link>
              <Link href={localizePath("/tax-calculators", locale)}>
                <Button size="lg" variant="secondary">
                  {dict.buttons.calculateTaxes}
                </Button>
              </Link>
            </div>
          </div>
          <Card className="bg-[#163642] text-white">
            <CardHeader>
              <CardTitle className="font-display text-3xl">Что входит в сопровождение</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-7 text-white/84">
              <p>Налоговая отчетность и контроль сроков</p>
              <p>Бухгалтерский аутсорсинг и ведение учета</p>
              <p>Payroll accounting и расчет зарплаты</p>
              <p>Учет по НДС, ЭСФ и сопровождение 1С</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow="Описание услуги"
            title={`Как работает ${page.title.toLowerCase()}`}
            description="Страница построена под коммерческий поисковый спрос и одновременно под конверсию в консультацию."
          />
          <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
            <Card>
              <CardContent className="space-y-6 p-8 text-sm leading-8 text-muted-foreground">
                {paragraphs(page.content).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Внутренние переходы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <Link href={localizePath("/services", locale)} className="block text-primary">
                  Все бухгалтерские услуги
                </Link>
                <Link href={localizePath("/blog", locale)} className="block text-primary">
                  Блог по бухгалтерии и налогам
                </Link>
                <Link href={localizePath("/tax-calculators", locale)} className="block text-primary">
                  Налоговые калькуляторы
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow="Преимущества"
            title="Преимущества аутсорсинга бухгалтерии"
            description="Эти блоки усиливают SEO и отвечают на практические вопросы клиента до отправки заявки."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <Card key={benefit}>
                <CardContent className="p-6 text-sm leading-7 text-muted-foreground">
                  {benefit}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow="Цены"
            title="Ориентиры по стоимости бухгалтерского сопровождения"
            description="Фактическая цена зависит от режима, количества сотрудников, НДС, payroll и объема первичных документов."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {dict.pricing.packages.map((item) => (
              <Card key={item.title}>
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
        </div>
      </section>

      <section className="section-space">
        <div className="container space-y-12">
          <SectionHeading
            eyebrow="FAQ"
            title="Частые вопросы по бухгалтерским услугам"
            description="FAQ помогает закрывать поисковые намерения и усиливает релевантность страницы для Google."
          />
          <FAQList items={faqItems} />
        </div>
      </section>

      <section id="lead-form" className="section-space">
        <div className="container">
          <LeadCaptureForm
            locale={locale}
            source="service"
            requireCompanyName
            title="Получить бесплатную консультацию"
            description="Оставьте контакты и название компании. Мы оценим ваш запрос по бухгалтерии, налогам и зарплате."
          />
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container">
          <CtaBanner
            locale={locale}
            title={`Нужна консультация по теме “${page.title}”?`}
            description="Мы поможем с бухгалтерским аутсорсингом, налоговой отчетностью, payroll, НДС, ЭСФ и настройкой 1С под ваш бизнес."
          />
        </div>
      </section>
    </>
  );
}
