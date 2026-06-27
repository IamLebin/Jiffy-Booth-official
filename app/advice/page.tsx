"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { MOCK_ARTICLES } from "../../mock-data";

export default function AdviceListingPage() {
  const featured = MOCK_ARTICLES[0];
  const remaining = MOCK_ARTICLES.slice(1);

  return (
    <main className="min-h-screen bg-white text-jiffy-dark font-inter overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#f3f1ee] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <span className="inline-flex items-center gap-2 text-[#9b5744] font-semibold tracking-widest uppercase text-xs mb-6">
            <BookOpen size={16} />
            Jiffy Booth Advice
          </span>
          <h1 className="section-title mb-6">
            Tips, Ideas &amp; Inspiration
          </h1>
          <p className="text-lg md:text-xl text-jiffy-dark/60 max-w-2xl mx-auto leading-relaxed">
            Everything you need to create unforgettable photo booth experiences
            — from planning and design to making the most of every moment.
          </p>
        </div>
        {/* Decorative gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* --- FEATURED ARTICLE --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 mb-16 relative z-10">
        <Link
          href={`/advice/${featured.slug}`}
          className="group block rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 bg-white hover:shadow-xl transition-shadow duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-stone-100">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <span className="inline-block text-[#9b5744] font-semibold tracking-widest uppercase text-[11px] mb-4">
                {featured.tag} — Featured
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.15] mb-5 group-hover:text-[#9b5744] transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                {featured.summary}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#f3f1ee] rounded-full flex items-center justify-center font-bold text-[#9b5744] text-xs">
                    JT
                  </div>
                  <div className="text-sm text-gray-400">
                    {featured.author} · {featured.date} · {featured.readTime}
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-2 text-[#9b5744] font-bold text-xs uppercase tracking-widest">
                  Read Article
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1.5 transition-transform duration-300"
                  />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* --- ARTICLES GRID --- */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="section-title mb-10">
          All Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remaining.map((article) => (
            <Link
              key={article.slug}
              href={`/advice/${article.slug}`}
              className="group flex flex-col rounded-[1.5rem] overflow-hidden border border-gray-100 bg-white hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Tag badge */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#9b5744] font-semibold tracking-widest uppercase text-[10px] px-3 py-1.5 rounded-full">
                  {article.tag}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-bold tracking-tight leading-snug mb-3 group-hover:text-[#9b5744] transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2 flex-1">
                  {article.summary}
                </p>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-[#f3f1ee] rounded-full flex items-center justify-center font-bold text-[#9b5744] text-[9px]">
                      JT
                    </div>
                    <span className="text-xs text-gray-400">
                      {article.date} · {article.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[#9b5744] font-bold text-[10px] uppercase tracking-widest">
                    Read
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

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