import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceSeoPage } from "@/components/pages/service-seo-page";
import { getServicePageBySlug, getPublishedServicePages } from "@/lib/service-pages";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await getPublishedServicePages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getServicePageBySlug(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/services/${page.slug}`,
      languages: {
        ru: `${siteConfig.url}/services/${page.slug}`,
        kk: `${siteConfig.url}/kk/services/${page.slug}`
      }
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${siteConfig.url}/services/${page.slug}`,
      type: "article"
    }
  };
}

export default async function ServiceSeoDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const page = await getServicePageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return <ServiceSeoPage page={page} locale="ru" />;
}
