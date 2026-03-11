import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import {
  BlogPageContent,
  BlogPostContent,
  CalculatorLandingPageContent,
  ContactsPageContent,
  FAQPageContent,
  HomePageContent,
  IpTaxCalculatorPageContent,
  PayrollTaxCalculatorPageContent,
  PricingPageContent,
  PrivacyPageContent,
  SalaryCalculatorPageContent,
  ServicesPageContent,
  TaxCalculatorsPageContent,
  VatCalculatorPageContent
} from "@/components/pages/public-pages";
import { ServiceSeoPage } from "@/components/pages/service-seo-page";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog";
import { getLocalizedMetadata, kkStaticSlugs } from "@/lib/i18n";
import { getPublishedServicePages, getServicePageBySlug } from "@/lib/service-pages";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

type KkPageProps = {
  params: { slug?: string[] };
  searchParams?: { page?: string };
};

function resolveSlug(params: { slug?: string[] }) {
  return params.slug ?? [];
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  const servicePages = await getPublishedServicePages();
  return [
    ...kkStaticSlugs.map((slug) => ({ slug })),
    ...posts.map((post) => ({ slug: ["blog", post.slug] })),
    ...servicePages.map((page) => ({ slug: ["services", page.slug] }))
  ];
}

export async function generateMetadata({ params }: KkPageProps): Promise<Metadata> {
  const slug = resolveSlug(params);

  if (slug.length === 0) return getLocalizedMetadata("kk", "home", "/");
  if (slug[0] === "services" && slug[1]) {
    const page = await getServicePageBySlug(slug[1]);
    if (!page) return {};

    return {
      title: page.metaTitle,
      description: page.metaDescription,
      alternates: {
        canonical: `/kk/services/${page.slug}`,
        languages: {
          ru: `${siteConfig.url}/services/${page.slug}`,
          kk: `${siteConfig.url}/kk/services/${page.slug}`
        }
      },
      openGraph: {
        title: page.metaTitle,
        description: page.metaDescription,
        url: `${siteConfig.url}/kk/services/${page.slug}`
      }
    };
  }
  if (slug[0] === "services") return getLocalizedMetadata("kk", "services", "/services");
  if (slug[0] === "pricing") return getLocalizedMetadata("kk", "pricing", "/pricing");
  if (slug[0] === "calculator") return getLocalizedMetadata("kk", "calculator", "/calculator");
  if (slug[0] === "tax-calculators") {
    return getLocalizedMetadata("kk", "taxCalculators", "/tax-calculators");
  }
  if (slug[0] === "faq") return getLocalizedMetadata("kk", "faq", "/faq");
  if (slug[0] === "contacts") return getLocalizedMetadata("kk", "contacts", "/contacts");
  if (slug[0] === "privacy") return getLocalizedMetadata("kk", "privacy", "/privacy");
  if (slug[0] === "calculators" && slug[1] === "salary") {
    return getLocalizedMetadata("kk", "salaryCalculator", "/calculators/salary");
  }
  if (slug[0] === "calculators" && slug[1] === "ip-tax") {
    return getLocalizedMetadata("kk", "ipTaxCalculator", "/calculators/ip-tax");
  }
  if (slug[0] === "calculators" && slug[1] === "vat") {
    return getLocalizedMetadata("kk", "vatCalculator", "/calculators/vat");
  }
  if (slug[0] === "calculators" && slug[1] === "payroll-tax") {
    return getLocalizedMetadata("kk", "payrollTaxCalculator", "/calculators/payroll-tax");
  }
  if (slug[0] === "blog" && !slug[1]) return getLocalizedMetadata("kk", "blog", "/blog");

  if (slug[0] === "blog" && slug[1]) {
    const post = await getPostBySlug(slug[1]);
    if (!post) return {};

    const base = getLocalizedMetadata("kk", "blog", `/blog/${post.slug}`);
    return {
      ...base,
      title: post.title,
      description: post.excerpt,
      openGraph: {
        ...base.openGraph,
        title: post.title,
        description: post.excerpt,
        url: `${siteConfig.url}/kk/blog/${post.slug}`,
        type: "article",
        publishedTime: post.createdAt,
        images: post.coverImage ? [{ url: post.coverImage }] : []
      }
    };
  }

  return {};
}

export default async function KkCatchAllPage({ params, searchParams }: KkPageProps) {
  const slug = resolveSlug(params);

  if (slug.length === 0) return <HomePageContent locale="kk" />;
  if (slug.length === 1 && slug[0] === "services") return <ServicesPageContent locale="kk" />;
  if (slug[0] === "services" && slug[1]) {
    const page = await getServicePageBySlug(slug[1]);
    if (!page) notFound();
    return <ServiceSeoPage page={page} locale="kk" />;
  }
  if (slug.length === 1 && slug[0] === "pricing") return <PricingPageContent locale="kk" />;
  if (slug.length === 1 && slug[0] === "calculator") {
    return <CalculatorLandingPageContent locale="kk" />;
  }
  if (slug.length === 1 && slug[0] === "tax-calculators") {
    return <TaxCalculatorsPageContent locale="kk" />;
  }
  if (slug.length === 1 && slug[0] === "faq") return <FAQPageContent locale="kk" />;
  if (slug.length === 1 && slug[0] === "contacts") return <ContactsPageContent locale="kk" />;
  if (slug.length === 1 && slug[0] === "privacy") return <PrivacyPageContent locale="kk" />;
  if (slug.length === 1 && slug[0] === "calculators") {
    redirect("/kk/tax-calculators");
  }
  if (slug[0] === "calculators" && slug[1] === "salary") {
    return <SalaryCalculatorPageContent locale="kk" />;
  }
  if (slug[0] === "calculators" && slug[1] === "ip-tax") {
    return <IpTaxCalculatorPageContent locale="kk" />;
  }
  if (slug[0] === "calculators" && slug[1] === "vat") {
    return <VatCalculatorPageContent locale="kk" />;
  }
  if (slug[0] === "calculators" && slug[1] === "payroll-tax") {
    return <PayrollTaxCalculatorPageContent locale="kk" />;
  }
  if (slug.length === 1 && slug[0] === "blog") {
    const page = Number(searchParams?.page ?? "1");
    return <BlogPageContent locale="kk" page={page} />;
  }
  if (slug[0] === "blog" && slug[1]) {
    const post = await getPostBySlug(slug[1]);
    if (!post) notFound();
    return <BlogPostContent locale="kk" post={post} />;
  }

  notFound();
}
