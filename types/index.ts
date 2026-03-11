export type LeadSource = "landing" | "calculator" | "blog" | "service";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  business_type: string;
  message: string | null;
  source: LeadSource;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface AdminDashboardStats {
  totalLeads: number;
  calculatorLeads: number;
  leadsThisWeek: number;
  totalBlogArticles: number;
}

export interface ServicePage {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
