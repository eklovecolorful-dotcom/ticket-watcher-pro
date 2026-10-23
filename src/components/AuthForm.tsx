import { Link, useMatch, useNavigate } from "react-router";
import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, LoaderCircle, LockKeyhole, Mail } from "lucide-react";

import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta } from "@/lib/page-meta";

type Mode = "sign-in" | "sign-up";

export function AuthForm() {
  const navigate = useNavigate();
  // Mode comes from the URL: /sign-in or /sign-up.
  const mode: Mode = useMatch("/sign-up") ? "sign-up" : "sign-in";
  const setMode = (next: Mode) => {
    if (next !== mode) void navigate(`/${next}`, { replace: true });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  usePageMeta({
    title: `${mode === "sign-in" ? "Sign In" : "Sign Up"} — Flight Price Notifier`,
    description: "Sign in or create your Flight Price Notifier account.",
    ogDescription: "Access your flight price alert dashboard.",
  });

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) void navigate("/app", { replace: true });
    });
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = mode === "sign-in"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    setLoading(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }

    await navigate("/app", { replace: true });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-20">
      <div className="auth-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <Link to="/" className="absolute left-5 top-6 z-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:left-8">
        <ArrowLeft className="size-4" aria-hidden="true" /> Back / 返回
      </Link>

      <section className="relative z-10 w-full max-w-md rounded-lg border border-border bg-card/90 p-6 shadow-2xl backdrop-blur-xl sm:p-9">
        <BrandMark />
        <div className="mt-9">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Member access</p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground">
            {mode === "sign-in" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {mode === "sign-in" ? "登入後查看你的航線追蹤儀表板。" : "開始準備你的低價機票追蹤清單。"}
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 rounded-md bg-muted p-1" aria-label="Authentication mode">
          <Button type="button" variant={mode === "sign-in" ? "secondary" : "ghost"} onClick={() => { setMode("sign-in"); setError(""); }}>
            Sign In
          </Button>
          <Button type="button" variant={mode === "sign-up" ? "secondary" : "ghost"} onClick={() => { setMode("sign-up"); setError(""); }}>
            Sign Up
          </Button>
        </div>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-11 pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input id="password" type="password" autoComplete={mode === "sign-in" ? "current-password" : "new-password"} required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" className="h-11 pl-10" />
            </div>
          </div>
          {error && <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading && <LoaderCircle className="animate-spin" aria-hidden="true" />}
            {mode === "sign-in" ? "Sign In / 登入" : "Create Account / 註冊"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
          {mode === "sign-in" ? "還沒有帳號？切換到 Sign Up 免費建立。" : "已有帳號？切換到 Sign In 登入。"}
        </p>
      </section>
    </main>
  );
}