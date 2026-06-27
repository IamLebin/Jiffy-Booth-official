"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Maximize2, X } from "lucide-react";

type EventListItem = {
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string;
};

function PortfolioPageContent() {
  const [eventSearch, setEventSearch] = useState("");
  const [events, setEvents] = useState<EventListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events", { cache: "no-store" });
        const data = await response.json();

        if (Array.isArray(data)) {
          setEvents(data.filter((item: EventListItem) => item?.slug));
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(
    () =>
      events.filter(
        (item) =>
          (item.title || "").toLowerCase().includes(eventSearch.toLowerCase()) ||
          (item.category || "").toLowerCase().includes(eventSearch.toLowerCase()) ||
          (item.description || "").toLowerCase().includes(eventSearch.toLowerCase())
      ),
    [events, eventSearch]
  );

  if (loading) {
    return <main className="min-h-screen bg-white text-slate-900 font-inter" />;
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 font-inter">
      <section className="py-16 md:py-20 px-6 bg-[#f4f4f4] border-t border-[#e8e3da]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
            <h1 className="section-title mb-4">Portfolio</h1>
            <p className="text-jiffy-dark/75 text-sm md:text-base leading-relaxed">
              Explore our past setups and photo outputs. From 4R prints to classic strips, discover how our booths create lasting memories.
            </p>

            <div className="mt-8 max-w-md mx-auto relative">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-jiffy-dark/45">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
              <input
                suppressHydrationWarning
                type="text"
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                placeholder="Search portfolio (e.g. wedding, strip)..."
                className="w-full rounded-full border border-transparent bg-[#e7e7e7] py-3 pl-11 pr-5 text-sm text-jiffy-dark outline-none transition-colors focus:border-[#c9c3bb] focus:bg-white"
              />
            </div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {filteredEvents.map((item, index) => {
              const heightClasses = [
                "h-[300px] md:h-[400px]",
                "h-[400px] md:h-[550px]",
                "h-[250px] md:h-[350px]",
                "h-[450px] md:h-[600px]",
                "h-[350px] md:h-[450px]"
              ];
              const cardHeight = heightClasses[index % heightClasses.length];

              return (
                <div
                  key={`${item.slug}-${index}`}
                  className={`group relative block w-full ${cardHeight} break-inside-avoid overflow-hidden rounded-[1.7rem] shadow-sm hover:shadow-2xl transition-all duration-500 mb-6 bg-stone-100`}
                >
                  <div className="absolute inset-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title || ''}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center px-6 text-center bg-gradient-to-br from-[#ece6de] to-[#dcd3c7]">
                        <p className="font-serif italic text-sm text-jiffy-dark">No Image</p>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 p-4 md:p-5 bg-gradient-to-t from-black/60 via-black/15 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                    <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 flex items-end justify-between gap-4">
                      <p className="text-white font-bold tracking-[0.2em] uppercase text-base drop-shadow-lg text-left">
                        {item.category || "Portfolio"}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEnlargedImage(item.image || null);
                        }}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white border border-white/30 flex-shrink-0 transition-transform duration-300 hover:scale-110"
                        aria-label={`Enlarge ${item.title || "portfolio image"}`}
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="mt-10 rounded-2xl border border-[#ddd5c9] bg-white p-8 text-center text-jiffy-dark/70">
              No portfolio items found matching your search.
            </div>
          )}
        </div>
      </section>

      {enlargedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-jiffy-dark/90 backdrop-blur-sm p-4 md:p-8" onClick={() => setEnlargedImage(null)}>
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 transition-colors"
            onClick={() => setEnlargedImage(null)}
            aria-label="Close modal"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-5xl max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={enlargedImage}
              alt="Enlarged portfolio view"
              width={1600}
              height={1600}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}

      <section className="py-24 text-center bg-white border-t border-gray-100 px-6">
        <h2 className="text-jiffy-dark font-inter font-bold tracking-tight text-3xl md:text-5xl mb-8">
          Not seeing your event type?
        </h2>
        <p className="text-gray-500 mb-10 max-w-xl mx-auto">
          We love getting creative! Reach out to us and we can custom-build a photo booth experience specifically for your unique theme.
        </p>
        <Link
          href="/contact-us"
          className="inline-block bg-[#9b5744] text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          Let&apos;s Talk
        </Link>
      </section>
    </main>
  );
}

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
