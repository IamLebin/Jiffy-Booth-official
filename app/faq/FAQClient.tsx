'use client';

import { useState } from "react";

export interface FaqItem { question: string; answer: string }
export type FAQPageData = { faqs?: FaqItem[]; title?: string; subtitle?: string };

export default function FAQClient({ initialData }: { initialData: FAQPageData | null }) {
  const data = initialData;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const fallbackFaqs: FaqItem[] = [
    {
      question: "How do I book Jiffy Booth?",
      answer: "Send us your event date, venue, and preferred booth package. Our team will confirm availability and guide you through the booking details.",
    },
    {
      question: "Can the booth be customised for my event?",
      answer: "Yes. We can customise the photo layout, branding, backdrop, props, and other visual details depending on your selected package.",
    },
    {
      question: "Do you provide attendants during the event?",
      answer: "Yes. Our events are supported by onsite attendants who help with setup, guest guidance, and smooth booth operation.",
    },
  ];

  const faqs = data?.faqs && data.faqs.length > 0 ? data.faqs : fallbackFaqs;

  return (
    <main className="min-h-screen flex flex-col bg-[#f3f1ee] text-[#212121] overflow-x-hidden">
      <section className="max-w-7xl w-full mx-auto px-6 md:px-10 lg:px-12 pt-20 md:pt-24 pb-4 md:pb-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="section-title mb-4">
            {data?.title || "FAQ"}
          </h1>
        </div>
      </section>

      <section className="max-w-7xl w-full mx-auto px-6 md:px-10 lg:px-12 pb-16 md:pb-20">
        <p className="text-center text-sm md:text-base text-[#6f685a] max-w-3xl mx-auto mb-10 md:mb-12">
          {data?.subtitle || "Everything you need to know about booking Jiffy Booth."}
        </p>

        <div className="max-w-6xl mx-auto text-left">
          <h2 className="mb-6 md:mb-8 text-[#212121] text-left font-inter font-bold tracking-tight text-2xl md:text-4xl w-full">
            General
          </h2>

          <div className="border-t border-b border-[#e3dbd0] bg-transparent">
            {faqs.map((faq: FaqItem, faqIndex: number) => {
              const isOpen = openIndex === faqIndex;

              return (
                <div
                  key={`${faq.question}-${faqIndex}`}
                  className={faqIndex !== faqs.length - 1 ? 'border-b border-[#e3dbd0]' : ''}
                >
                  <button
                    type="button"
                    className="w-full text-left py-5 md:py-6 flex items-start justify-between gap-6"
                    onClick={() => setOpenIndex(isOpen ? null : faqIndex)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg md:text-2xl font-semibold tracking-tight leading-snug pr-2">
                      {faq.question}
                    </span>
                    <span className="text-2xl md:text-3xl leading-none text-[#212121] flex-shrink-0 mt-0.5">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="min-h-0">
                      <div className="pb-5 md:pb-7 pr-2">
                        <p className="text-[#3d3a35] text-sm md:text-lg leading-relaxed whitespace-pre-line max-w-5xl">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      <section className="mt-auto py-16 md:py-20 text-center px-6 border-t border-[#e3dbd0] bg-[#f3f1ee]">
        <h2 className="section-title mb-10 text-[#212121]">
          Still Have Questions?
        </h2>
        <a
          href={`https://wa.me/60172082266?text=${encodeURIComponent("Hi JiffyBooth, I would like to enquire about....")}`}
          className="inline-block text-white px-14 md:px-16 py-5 md:py-6 rounded-full font-bold uppercase tracking-[0.12em] shadow-xl hover:brightness-95 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          style={{ backgroundColor: '#9b5744' }}
        >
          WhatsApp Us
        </a>
      </section>
    </main>
  );
}
