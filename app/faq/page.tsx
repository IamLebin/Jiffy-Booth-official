import { getPageContent } from "@/sanity/lib/data";
import FAQClient, { type FAQPageData } from "./FAQClient";

export default async function FAQPage() {
  const data = await getPageContent<FAQPageData>("faq");
  return <FAQClient initialData={data} />;
}
