import { groq } from "next-sanity";

import type { HomeData, MainPage } from "@/app/HomePageClient";
import { client } from "./client";

export type NavLink = { name: string; href: string };

export type SiteSettings = {
  headerSection?: { logo?: string; navigationLinks?: NavLink[] };
  footerSection?: {
    companyName?: string;
    tagline?: string;
    copyrightText?: string;
    socialLinks?: {
      instagram?: string;
      tiktok?: string;
      xiaohongshu?: string;
    };
  };
  whatsappSettings?: {
    whatsappNumber?: string;
    defaultMessage?: string;
    floatingMessage?: string;
  };
};

export type SiteChromeData = {
  settings: SiteSettings | null;
  services: NavLink[];
};

export type ArticleListItem = {
  slug: string;
  title: string;
  excerpt?: string;
  author?: string;
  publishedAt?: string;
  featured?: boolean;
  categories?: string[];
  image?: string;
};

export type ArticleDetail = ArticleListItem & {
  body?: Array<{_type?: string; children?: Array<{text?: string}>; style?: string}>;
};

export type PortfolioCategory = {title?: string; slug?: string};

const homeDataQuery = groq`{
  "mainPage": *[_type == "mainPage"] | order(_updatedAt desc)[0] {
    ...,
    "heroVideoUrl": heroBackgroundVideo.asset->url,
    "brands": brands[] {
      name,
      "logo": logo.asset->url
    },
    sectionVisibility,
  },
  "homeHero": *[_type == "homeHero"][0] {
    sectionTitle,
    sectionSubtitle,
    heroLogo,
    heroTitle,
    heroBio,
    heroBackgroundType,
    heroBackgroundImage,
    "heroVideoUrl": heroBackgroundVideo.asset->url
  },
  "homeTemplates": *[_type == "homeTemplates"][0] {"templatesSectionTitle": sectionTitle, "templatesSectionSubtitle": sectionSubtitle, templates},
  "homePortfolio": *[_type == "homePortfolio"][0] {"portfolioSectionTitle": sectionTitle, "portfolioSectionSubtitle": sectionSubtitle},
  "homeTrustedLogos": *[_type == "homeTrustedLogos"][0] {"trustedLogosSectionTitle": sectionTitle, "trustedLogosSectionSubtitle": sectionSubtitle, "brands": logos[] {name, "logo": logo.asset->url}},
  "homeTestimonials": *[_type == "homeTestimonials"][0] {"testimonialsSectionTitle": sectionTitle, "testimonialsSectionSubtitle": sectionSubtitle, "testimonials": items[] {name, text, rating}},
  "homeSettings": *[_type == "homeSettings"][0] {
    sectionVisibility,
  },
  "trustedLogos": *[_type == "trustedLogo" && published == true] | order(coalesce(order, 9999) asc, _createdAt asc) {
    "name": companyName,
    "logo": logo.asset->url
  },
  "homepageTestimonials": *[_type == "testimonial" && published == true] | order(coalesce(order, 9999) asc, _createdAt asc) {
    "name": customerName,
    "text": quote,
    rating
  },
  "portfolioCategories": *[_type == "portfolioPage"][0].categories[]-> | order(coalesce(order, 9999) asc) {
    title,
    "slug": slug.current
  },
  "services": *[_type == "ourServices"] | order(order asc) {
    title,
    description,
    "slug": slug.current,
    "image": image.asset->url
  },
  "events": *[_type == "ourEvents" && _id in coalesce(*[_type == "homePortfolio"][0].photos[]._ref, *[_type == "mainPage"][0].homePortfolio[]._ref)] | order(coalesce(order, 9999) asc, _createdAt asc) {
    title,
    "category": coalesce(category->title, category),
    description,
    "slug": slug.current,
    "image": image.asset->url
  }
}`;

const siteChromeQuery = groq`{
  "settings": {
    ...(*[_type == "headerFooter"][0] {
    headerSection{ "logo": logo.asset->url, navigationLinks },
    footerSection{ companyName, tagline, socialLinks, copyrightText },
    whatsappSettings{ whatsappNumber, defaultMessage, floatingMessage }
    }),
    ...(*[_type == "headerNavigation"][0] {headerSection{ "logo": logo.asset->url, navigationLinks }}),
    ...(*[_type == "footerSocial"][0] {footerSection{companyName, tagline, socialLinks, footerLinks, copyrightText, "logo": logo.asset->url}}),
    ...(*[_type == "whatsappSettings"][0] {whatsappSettings{whatsappNumber, defaultMessage, floatingMessage}})
  },
  "services": *[_type == "ourServices"] | order(order asc) {
    "name": title,
    "href": "/services/" + slug.current
  }
}`;

const eventsQuery = groq`*[_type == "ourEvents"] | order(coalesce(order, 9999) asc, _createdAt asc) {
  title,
  "category": coalesce(category->title, category),
  description,
  "slug": slug.current,
  "image": image.asset->url
}`;

