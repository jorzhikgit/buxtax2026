import { cache } from "react";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { hasSupabaseServiceEnv } from "@/lib/supabase/config";
import type { ServicePage } from "@/types";

type ServicePageSeed = Omit<ServicePage, "id" | "createdAt" | "updatedAt">;

const now = "2026-03-07T00:00:00.000Z";

function buildContent({
  market,
  focus
}: {
  market: string;
  focus: string;
}) {
  return [
    `Бухгалтерские услуги ${market} должны закрывать не только текущее ведение учета, но и вопросы налоговой отчетности, payroll, НДС, ЭСФ и настройки процессов в 1С. Для малого бизнеса, ИП и ТОО это обычно выгоднее и быстрее решается через бухгалтерский аутсорсинг, чем через найм отдельной команды внутри компании.`,
    `${focus} обычно включает ведение первичных документов, сверку банковских операций, подготовку налоговой отчетности и контроль сроков сдачи форм. В Казахстане это особенно важно для компаний, где собственник хочет видеть понятную финансовую картину и не тратить время на ручной контроль отчетов.`,
    `В практической работе мы закрываем payroll accounting, расчет зарплаты, обязательных отчислений и налогов работодателя, а также проверяем влияние операций на НДС и корректность работы с электронными счетами-фактурами (ЭСФ). При необходимости подключаем или донастраиваем 1С, чтобы убрать хаос в документах и ускорить ежемесячное закрытие.`,
    `Такой формат полезен для компаний, которым нужен предсказуемый бухгалтерский процесс: бухгалтерский аутсорсинг, налоговая отчетность, расчет зарплаты, учет по НДС, ЭСФ и консультации по выбору режима налогообложения в одном окне.`
  ].join("\n\n");
}

const servicePageSeeds: ServicePageSeed[] = [
  {
    slug: "accounting-kazakhstan",
    title: "Бухгалтерские услуги в Казахстане",
    metaTitle: "Бухгалтерские услуги в Казахстане | Аутсорсинг бухгалтерии для ИП и ТОО",
    metaDescription:
      "Бухгалтерские услуги в Казахстане для ИП, ТОО, малого бизнеса и стартапов: бухгалтерский аутсорсинг, зарплата, НДС, ЭСФ, 1С и налоговая отчетность.",
    content: buildContent({
      market: "в Казахстане",
      focus: "Комплексное бухгалтерское сопровождение для бизнеса в Казахстане"
    }),
    published: true
  },
  {
    slug: "accounting-ip",
    title: "Бухгалтерские услуги для ИП в Казахстане",
    metaTitle: "Бухгалтерские услуги для ИП в Казахстане | Бухгалтерия и налоги для предпринимателей",
    metaDescription:
      "Бухгалтерские услуги для ИП в Казахстане: учет, налоги, упрощенный режим, payroll, НДС, ЭСФ и консультации по отчетности.",
    content: buildContent({
      market: "для ИП в Казахстане",
      focus: "Бухгалтерия для индивидуальных предпринимателей"
    }),
    published: true
  },
  {
    slug: "accounting-too",
    title: "Бухгалтерские услуги для ТОО в Казахстане",
    metaTitle: "Бухгалтерские услуги для ТОО в Казахстане | Аутсорсинг бухгалтерии для LLP",
    metaDescription:
      "Бухгалтерия для ТОО в Казахстане: аутсорсинг учета, налоговая отчетность, payroll, НДС, ЭСФ и настройка 1С для LLP.",
    content: buildContent({
      market: "для ТОО в Казахстане",
      focus: "Бухгалтерский аутсорсинг для LLP"
    }),
    published: true
  },
  {
    slug: "payroll-accounting-kazakhstan",
    title: "Расчет заработной платы и payroll accounting в Казахстане",
    metaTitle: "Payroll accounting в Казахстане | Расчет зарплаты и налоги работодателя",
    metaDescription:
      "Payroll accounting в Казахстане для ИП и ТОО: расчет зарплаты, ИПН, ОПВ, ОСМС, соцотчисления, отчетность и кадровое сопровождение.",
    content: buildContent({
      market: "в Казахстане",
      focus: "Payroll accounting и расчет заработной платы"
    }),
    published: true
  },
  {
    slug: "tax-reporting-kazakhstan",
    title: "Подготовка и сдача налоговой отчетности в Казахстане",
    metaTitle: "Налоговая отчетность в Казахстане | Подготовка и сдача отчетов для ИП и ТОО",
    metaDescription:
      "Подготовка налоговой отчетности в Казахстане для ИП и ТОО: контроль сроков, формы, сверки с КГД и бухгалтерское сопровождение.",
    content: buildContent({
      market: "в Казахстане",
      focus: "Подготовка налоговой отчетности"
    }),
    published: true
  },
  {
    slug: "vat-accounting-kazakhstan",
    title: "Бухгалтерский учет по НДС в Казахстане",
    metaTitle: "Учет по НДС в Казахстане | НДС, формы 300.00 и бухгалтерское сопровождение",
    metaDescription:
      "Учет по НДС в Казахстане: регистрация, формы 300.00, проверка операций, ЭСФ и сопровождение бизнеса по VAT.",
    content: buildContent({
      market: "в Казахстане",
      focus: "Бухгалтерское сопровождение по НДС"
    }),
    published: true
  },
  {
    slug: "electronic-invoices-esf",
    title: "Бухгалтерское сопровождение по ЭСФ и электронным счетам-фактурам",
    metaTitle: "ЭСФ и электронные счета-фактуры | Бухгалтерское сопровождение в Казахстане",
    metaDescription:
      "Сопровождение ЭСФ в Казахстане: настройка процессов, контроль электронных счетов-фактур, НДС и корректность документов.",
    content: buildContent({
      market: "в Казахстане",
      focus: "Сопровождение электронных счетов-фактур и ЭСФ"
    }),
    published: true
  },
  {
    slug: "1c-accounting-kazakhstan",
    title: "Услуги по настройке и сопровождению 1С в Казахстане",
    metaTitle: "1С бухгалтерия в Казахстане | Настройка, сопровождение и аутсорсинг учета",
    metaDescription:
      "Настройка 1С и бухгалтерское сопровождение в Казахстане: учет, документы, зарплата, НДС, ЭСФ и стандартизация процессов.",
    content: buildContent({
      market: "в Казахстане",
      focus: "Настройка 1С и бухгалтерских процессов"
    }),
    published: true
  },
  ...[
    "Алматы",
    "Астана",
    "Шымкент",
    "Караганда",
    "Актобе",
    "Костанай",
    "Павлодар",
    "Тараз"
  ].map((city) => ({
    slug: `accounting-${slugifyCity(city)}`,
    title: `Бухгалтерские услуги в ${city}`,
    metaTitle: `Бухгалтерские услуги в ${city} | Аутсорсинг бухгалтерии для бизнеса`,
    metaDescription:
      `Бухгалтерские услуги в ${city}: бухгалтерский аутсорсинг, налоговая отчетность, зарплата, НДС, ЭСФ и 1С для ИП и ТОО.`,
    content: buildContent({
      market: `в ${city}`,
      focus: `Бухгалтерские услуги для бизнеса в ${city}`
    }),
    published: true
  }))
];

