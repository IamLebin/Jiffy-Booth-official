import { getPageContent } from "@/sanity/lib/data";
import AboutUsClient, { type AboutUsDocument } from "./AboutUsClient";

export default async function AboutPage() {
  const data = await getPageContent<AboutUsDocument>("about-us");
  return <AboutUsClient data={data} />;
}
