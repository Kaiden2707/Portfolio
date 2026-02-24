"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { authClient } from "@/lib/auth-client";

const defaultCallbackURL = "/blog";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") ?? defaultCallbackURL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await authClient.signIn.email({
      email,
      password,
      callbackURL,
    });
    setLoading(false);
    if (err) {
      setError(err.message ?? "Sign in failed");
      return;
    }
    router.push(callbackURL);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-[0_0_0_1px_rgba(var(--accent-rgb)/0.08)] sm:p-8">
        <h1 className="text-xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-muted">
          Use your email and password to sign in.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400"
            >
              {error}
            </div>
          )}
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-foreground placeholder:text-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-foreground placeholder:text-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      <Link href="/" className="mt-6 text-sm text-muted hover:text-foreground">
        ← Back to home
      </Link>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center px-5">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <div className="h-7 w-32 animate-pulse rounded bg-surface-2" />
            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-surface-2" />
            <div className="mt-6 h-10 w-full animate-pulse rounded bg-surface-2" />
            <div className="mt-4 h-10 w-full animate-pulse rounded bg-surface-2" />
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
