"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Link2,
  MessageCircle,
  ArrowLeft,
  Check,
  ArrowRight,
} from "lucide-react";
import { MOCK_ARTICLES } from "../../../mock-data";

export default function AdviceArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [copied, setCopied] = useState(false);

  const article = MOCK_ARTICLES?.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="min-h-screen bg-white text-jiffy-dark font-inter overflow-x-hidden">
        <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          <Link
            href="/advice"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-jiffy-dark/60 hover:text-jiffy-dark mb-10 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Articles
          </Link>
          <h1 className="text-3xl md:text-[2.75rem] leading-[1.15] font-bold mt-4 mb-8 tracking-tight">
            Article Not Found
          </h1>
          <p>Sorry, the article you were looking for could not be found.</p>
        </article>
      </main>
    );
  }

  // Grab 2 other articles for the "Related Articles" section
  const relatedArticles = MOCK_ARTICLES.filter(
    (a) => a.slug !== article.slug
  ).slice(0, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `Check out this helpful article: ${article.title}`
    );
    window.open(
      `https://api.whatsapp.com/send?text=${text}%20${url}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-white text-jiffy-dark font-inter overflow-x-hidden">
      {/* --- ARTICLE HEADER & CONTENT --- */}
      <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link
          href="/advice"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-jiffy-dark/60 hover:text-jiffy-dark mb-10 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Articles
        </Link>

        <div className="mb-10">
          <span className="text-[#9b5744] font-semibold tracking-widest uppercase text-sm">
            {article.tag}
          </span>
          <h1 className="text-3xl md:text-[2.75rem] leading-[1.15] font-bold mt-4 mb-8 tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 border-y border-gray-100 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f3f1ee] rounded-full flex items-center justify-center font-bold text-[#9b5744]">
                JT
              </div>
              <div>
                <p className="font-semibold text-jiffy-dark">
                  {article.author}
                </p>
                <p className="text-sm text-gray-500">
                  {article.date} • {article.readTime}
                </p>
              </div>
            </div>

            {/* Sharing Icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="w-10 h-10 rounded-full bg-[#f3f1ee] flex items-center justify-center hover:bg-[#e8dfd2] transition-colors text-jiffy-dark"
                aria-label="Copy Link"
                title="Copy Link"
              >
                {copied ? (
                  <Check size={18} className="text-green-600" />
                ) : (
                  <Link2 size={18} />
                )}
              </button>
              <button
                onClick={handleWhatsAppShare}
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#1ebe57] transition-colors text-white"
                aria-label="Share on WhatsApp"
                title="Share on WhatsApp"
              >
                <MessageCircle
                  size={18}
                  fill="currentColor"
                  className="text-[#25D366]"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden mb-12 shadow-sm border border-gray-100 bg-stone-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-jiffy-dark prose-a:text-[#9b5744] prose-p:leading-relaxed">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* --- RELATED ARTICLES --- */}
      {relatedArticles.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-12 md:py-16 border-t border-gray-100">
          <h3 className="text-2xl font-bold mb-8 text-jiffy-dark tracking-tight">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedArticles.map((relArticle) => (
              <Link
                key={relArticle.slug}
                href={`/advice/${relArticle.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.5rem] shadow-sm mb-4 border border-gray-100 bg-stone-100">
                  <Image
                    src={relArticle.image}
                    alt={relArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#9b5744] font-semibold tracking-widest uppercase text-[10px]">
                    {relArticle.tag}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-jiffy-dark mb-2 group-hover:text-[#9b5744] transition-colors leading-tight">
                  {relArticle.title}
                </h4>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {relArticle.summary}
                </p>
                <div className="mt-auto flex items-center gap-2 text-[#9b5744] font-bold text-[10px] uppercase tracking-widest">
                  Read{" "}
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* --- CTA SECTION --- */}
      <section className="py-20 md:py-24 text-center px-6 bg-[#f3f1ee] border-t border-[#e8e3da]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-jiffy-dark tracking-tight">
            Ready to Capture the Moment?
          </h2>
          <p className="text-jiffy-dark/70 mb-10 text-lg">
            Let&apos;s craft the perfect photo booth experience for your
            upcoming event.
          </p>
          <Link href="/contact-us">
            <button className="inline-block bg-[#9b5744] text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm">
              Enquire Now
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
