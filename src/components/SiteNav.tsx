"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SECTION_IDS = ["about", "skills", "projects", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("about");

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        const id = visible?.target?.id;
        if (!id) return;
        if ((SECTION_IDS as readonly string[]).includes(id)) {
          setActive(id as SectionId);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -65% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.75],
      },
    );

    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, []);

  return active;
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: string;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-current={active ? "page" : undefined}
      className={[
        "rounded-full px-3 py-1 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        active
          ? "bg-surface-2 text-foreground shadow-[0_0_0_1px_rgba(var(--accent-rgb)/0.25),0_0_20px_rgba(var(--accent-rgb)/0.10)]"
          : "text-muted hover:text-foreground",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export function SiteNav() {
  const active = useActiveSection();

  return (
    <nav className="flex items-center gap-1">
      <NavLink href="#about" active={active === "about"}>
        About
      </NavLink>
      <NavLink href="#skills" active={active === "skills"}>
        Skills
      </NavLink>
      <NavLink href="#projects" active={active === "projects"}>
        Planned projects
      </NavLink>
      <NavLink href="#contact" active={active === "contact"}>
        Contact
      </NavLink>
    </nav>
  );
}

