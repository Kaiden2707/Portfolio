import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { TileSpotlight } from "@/components/TileSpotlight";
import { ScrollFlowWrapper } from "@/components/ScrollFlowWrapper";
import SplitText from "@/components/SplitText";
import { profile } from "@/content/profile";

const introTextProps = {
  splitType: "words" as const,
  scrollFlow: true as const,
  from: { opacity: 0, y: 28 },
  to: { opacity: 1, y: 0 },
  ease: "power3.out" as const,
  textAlign: "left" as const,
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteShell name={profile.name}>
        <div className="min-h-[6rem] sm:min-h-[8rem]" aria-hidden />
        <ScrollFlowWrapper>
          <Section id="projects" eyebrow="Next up" title="Planned projects" titleScrollFlow>
            <div className="space-y-4">
              <SplitText
                text="I'm treating these as small labs for learning modern frameworks — focused places to practice patterns, animation, and layout without shipping a huge app on day one."
                tag="p"
                className="text-sm leading-7 text-muted sm:text-base"
                {...introTextProps}
              />
              <div className="grid gap-4 md:grid-cols-1">
                {profile.projectsPlanned.map((project) => (
                  <TileSpotlight
                    key={project.name}
                    className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/30 hover:bg-surface-2"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold">{project.name}</h3>
                        <span className="rounded-full border border-border bg-surface-2 px-2 py-[2px] text-[10px] font-mono uppercase tracking-[0.16em] text-muted">
                          {project.status}
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-6 text-muted">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="tile-spotlight rounded-full bg-surface-2 px-2 py-1 text-[10px] font-medium text-foreground/80 ring-1 ring-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
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
