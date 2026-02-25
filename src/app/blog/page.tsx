import Link from "next/link";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { TileSpotlight } from "@/components/TileSpotlight";
import { profile } from "@/content/profile";

const placeholderPosts = [
  {
    slug: "welcome",
    title: "Welcome to the blog",
    excerpt:
      "Notes on what I'm building, what I'm learning, and the tools I use. Clean, minimal, and to the point.",
    date: "2025-02-23",
  },
  {
    slug: "coming-soon",
    title: "More posts soon",
    excerpt:
      "I'll be adding short write-ups on frontend patterns, security basics, and project updates as I ship.",
    date: "—",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteShell name={profile.name}>
        <div className="min-h-[2rem] sm:min-h-[3rem]" aria-hidden />

        <Section id="posts" eyebrow="Writing" title="Blog">
          <p className="mb-8 text-sm leading-7 text-muted sm:text-base dark:text-white">
            Short posts on development, security, and whatever I'm working on.
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
      </SiteShell>
    </div>
  );
}
