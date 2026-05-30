import Image from "next/image";
import Link from "next/link";
import { eventTypes } from "./eventData";

export default function OurEventsPage() {
  return (
    <main className="min-h-screen bg-[#f3f1ee] text-jiffy-dark">
      <section className="px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-jiffy-dark/60">Event Types</p>
          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">Browse our event experiences</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm md:text-base text-jiffy-dark/75 leading-relaxed">
            Explore a curated set of event types we design for weddings, corporate activations, private parties, and more.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eventTypes.map((event) => (
            <Link key={event.slug} href={`/our-events/${event.slug}`} className="group overflow-hidden rounded-[1.8rem] border border-[#ded4c8] bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="relative aspect-[4/3]">
                <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-jiffy-dark/55">{event.category}</p>
                <h2 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">{event.title}</h2>
                <p className="mt-3 text-sm md:text-base text-jiffy-dark/75 leading-relaxed">{event.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}