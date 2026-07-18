import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

type WebhookPayload = {
  _type?: string;
  slug?: string;
};

const staticTags = [
  "home-data",
  "site-chrome",
  "events",
  "services",
  "page-about-us",
  "page-faq",
  "page-contact-us",
  "legal-privacy",
  "legal-terms",
];

function isAuthorized(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const authorization = request.headers.get("authorization");
  const supplied = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  if (!secret || !supplied) return false;

  const expectedBuffer = Buffer.from(secret);
  const suppliedBuffer = Buffer.from(supplied);

  return (
    expectedBuffer.length === suppliedBuffer.length &&
    timingSafeEqual(expectedBuffer, suppliedBuffer)
  );
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: WebhookPayload = {};

  try {
    payload = (await request.json()) as WebhookPayload;
  } catch {
    // Revalidation is deliberately safe even when the webhook has no projection.
  }

  for (const tag of staticTags) {
    revalidateTag(tag, { expire: 0 });
  }

  if (payload.slug) {
    revalidateTag(`service-${payload.slug}`, { expire: 0 });
  }

  // This small marketing site favors reliable owner updates over narrow invalidation.
  // Invalidating the root layout covers every public page and dynamic service route.
  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    documentType: payload._type ?? null,
    timestamp: new Date().toISOString(),
  });
}
