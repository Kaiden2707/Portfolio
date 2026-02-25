import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { profile } from "@/content/profile";

const posts: Record<
  string,
  { title: string; excerpt: string; date: string; body: string }
> = {
  welcome: {
    title: "Welcome to the blog",
    excerpt:
      "Notes on what I'm building, what I'm learning, and the tools I use.",
    date: "2025-02-23",
    body: "This is where I'll drop short notes on frontend patterns, security basics, and project updates. Same clean, minimal style as the rest of the site—no fluff.",
  },
  "coming-soon": {
    title: "More posts soon",
    excerpt: "I'll be adding write-ups as I ship.",
    date: "—",
    body: "More posts are on the way. Check back later or browse the main site.",
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-transparent">
      <SiteShell name={profile.name}>
        <div className="min-h-[2rem] sm:min-h-[3rem]" aria-hidden />

        <Section id="post" eyebrow="Blog" title={post.title}>
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm text-muted">
            <span className="font-mono">{post.date}</span>
            <Link
              href="/blog"
              className="font-medium uppercase tracking-[0.15em] text-accent hover:underline"
            >
              ← All posts
            </Link>
          </div>
          <div className="prose prose-invert mt-6 max-w-none">
            <p className="text-sm leading-7 text-foreground/90 sm:text-base">
              {post.body}
            </p>
          </div>
        </Section>
      </SiteShell>
    </div>
  );
}
