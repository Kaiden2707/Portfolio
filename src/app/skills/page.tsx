import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { TileSpotlight } from "@/components/TileSpotlight";
import { ScrollFlowWrapper } from "@/components/ScrollFlowWrapper";
import { GitHubContributionsCalendar } from "@/components/GitHubContributionsCalendar";
import { profile } from "@/content/profile";

const coreTools = [
  { title: "React", desc: "Primary UI framework for building interactive views." },
  { title: "pnpm", desc: "Fast, disk-efficient package manager I use for projects." },
  { title: "GitHub", desc: "Where I ship small experiments and future projects." },
  { title: "VS Code / Cursor", desc: "My main editors for writing and refactoring frontend code." },
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteShell name={profile.name}>
        <div className="min-h-[6rem] sm:min-h-[8rem]" aria-hidden />
        <ScrollFlowWrapper>
          <Section id="skills" eyebrow="Stack" title="Skills" titleScrollFlow>
            <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
              <div className="space-y-4">
                {Object.entries(profile.skills).map(([group, items]) => (
                  <TileSpotlight
                    key={group}
                    className="rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/25 hover:bg-surface-2 dark:text-white"
                  >
                    <div className="text-sm font-semibold">{group}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="tile-spotlight inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-foreground/90 shadow-[0_0_0_1px_rgba(var(--accent-rgb)/0.10)] transition hover:border-accent/40 hover:shadow-[0_0_0_1px_rgba(var(--accent-rgb)/0.25),0_0_24px_rgba(var(--accent-rgb)/0.18)] dark:text-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </TileSpotlight>
                ))}
              </div>
              <TileSpotlight className="rounded-2xl border border-border bg-surface p-4 transition hover:border-accent/25 hover:bg-surface-2 sm:p-5 dark:text-white">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold">Core tooling</div>
                  <span className="rounded-full border border-border bg-surface-2 px-2 py-[2px] text-[10px] font-mono uppercase tracking-[0.16em] text-muted">
                    focused
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  {coreTools.map(({ title, desc }) => (
                    <TileSpotlight
                      key={title}
                      className="rounded-xl border border-border bg-surface-2 px-3 py-3 dark:text-white"
                    >
                      <div className="font-semibold">{title}</div>
                      <p className="mt-1 text-[11px] text-muted">{desc}</p>
                    </TileSpotlight>
                  ))}
                </div>
              </TileSpotlight>
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground/90 dark:text-white">
                GitHub Insights
              </h3>
              <div className="mt-4 [&_svg]:max-w-full [&_svg]:h-auto">
                <GitHubContributionsCalendar
                  username={profile.contact.github}
                  year={2026}
                />
              </div>
            </div>
          </Section>
        </ScrollFlowWrapper>
      </SiteShell>
    </div>
  );
}