const articlesQuery = groq`*[_type == "article" && published == true] | order(coalesce(featured, false) desc, coalesce(publishedAt, _createdAt) desc) {
  "slug": slug.current,
  title,
  excerpt,
  author,
  publishedAt,
  featured,
  "categories": categories[]->title,
  "image": featuredImage.asset->url
}`;

const articleDetailQuery = groq`*[_type == "article" && published == true && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  excerpt,
  author,
  publishedAt,
  featured,
  "categories": categories[]->title,
  "image": featuredImage.asset->url,
  body[] { _type, style, children[] { text } }
}`;

const pageQueries = {
  "about-us": groq`{
    "legacy": *[_type == "aboutUs"][0],
    "intro": *[_type == "aboutIntro"][0],
    "media": *[_type == "aboutMedia"][0],
    "team": *[_type == "aboutTeam"][0],
    "seo": *[_type == "aboutSeo"][0].seo
  }`,
  faq: groq`{
    "legacy": *[_type == "faqPage"][0],
    "intro": *[_type == "faqIntro"][0],
    "seo": *[_type == "faqSeo"][0].seo,
    "questions": *[_type == "faqItem"] | order(coalesce(order, 9999) asc),
    "categories": *[_type == "faqCategory"] | order(coalesce(order, 9999) asc)
  }`,
  "contact-us": groq`{
    "legacy": *[_type == "contactPage"][0],
    "intro": *[_type == "contactIntro"][0],
    "details": *[_type == "contactDetails"][0],
    "booking": *[_type == "contactBooking"][0],
    "content": *[_type == "contactContent"][0],
    "seo": *[_type == "contactSeo"][0].seo
  }`,
} as const;

export type PageKey = keyof typeof pageQueries;

const cachedOptions = (tag: string, revalidate = 3600) => ({
  next: { revalidate, tags: [tag] },
});

export async function getHomeData(): Promise<HomeData> {
  const data = await client.fetch<HomeData & {
    homeHero?: Partial<MainPage>;
    homeTemplates?: Partial<MainPage>;
    homePortfolio?: Partial<MainPage>;
    homeTrustedLogos?: Partial<MainPage>;
    homeTestimonials?: Partial<MainPage>;
    homeSettings?: Pick<MainPage, 'sectionVisibility'>;
  }>(homeDataQuery, {}, cachedOptions("home-data", 0));

  const legacyMainPage = data?.mainPage || {};
  const homeTemplates = data?.homeTemplates
    ? {...data.homeTemplates, ...(data.homeTemplates.templates?.length ? {} : {templates: legacyMainPage.templates})}
    : {};
  const {brands: homeBrands, ...homeTrustedMetadata} = data?.homeTrustedLogos || {};
  const homeTrustedLogos = {...homeTrustedMetadata, ...(homeBrands?.length ? {brands: homeBrands} : {})};
  const {testimonials: homeTestimonialItems, ...homeTestimonialMetadata} = data?.homeTestimonials || {};
  const homeTestimonials = {...homeTestimonialMetadata, ...(homeTestimonialItems?.length ? {testimonials: homeTestimonialItems} : {})};

  return {
    ...data,
    mainPage: {
      ...legacyMainPage,
      ...(data?.homeHero || {}),
      ...homeTemplates,
      ...(data?.homePortfolio || {}),
      ...homeTrustedLogos,
      ...homeTestimonials,
      ...(data?.homeSettings || {}),
    },
  };
}

export async function getSiteChromeData(): Promise<SiteChromeData> {
  const data = await client.fetch<SiteChromeData>(
    siteChromeQuery,
    {},
    cachedOptions("site-chrome"),
  );

  return {
    settings: data?.settings ?? null,
    services: Array.isArray(data?.services) ? data.services : [],
  };
}

export async function getEvents<T>(): Promise<T[]> {
  const events = await client.fetch<T[]>(eventsQuery, {}, cachedOptions("events"));
  return Array.isArray(events) ? events : [];
}

export async function getArticles(): Promise<ArticleListItem[]> {
  const articles = await client.fetch<ArticleListItem[]>(articlesQuery, {}, cachedOptions("articles"));
  return Array.isArray(articles) ? articles.filter((article) => article.slug && article.title) : [];
}

export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  return (await client.fetch<ArticleDetail | null>(articleDetailQuery, {slug}, cachedOptions(`article-${slug}`))) ?? null;
}

export async function getPageContent<T>(page: PageKey): Promise<T | null> {
  const data = await client.fetch<{legacy?: T; intro?: T; media?: T; team?: T; details?: T; booking?: T; content?: T; questions?: T; categories?: T; seo?: T}>(pageQueries[page], {}, cachedOptions(`page-${page}`, 0));
  if (!data) return null;
  return {
    ...(data.legacy || {}),
    ...(data.intro || {}),
    ...(data.media || {}),
    ...(data.team || {}),
    ...(data.details || {}),
    ...(data.booking || {}),
    ...(data.content || {}),
    ...(data.questions ? {faqs: data.questions} : {}),
    ...(data.categories ? {categories: data.categories} : {}),
    ...(data.seo ? {seo: data.seo} : {}),
  } as T;
}
