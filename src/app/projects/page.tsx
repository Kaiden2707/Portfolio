import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { TileSpotlight } from "@/components/TileSpotlight";
import { ScrollFlowWrapper } from "@/components/ScrollFlowWrapper";
import { projectDocs } from "@/content/projectDocs";
import { profile } from "@/content/profile";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteShell name={profile.name}>
        <div className="min-h-[2rem] sm:min-h-[3rem]" aria-hidden />
        <ScrollFlowWrapper>
          <Section id="projects" eyebrow="Next up" title="Projects" titleScrollFlow>
            <div className="space-y-6">
              <p className="text-sm leading-7 text-muted sm:text-base dark:text-white">
                Documents and project write-ups. Add your Google Doc links and preview images in{" "}
                <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs font-mono text-foreground/90">
                  src/content/projectDocs.ts
                </code>
                .
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projectDocs.map((doc) => (
                  <TileSpotlight key={doc.id} className="group overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-accent/30 hover:bg-surface-2 dark:text-white">
                    <Link
                      href={doc.docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`Open ${doc.title} in Google Docs`}
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                        <Image
                          src={doc.previewImage}
                          alt=""
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-foreground dark:text-white">
                          {doc.title}
                        </h3>
                        <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
                          View doc
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </TileSpotlight>
                ))}
              </div>
            </div>
          </Section>
        </ScrollFlowWrapper>
      </SiteShell>
    </div>
  );
}
