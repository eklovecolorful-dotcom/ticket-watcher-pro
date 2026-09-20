import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign In — Flight Price Notifier" },
      { name: "description", content: "Sign in or create your Flight Price Notifier account." },
      { property: "og:title", content: "Sign In — Flight Price Notifier" },
      { property: "og:description", content: "Access your flight price alert dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthForm,
});