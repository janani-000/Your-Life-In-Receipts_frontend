import { createFileRoute } from "@tanstack/react-router";
import { LifeDashboard } from "@/components/life-dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Life, In Receipts — Personal Data Intelligence" },
      { name: "description", content: "Discover the hidden connections between your music, spending, and daily life." },
      { property: "og:title", content: "Your Life, In Receipts" },
      { property: "og:description", content: "Thousands of digital moments. One story waiting to be discovered." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LifeDashboard />;
}
