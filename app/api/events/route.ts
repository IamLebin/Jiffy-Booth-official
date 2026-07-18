import { NextResponse } from "next/server";
import { getEvents } from "@/sanity/lib/data";

export async function GET() {
  try {
    const events = await getEvents();

    return NextResponse.json(Array.isArray(events) ? events : []);
  } catch (error) {
    console.error("Error loading events:", error);
    return NextResponse.json({ error: "Failed to load events" }, { status: 500 });
  }
}