function slugifyCity(city: string) {
  const map: Record<string, string> = {
    Алматы: "almaty",
    Астана: "astana",
    Шымкент: "shymkent",
    Караганда: "karaganda",
    Актобе: "aktobe",
    Костанай: "kostanay",
    Павлодар: "pavlodar",
    Тараз: "taraz"
  };

  return map[city] ?? city.toLowerCase();
}

function normalizeServicePage(row: Record<string, unknown>): ServicePage {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    content: String(row.content ?? ""),
    metaTitle: String(row.meta_title ?? row.title),
    metaDescription: String(row.meta_description ?? ""),
    published: Boolean(row.published),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at)
  };
}

function fallbackPages(): ServicePage[] {
  return servicePageSeeds.map((page) => ({
    id: page.slug,
    slug: page.slug,
    title: page.title,
    content: page.content,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    published: page.published,
    createdAt: now,
    updatedAt: now
  }));
}

async function loadServicePagesFromSupabase() {
  const fallback = fallbackPages();

  if (!hasSupabaseServiceEnv()) {
    return fallback;
  }

  try {
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("service_pages")
      .select("*")
      .order("title", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallback;
    }

    const fromDb = data.map(normalizeServicePage);
    const merged = new Map(fallback.map((page) => [page.slug, page]));

    for (const page of fromDb) {
      merged.set(page.slug, page);
    }

    return Array.from(merged.values()).sort((a, b) => a.title.localeCompare(b.title, "ru"));
  } catch {
    return fallback;
  }
}

export const getAllServicePages = cache(async () => {
  return loadServicePagesFromSupabase();
});

export const getPublishedServicePages = cache(async () => {
  const pages = await loadServicePagesFromSupabase();
  return pages.filter((page) => page.published);
});

export async function getServicePageBySlug(slug: string) {
  const pages = await loadServicePagesFromSupabase();
  return pages.find((page) => page.slug === slug && page.published) ?? null;
}

export async function getAdminServicePageBySlug(slug: string) {
  const pages = await loadServicePagesFromSupabase();
  return pages.find((page) => page.slug === slug) ?? null;
}

export function getServicePageBenefits(title: string) {
  return [
    `Снижение нагрузки на собственника за счет передачи учета, отчетности и payroll на аутсорс по теме “${title}”.`,
    "Контроль сроков налоговой отчетности и снижение риска штрафов за просрочки и ошибки.",
    "Единая операционная система по зарплате, НДС, ЭСФ и документам без необходимости держать большой внутренний штат.",
    "Поддержка по 1С и практические рекомендации по оптимизации бухгалтерских процессов."
  ];
}

export function getServicePageFaq(page: ServicePage) {
  const lower = page.title.toLowerCase();

  return [
    {
      question: "Сколько стоят бухгалтерские услуги в Казахстане?",
      answer:
        "Стоимость зависит от режима налогообложения, количества сотрудников, объема документов, наличия НДС, payroll и необходимости работы с ЭСФ или 1С. Для ИП старт обычно ниже, чем для ТОО с payroll и НДС."
    },
    {
      question: "Нужен ли бухгалтер для ТОО?",
      answer:
        "Да, ТОО обычно нужен бухгалтерский контур: ведение учета, налоговая отчетность, payroll, сверки, контроль НДС и корректная работа с документами."
    },
    {
      question: "Какие налоги платит ИП в Казахстане?",
      answer:
        "Налоговая нагрузка ИП зависит от режима. На практике предприниматели чаще сравнивают упрощенный режим и общеустановленный, а также обязательные платежи по сотрудникам, если есть payroll."
    },
    {
      question: `Что входит в услугу “${page.title}”?`,
      answer:
        lower.includes("ндс")
          ? "Обычно это контроль операций по НДС, формы 300.00, ЭСФ, первичные документы, консультации по ставкам и подготовка отчетности."
          : lower.includes("1с")
            ? "Обычно это настройка учетной базы, шаблонов документов, payroll-процессов, НДС, ЭСФ и регламентов ежемесячного закрытия."
            : "Обычно это ведение учета, налоговая отчетность, payroll, НДС при необходимости, ЭСФ, консультации и настройка процессов под бизнес клиента."
    }
  ];
}

export const servicePageSlugs = servicePageSeeds.map((page) => page.slug);
