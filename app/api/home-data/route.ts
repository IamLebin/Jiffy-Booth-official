import { NextResponse } from "next/server";
import { getHomeData } from "@/sanity/lib/data";

export async function GET() {
  try {
    const data = await getHomeData();

    return NextResponse.json(data ?? {});
  } catch (error) {
    console.error("Error loading home data:", error);
    return NextResponse.json({ error: "Failed to load home data" }, { status: 500 });
  }
}
