import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { Link, useNavigate, useRouteLoaderData } from "react-router";
import { BellRing, LogOut, Plane, Radar } from "lucide-react";

import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta } from "@/lib/page-meta";
import { AUTHENTICATED_ROUTE_ID } from "@/lib/route-ids";

export function AppPage() {
  const { user } = useRouteLoaderData(AUTHENTICATED_ROUTE_ID) as { user: User };
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  usePageMeta({
    title: "Dashboard — Flight Price Notifier",
    description: "Your private Flight Price Notifier dashboard.",
    ogDescription: "Manage your flight price alerts.",
  });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate("/sign-in", { replace: true });
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/60 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/"><BrandMark /></Link>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut aria-hidden="true" /> Sign Out
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <Radar className="size-3.5" aria-hidden="true" /> Dashboard preview
          </div>
          <h1 className="mt-6 break-words text-3xl font-semibold text-foreground sm:text-5xl">Hi {user.email}</h1>
          <p className="mt-4 text-base text-muted-foreground">歡迎回來。你的低價旅行計畫，從這裡開始。</p>
        </div>

        <section className="relative mt-12 overflow-hidden rounded-lg border border-border bg-card p-7 sm:p-12">
          <div className="absolute right-8 top-8 hidden text-primary/15 sm:block" aria-hidden="true"><Plane className="size-28 -rotate-12" /></div>
          <div className="relative max-w-2xl">
            <span className="grid size-12 place-items-center rounded-md bg-primary/15 text-primary"><BellRing aria-hidden="true" /></span>
            <h2 className="mt-7 text-2xl font-semibold leading-tight text-foreground sm:text-3xl">你的航線追蹤儀表板即將上線</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">下一個里程碑會加上訂閱航線的功能。</p>
            <p className="mt-6 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">Your dashboard is coming soon. Route-subscription will be added in the next milestone.</p>
          </div>
        </section>
      </div>
    </main>
  );
}