"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/ThemeToggle";

const sectionLinks = [
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const onBlog = pathname?.startsWith("/blog") ?? false;
  const onProjects = pathname === "/projects";
  const [skillsMenuOpen, setSkillsMenuOpen] = useState(false);

  function linkClass(isActive: boolean) {
    return [
      "transform-gpu rounded-full px-3 py-1.5 text-base transition-transform duration-250 ease-out will-change-transform motion-safe:hover:scale-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 dark:text-white dark:hover:text-white",
      isActive
        ? "bg-surface-2 text-foreground shadow-[0_0_0_1px_rgba(var(--accent-rgb)/0.25),0_0_20px_rgba(var(--accent-rgb)/0.10)]"
        : "text-muted hover:text-foreground",
    ].join(" ");
  }

  function dropdownItemClass(isActive: boolean) {
    return [
      "block transform-gpu rounded-lg px-2.5 py-1.5 text-center text-sm transition-[transform,color,background-color] duration-200 ease-out motion-safe:hover:scale-[1.06]",
      isActive ? "bg-surface-2 text-foreground" : "text-muted hover:bg-surface-2 hover:text-foreground",
    ].join(" ");
  }

  async function handleSignOut() {
    await signOut();
    window.location.href = "/";
  }

  return (
    <nav className="flex min-w-0 flex-1 items-center gap-1">
      <div className="flex items-center gap-1">
        {sectionLinks.map(({ href, label }) => (
          href === "/skills" ? (
            <span
              key={href}
              className="group/nav relative inline-flex"
              onMouseEnter={() => setSkillsMenuOpen(true)}
              onMouseLeave={() => setSkillsMenuOpen(false)}
              onFocusCapture={() => setSkillsMenuOpen(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setSkillsMenuOpen(false);
                }
              }}
            >
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={linkClass(pathname === href || onProjects)}
              >
                <span className="inline-flex items-center gap-1">
                  {label}
                  <span
                    className={[
                      "text-[10px] transition-transform duration-250 ease-out",
                      skillsMenuOpen ? "rotate-180" : "rotate-0",
                    ].join(" ")}
                    aria-hidden
                  >
                    ▼
                  </span>
                </span>
              </Link>
              <div
                className={[
                  "absolute left-1/2 top-full z-40 mt-0 w-fit min-w-[7.25rem] -translate-x-1/2 rounded-xl border border-red-400/75 bg-surface/95 p-1.5 shadow-[0_0_20px_rgba(239,68,68,0.38),0_12px_30px_rgba(0,0,0,0.28)]",
                  "transition-all duration-220 ease-out",
                  skillsMenuOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0",
                ].join(" ")}
              >
                <Link href="/projects" className={`${dropdownItemClass(onProjects)} whitespace-nowrap`}>
                  Projects
                </Link>
              </div>
            </span>
          ) : (
            <span key={href} className="group/nav relative inline-flex">
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={linkClass(pathname === href)}
              >
                {label}
              </Link>
            </span>
          )
        ))}
        <span className="group/nav relative inline-flex">
          <Link
            href="/blog"
            className={linkClass(onBlog)}
          >
            Blog
          </Link>
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
