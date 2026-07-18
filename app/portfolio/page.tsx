import { getEvents } from "@/sanity/lib/data";
import PortfolioClient, { type EventListItem } from "./PortfolioClient";

export default async function PortfolioPage() {
  const events = await getEvents<EventListItem>();
  return <PortfolioClient initialEvents={events} />;
}
