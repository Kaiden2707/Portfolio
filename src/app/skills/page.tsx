import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { ScrollFlowWrapper } from "@/components/ScrollFlowWrapper";
import { GitHubContributionsCalendar } from "@/components/GitHubContributionsCalendar";
import { TechStackBar } from "@/components/TechStackBar";
import { profile } from "@/content/profile";
import {
  frontendBarItems,
  backendBarItems,
  topLanguages,
} from "@/content/techStack";
import { techIconUrl } from "@/lib/techIcons";

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteShell name={profile.name}>
        <div className="min-h-[2rem] sm:min-h-[3rem]" aria-hidden />
        <ScrollFlowWrapper>
          <Section id="skills" eyebrow="Stack" title="Skills" titleScrollFlow>
            <p className="max-w-2xl text-muted-foreground">
              {profile.skillsIntro}
            </p>

            <div className="mt-8 space-y-6">
              <TechStackBar
                items={frontendBarItems}
                direction="left"
                className="w-full"
              />
              <TechStackBar
                items={backendBarItems}
                direction="right"
                className="w-full"
              />
            </div>

            <h3 className="mt-10 font-comfortaa text-base font-semibold text-foreground sm:text-lg">
              Top code used
            </h3>
            <div className="mt-4 flex flex-wrap gap-4 gap-y-6 sm:gap-6">
              {topLanguages.map(({ name, percent, iconId }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface/80 px-4 py-3 min-w-0"
                >
                  <img
                    src={techIconUrl(iconId)}
                    alt=""
                    width={28}
                    height={28}
                    className="shrink-0 opacity-90"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground">
                      {name}
                    </div>
                    <div className="text-xs text-muted-foreground tabular-nums">
                      {percent}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between gap-6">
                <div className="h-px flex-1 bg-border" />
                <h3 className="flex shrink-0 items-center gap-2 text-xl font-semibold text-foreground dark:text-white sm:text-2xl">
                  <img
                    src={techIconUrl("github")}
                    alt=""
                    width={28}
                    height={28}
                    className="shrink-0 tech-logo-invert"
                  />
                  GitHub Insights
                </h3>
              </div>
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
