'use client';

import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: "g8867hcl", 
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface CarouselItem {
  image: SanityImageSource;
  title?: string;
  description?: string;
}

interface CarouselSectionProps {
  section: {
    title?: string;
    backgroundColor?: string;
    customBackgroundColor?: string;
    items: CarouselItem[];
    autoplay?: boolean;
    autoplaySpeed?: number;
  };
}

export default function CarouselSection({ section }: CarouselSectionProps) {
  // Determine background color
  const getBgColor = () => {
    if (section.backgroundColor === 'custom' && section.customBackgroundColor) {
      return section.customBackgroundColor;
    }
    return section.backgroundColor || '#F9FAFB';
  };

  if (!section.items || section.items.length === 0) return null;

  return (
    <section 
      className="w-full py-12 scroll-mt-24" 
      style={{ backgroundColor: getBgColor() }}
    >
      {/* Section Title */}
      {section.title && (
        <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-center">
          <h2 className="text-jiffy-dark font-bold text-center text-3xl md:text-[clamp(32px,4vw,48px)]">
            {section.title}
          </h2>
        </div>
      )}

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {section.items.map((item: CarouselItem, index: number) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* Image */}
              <div className="w-full aspect-[4/3] relative rounded-[2rem] overflow-hidden mb-6 shadow-sm border border-gray-100">
                {item.image ? (
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.title || `Add-on ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-[#f5ebe1] flex items-center justify-center">
                    <span className="text-jiffy-dark/40 text-sm font-medium tracking-wider uppercase">No Image</span>
                  </div>
                )}
              </div>
              
              {/* Text Content */}
              <div className="w-full px-2">
                {item.title && (
                  <h3 className="text-jiffy-dark font-bold text-xl md:text-2xl mb-3">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}