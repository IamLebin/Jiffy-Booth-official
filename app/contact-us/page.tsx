import { getPageContent } from "@/sanity/lib/data";
import ContactPageClient, { type ContactPageData } from "./ContactPageClient";

export default async function ContactPage() {
  const data = await getPageContent<ContactPageData>("contact-us");
  return <ContactPageClient data={data} />;
}
