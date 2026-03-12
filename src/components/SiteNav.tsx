"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/ThemeToggle";

const sectionLinks = [
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const onBlog = pathname?.startsWith("/blog") ?? false;
  const [loadedPreviews, setLoadedPreviews] = useState<Record<string, boolean>>({});

  function markPreviewLoaded(href: string) {
    setLoadedPreviews((current) =>
      current[href] ? current : { ...current, [href]: true },
    );
  }

  function linkClass(isActive: boolean) {
    return [
      "transform-gpu rounded-full px-3 py-1.5 text-base transition-transform duration-250 ease-out will-change-transform motion-safe:hover:scale-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 dark:text-white dark:hover:text-white",
      isActive
        ? "bg-surface-2 text-foreground shadow-[0_0_0_1px_rgba(var(--accent-rgb)/0.25),0_0_20px_rgba(var(--accent-rgb)/0.10)]"
        : "text-muted hover:text-foreground",
    ].join(" ");
  }

  function previewTile(href: string, label: string) {
    const previewHref = `${href}?preview=1`;
    const isLoaded = loadedPreviews[href];
    return (
      <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 hidden w-52 -translate-x-1/2 translate-y-1 overflow-hidden rounded-2xl border border-border/80 bg-surface/95 opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-220 ease-out group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 sm:block">
        <span className="relative block h-32 w-52 overflow-hidden">
          {!isLoaded ? (
            <span className="absolute inset-0 animate-pulse bg-surface-2/80" />
          ) : null}
          <iframe
            src={previewHref}
            title={`${label} live preview`}
            loading="lazy"
            aria-hidden
            tabIndex={-1}
            onLoad={() => markPreviewLoaded(href)}
            className="h-[640px] w-[1040px] origin-top-left scale-[0.2] border-0"
          />
        </span>
      </span>
    );
  }

  async function handleSignOut() {
    await signOut();
    window.location.href = "/";
  }

  return (
    <nav className="flex min-w-0 flex-1 items-center gap-1">
      <div className="flex items-center gap-1">
        {sectionLinks.map(({ href, label }) => (
          <span key={href} className="group/nav relative inline-flex">
            <Link
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={linkClass(pathname === href)}
            >
              {label}
            </Link>
            {previewTile(href, label)}
          </span>
        ))}
        <span className="group/nav relative inline-flex">
          <Link
            href="/blog"
            className={linkClass(onBlog)}
          >
            Blog
          </Link>
          {previewTile("/blog", "Blog")}
        </span>
      </div>
      <span className="flex-1" aria-hidden />
      <div className="flex items-center gap-3">
        {session?.user ? (
          <>
<span className="rounded-full px-3 py-1.5 text-base text-foreground/90 dark:text-white">
            {session.user.name ?? session.user.email ?? "Account"}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full px-3 py-1.5 text-base text-red-400 transition hover:bg-red-500/15 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-full px-3 py-1.5 text-base text-muted transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 dark:text-white dark:hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-accent/20 px-3 py-1.5 text-base font-medium text-accent transition hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              Sign up
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
