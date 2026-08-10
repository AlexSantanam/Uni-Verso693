export type Language = 'en' | 'es';

export interface VideoPortfolioItem {
  id: string;
  youtubeId: string;
  titleEn: string;
  titleEs: string;
  categoryEn: string;
  categoryEs: string;
  descriptionEn: string;
  descriptionEs: string;
  views: string;
}

export interface TrustedClientItem {
  id: string;
  name: string;
  styleClass: string;
}

export interface LandingExampleItem {
  id: string;
  categoryEn: string;
  categoryEs: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  tagsEn: string[];
  tagsEs: string[];
}

export interface ServiceItem {
  id: string;
  iconName: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  bulletsEn: string[];
  bulletsEs: string[];
  badgeEn?: string;
  badgeEs?: string;
}

export interface PricingPlan {
  id: string;
  nameEn: string;
  nameEs: string;
  price: string;
  periodEn: string;
  periodEs: string;
  descriptionEn: string;
  descriptionEs: string;
  featuresEn: string[];
  featuresEs: string[];
  popular?: boolean;
  ctaEn: string;
  ctaEs: string;
}

export interface FaqItem {
  id: string;
  questionEn: string;
  questionEs: string;
  answerEn: string;
  answerEs: string;
}

export interface AuditFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  website: string;
  serviceInterest: string;
  budget: string;
  preferredDate: string;
  notes: string;
}
