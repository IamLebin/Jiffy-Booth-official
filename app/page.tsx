import HomePageClient from "./HomePageClient";
import { getHomeData } from "@/sanity/lib/data";

export default async function Home() {
  const initialData = await getHomeData();
  return <HomePageClient initialData={initialData} />;
}
