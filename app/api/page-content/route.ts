import { NextRequest, NextResponse } from "next/server";
import { getPageContent, type PageKey } from "@/sanity/lib/data";

const pageKeys: PageKey[] = ["about-us", "faq", "contact-us"];

const isPageKey = (page: string | null): page is PageKey =>
  page !== null && pageKeys.includes(page as PageKey);

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");

  if (!isPageKey(page)) {
    return NextResponse.json({ error: "Unknown page" }, { status: 400 });
  }

  try {
    const data = await getPageContent(page);
    return NextResponse.json(data ?? null);
  } catch (error) {
    console.error(`Error loading ${page} content:`, error);
    return NextResponse.json(
      { error: `Failed to load ${page} content` },
      { status: 500 }
    );
  }
}
