import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  try {
    const [settings, services] = await Promise.all([
      client.fetch(
        `*[_type == "headerFooter"][0] {
          headerSection{ "logo": logo.asset->url, navigationLinks },
          footerSection{ companyName, tagline, socialLinks, copyrightText },
          whatsappSettings{ whatsappNumber, defaultMessage, floatingMessage }
        }`,
        {},
        { cache: "no-store" }
      ),
      client.fetch(
        `*[_type == "ourServices"] | order(order asc) {
          "name": title,
          "href": "/services/" + slug.current
        }`,
        {},
        { cache: "no-store" }
      ),
    ]);

    return NextResponse.json({
      settings: settings ?? null,
      services: Array.isArray(services) ? services : [],
    });
  } catch (error) {
    console.error("Error loading site settings:", error);
    return NextResponse.json(
      { error: "Failed to load site settings", services: [] },
      { status: 500 }
    );
  }
}
