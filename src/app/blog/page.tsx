import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { TileSpotlight } from "@/components/TileSpotlight";
import { PageReveal } from "@/components/PageReveal";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/seo";

const placeholderPosts = [
  {
    slug: "welcome",
    title: "Nothing here just yet",
    excerpt:
      "This section is still in progress. Posts will start appearing here soon.",
    date: "2025-02-23",
  },
  {
    slug: "coming-soon",
    title: "Coming soon",
    excerpt:
      "I will be sharing short write-ups on projects, frontend ideas, and security notes.",
    date: "—",
  },
];

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read blog updates from Kaiden McIntosh on frontend development, UI ideas, project notes, and security insights.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Kaiden McIntosh",
    description:
      "Read blog updates from Kaiden McIntosh on frontend development, UI ideas, project notes, and security insights.",
    url: `${siteConfig.siteUrl}/blog`,
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteShell name={profile.name}>
        <div className="min-h-[2rem] sm:min-h-[3rem]" aria-hidden />

        <PageReveal>
          <Section id="posts" eyebrow="Writing" title="Blog" headingLevel={1}>
          <p className="mb-8 text-sm leading-7 text-muted sm:text-base dark:text-white">
            Nothing here for now. I am still setting this up and will publish posts soon.
          </p>
          <ul className="space-y-4">
            {placeholderPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="block">
                  <TileSpotlight className="rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/25 hover:bg-surface-2 dark:text-white">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold">{post.title}</h3>
                      <span className="font-mono text-xs text-muted">
                        {post.date}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-3 inline-block text-xs font-medium uppercase tracking-[0.15em] text-accent">
                      Read →
                    </span>
                  </TileSpotlight>
                </Link>
              </li>
            ))}
          </ul>
          </Section>
        </PageReveal>
      </SiteShell>
    </div>
  );
}
