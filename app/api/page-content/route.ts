import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const pageQueries = {
  "about-us": `*[_type == "aboutUs"][0]`,
  faq: `*[_type == "faqPage"][0]`,
  "contact-us": `*[_type == "contactPage"][0]`,
} as const;

type PageKey = keyof typeof pageQueries;

const isPageKey = (page: string | null): page is PageKey =>
  page !== null && page in pageQueries;

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");

  if (!isPageKey(page)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 400 });
  }

  try {
    const data = await client.fetch(pageQueries[page], {}, { cache: "no-store" });
    return NextResponse.json(data ?? null);
  } catch (error) {
    console.error(`Error loading ${page} content:`, error);
    return NextResponse.json(
      { error: `Failed to load ${page} content` },
      { status: 500 }
    );
  }
}
