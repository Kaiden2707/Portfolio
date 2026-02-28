"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  async function handleSignOut() {
    await signOut();
    window.location.href = "/";
  }

  return (
    <nav className="flex min-w-0 flex-1 items-center gap-1">
      <div className="flex items-center gap-1">
        {sectionLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className={[
              "rounded-full px-3 py-1.5 text-base transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 dark:text-white dark:hover:text-white",
              pathname === href
                ? "bg-surface-2 text-foreground shadow-[0_0_0_1px_rgba(var(--accent-rgb)/0.25),0_0_20px_rgba(var(--accent-rgb)/0.10)]"
                : "text-muted hover:text-foreground",
            ].join(" ")}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/blog"
          className={[
            "rounded-full px-3 py-1.5 text-base transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 dark:text-white dark:hover:text-white",
            onBlog
              ? "bg-surface-2 text-foreground shadow-[0_0_0_1px_rgba(var(--accent-rgb)/0.25),0_0_20px_rgba(var(--accent-rgb)/0.10)]"
              : "text-muted hover:text-foreground",
          ].join(" ")}
        >
          Blog
        </Link>
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
