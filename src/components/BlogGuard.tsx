"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useSession } from "@/lib/auth-client";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { profile } from "@/content/profile";

export function BlogGuard({ children }: { children: ReactNode }) {
  const { data, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-transparent">
        <SiteShell name={profile.name}>
          <div className="min-h-[40vh] flex items-center justify-center px-5">
            <p className="text-sm text-muted">Loading…</p>
          </div>
        </SiteShell>
      </div>
    );
  }

  if (!data?.user) {
    return (
      <div className="min-h-screen bg-transparent">
        <SiteShell name={profile.name}>
          <div className="min-h-[2rem] sm:min-h-[3rem]" aria-hidden />
          <Section id="sign-in-required" eyebrow="Blog" title="Sign in to view">
            <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-6 text-center shadow-[0_0_0_1px_rgba(var(--accent-rgb)/0.08)] sm:p-8">
              <p className="text-sm leading-7 text-foreground/90">
                Please sign in to view the blog.
              </p>
              <Link
                href="/login?callbackURL=/blog"
                className="mt-6 inline-block rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                Sign in
              </Link>
              <p className="mt-4 text-xs text-muted">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-accent hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </Section>
        </SiteShell>
      </div>
    );
  }

  return <>{children}</>;
}
