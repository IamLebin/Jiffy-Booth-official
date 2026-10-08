import {NextResponse} from "next/server";
import {getArticleBySlug} from "@/sanity/lib/data";

export async function GET(_request: Request, context: {params: Promise<{slug: string}>}) {
  const {slug} = await context.params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return NextResponse.json({error: "Article not found"}, {status: 404});
  }

  return NextResponse.json(article);
}