# Security Notes

This repository is intended to be safe for a public GitHub repo.

## Secrets

- Never commit `.env.local`, `.env.production`, or any other real environment file.
- Only commit `.env.example` with placeholder values.
- `OPENAI_API_KEY` must remain server-only and must never be referenced from client components.
- Do not add `SUPABASE_SERVICE_ROLE_KEY` to client code or commit it to the repo.

## Supabase

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is designed to be public, but it must still be protected with Row Level Security policies.
- All tables in `supabase/schema.sql` have RLS enabled by default.
- Before exposing the API routes in production, add explicit Supabase policies for the `anon` or `authenticated` roles.
- If server routes need privileged writes, use a separate server-only service role client from environment variables that are not prefixed with `NEXT_PUBLIC_`.

## API Routes

- Route handlers return generic 500 responses so backend/provider errors are not exposed to clients.
- Validate all request bodies before sending data to Supabase or the LLM.

## GitHub

- Enable GitHub secret scanning and push protection on the repository.
- Rotate any key immediately if it is ever committed, even briefly.
