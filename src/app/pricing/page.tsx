import type { Metadata } from "next";
import PricingClient from "./PricingClient";
import { buildPageMetadata } from "../seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing",
  description:
    "Review transparent Luxe Designs pricing for websites, app builds, and ongoing hosting support.",
  path: "/pricing",
});

export default function PricingPage() {
  return <PricingClient />;
}
