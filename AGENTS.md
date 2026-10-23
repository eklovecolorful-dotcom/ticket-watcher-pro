<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project structure

This is a plain Vite + React SPA (React Router 7, `src/router.tsx`). It is **not** TanStack Start —
there is no SSR, no server functions, no `src/routes/` file-based routing and no Cloudflare/Nitro build.
Pages live in `src/pages/`; static output goes to `dist/`; `vercel.json` provides the SPA fallback.
