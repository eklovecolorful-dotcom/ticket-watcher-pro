import { Link } from "react-router";
import { ArrowRight, BellRing, Eye, Plane, XCircle } from "lucide-react";

import heroImage from "@/assets/taipei-night-flight.jpg";
import { LandingHeader } from "@/components/LandingHeader";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/lib/page-meta";


const features = [
  { icon: Eye, title: "盯緊熱門航線", en: "Always-on route watching", body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。", number: "01" },
  { icon: BellRing, title: "達標自動通知", en: "Target-price email alerts", body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。", number: "02" },
  { icon: XCircle, title: "隨時取消", en: "Cancel anytime", body: "月訂閱制，不想用隨時停，沒有綁約。", number: "03" },
];

export function IndexPage() {
  usePageMeta({
    title: "Flight Price Notifier — 機票降價通知",
    description: "設定航線與目標價，機票降價就通知你。從台北出發，低於預算就收到 email。",
    ogDescription: "Set a route and a target price — we email you when the fare drops.",
  });

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <section className="relative flex min-h-[88vh] items-end overflow-hidden pt-24">
        <img src={heroImage} width={1600} height={1000} alt="Night flight approaching Taipei" className="absolute inset-0 size-full object-cover object-center" />
        <div className="hero-shade absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
              <Plane className="size-3.5 -rotate-12" aria-hidden="true" /> Taipei to everywhere
            </div>
            <h1 className="text-5xl font-semibold leading-[1.05] text-foreground sm:text-7xl lg:text-8xl">Flight Price<br /><span className="text-primary">Notifier</span></h1>
            <p className="mt-7 max-w-2xl text-xl font-medium leading-relaxed text-foreground sm:text-2xl">設定航線與目標價，機票降價就通知你</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">Set a route and a target price — we email you when the fare drops.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg"><Link to="/sign-in">Start watching fares <ArrowRight aria-hidden="true" /></Link></Button>
              <span className="text-xs text-muted-foreground">Tokyo · Seoul · More routes soon</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Built for flexible travelers</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-foreground sm:text-5xl">不追日期，只追你的預算。</h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">把反覆搜尋票價的時間省下來。你只要決定目的地與可接受的價格，剩下的交給我們。</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.number} className="group relative min-h-72 overflow-hidden rounded-lg border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-8">
                  <span className="absolute right-5 top-4 font-mono text-xs text-muted-foreground">{feature.number}</span>
                  <span className="grid size-11 place-items-center rounded-md bg-primary/15 text-primary"><Icon aria-hidden="true" /></span>
                  <h3 className="mt-8 text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-primary">{feature.en}</p>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">{feature.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-background py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Flight Price Notifier</p>
          <p>Made for travelers who wait for the right price.</p>
        </div>
      </footer>
    </div>
  );
}
