import { groq } from "next-sanity";

import type { HomeData } from "@/app/HomePageClient";
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

const homeDataQuery = groq`{
  "mainPage": *[_type == "mainPage"] | order(_updatedAt desc)[0] {
    ...,
    "heroVideoUrl": heroBackgroundVideo.asset->url,
    "brands": brands[] {
      name,
      "logo": logo.asset->url
    }
  },
  "services": *[_type == "ourServices"] | order(order asc) {
    title,
    description,
    "slug": slug.current,
    "image": image.asset->url
  },
  "events": *[_type == "ourEvents"] | order(_createdAt asc) {
    title,
    category,
    description,
    "slug": slug.current,
    "image": image.asset->url
  }
}`;

const siteChromeQuery = groq`{
  "settings": *[_type == "headerFooter"][0] {
    headerSection{ "logo": logo.asset->url, navigationLinks },
    footerSection{ companyName, tagline, socialLinks, copyrightText },
    whatsappSettings{ whatsappNumber, defaultMessage, floatingMessage }
  },
  "services": *[_type == "ourServices"] | order(order asc) {
    "name": title,
    "href": "/services/" + slug.current
  }
}`;

const eventsQuery = groq`*[_type == "ourEvents"] | order(coalesce(order, 9999) asc, _createdAt asc) {
  title,
  category,
  description,
  "slug": slug.current,
  "image": image.asset->url
}`;

const pageQueries = {
  "about-us": groq`*[_type == "aboutUs"][0]`,
  faq: groq`*[_type == "faqPage"][0]`,
  "contact-us": groq`*[_type == "contactPage"][0]`,
} as const;

export type PageKey = keyof typeof pageQueries;

const cachedOptions = (tag: string) => ({
  next: { revalidate: 3600, tags: [tag] },
});

export async function getHomeData(): Promise<HomeData> {
  return (await client.fetch(homeDataQuery, {}, cachedOptions("home-data"))) ?? {};
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

export async function getPageContent<T>(page: PageKey): Promise<T | null> {
  return (await client.fetch<T>(pageQueries[page], {}, cachedOptions(`page-${page}`))) ?? null;
}
