import { NextResponse } from "next/server";
import { getSiteChromeData } from "@/sanity/lib/data";

export async function GET() {
  try {
    const { settings, services } = await getSiteChromeData();

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
