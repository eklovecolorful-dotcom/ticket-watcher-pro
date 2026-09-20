import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ArrowRight } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-border/60 bg-background/45 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label="Flight Price Notifier home">
          <span className="hidden sm:block"><BrandMark /></span>
          <span className="sm:hidden"><BrandMark compact /></span>
        </Link>
        <Button asChild size="lg">
          <Link to={user ? "/app" : "/auth"}>
            {user ? "Dashboard / 儀表板" : "Sign in / 登入"}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </header>
  );
}