import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/SiteNav";

export function SiteShell({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2 ring-1 ring-border sm:h-9 sm:w-9">
              <Image
                src="/navbar-logo.png"
                alt=""
                width={36}
                height={36}
                className="object-contain"
              />
            </span>
            <span className="text-base font-bold tracking-tight sm:text-lg">{name}</span>
          </Link>
          <SiteNav />
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/10 bg-transparent">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 text-sm text-muted sm:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span suppressHydrationWarning>© {new Date().getFullYear()}</span> {name}
            </p>
            <p className="font-mono text-xs tracking-tight">
              Built with Next.js + pnpm
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

