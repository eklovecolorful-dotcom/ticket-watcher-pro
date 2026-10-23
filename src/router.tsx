import { createBrowserRouter, redirect, type RouteObject } from "react-router";

import { RootLayout } from "@/components/RootLayout";
import { RouteError } from "@/components/RouteError";
import { AuthForm } from "@/components/AuthForm";
import { supabase } from "@/integrations/supabase/client";
import { AUTHENTICATED_ROUTE_ID } from "@/lib/route-ids";
import { IndexPage } from "@/pages/IndexPage";
import { AppPage } from "@/pages/AppPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

// Client-only guard (replaces the old TanStack `_authenticated` beforeLoad).
async function requireUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw redirect("/sign-in");
  return { user: data.user };
}

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    hydrateFallbackElement: <div className="min-h-screen bg-background" />,
    children: [
      { path: "/", element: <IndexPage /> },
      {
        // Pathless layout so the form keeps its state when toggling Sign In ↔ Sign Up.
        element: <AuthForm />,
        children: [{ path: "/sign-in" }, { path: "/sign-up" }],
      },
      // Legacy URL from the TanStack version.
      { path: "/auth", loader: () => redirect("/sign-in") },
      {
        id: AUTHENTICATED_ROUTE_ID,
        loader: requireUser,
        shouldRevalidate: () => false,
        children: [{ path: "/app", element: <AppPage /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
