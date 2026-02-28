import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { PageReveal } from "@/components/PageReveal";
import { GitHubContributionsCalendar } from "@/components/GitHubContributionsCalendar";
import { TechStackBar } from "@/components/TechStackBar";
import { TileSpotlight } from "@/components/TileSpotlight";
import { profile } from "@/content/profile";
import {
  frontendBarItems,
  backendBarItems,
  topLanguages,
} from "@/content/techStack";
import { techIconUrl } from "@/lib/techIcons";
import { SkillsPieChart } from "@/components/SkillsPieChart";

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteShell name={profile.name}>
        <div className="min-h-[2rem] sm:min-h-[3rem]" aria-hidden />
        <PageReveal>
          <Section id="skills" eyebrow="Stack" title="Skills" titleScrollFlow>
            <div className="max-w-2xl space-y-3 text-muted-foreground">
              {Array.isArray(profile.skillsIntro)
                ? profile.skillsIntro.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                : <p>{profile.skillsIntro}</p>}
            </div>

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

            <h3 className="mt-10 font-comfortaa text-lg font-semibold text-foreground sm:text-xl">
              Top code used
            </h3>
            <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
              <div className="grid w-full max-w-[340px] grid-cols-2 gap-3 sm:gap-4 min-w-0 shrink-0 sm:max-w-[380px]">
                {topLanguages.map(({ name, percent, iconId }) => (
                  <TileSpotlight
                    key={name}
                    className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition hover:border-accent/25 hover:bg-surface-2 dark:text-white sm:p-5"
                  >
                    <img
                      src={techIconUrl(iconId)}
                      alt=""
                      width={26}
                      height={26}
                      className="shrink-0 opacity-90"
                    />
                    <div className="min-w-0">
                      <div className="text-[15px] font-medium text-foreground leading-tight sm:text-base">
                        {name}
                      </div>
                      <div className="text-xs text-muted-foreground tabular-nums">
                        {percent}%
                      </div>
                    </div>
                  </TileSpotlight>
                ))}
              </div>
              <div className="lg:ml-auto lg:shrink-0">
                <SkillsPieChart items={topLanguages} />
              </div>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-5 items-center gap-4">
                <div className="col-span-3 h-px bg-border" />
                <h3 className="col-span-1 flex items-center gap-2 whitespace-nowrap text-2xl font-semibold text-foreground dark:text-white sm:text-3xl">
                  <img
                    src={techIconUrl("github")}
                    alt=""
                    width={28}
                    height={28}
                    className="shrink-0 tech-logo-invert"
                  />
                  GitHub Insights
                </h3>
                <div className="col-span-1 h-px bg-border" />
              </div>
              <p className="mt-6 max-w-2xl text-left text-sm text-muted-foreground sm:text-base dark:text-white">
                Each square represents work done on projects.
                <br />
                The lighter the square, the more activity on that day. It reflects my consistency and ongoing development.
              </p>
              <div className="mt-6 [&_svg]:max-w-full [&_svg]:h-auto">
                <GitHubContributionsCalendar
                  username={profile.contact.github}
                  year={2026}
                />
              </div>
            </div>
          </Section>
        </PageReveal>
      </SiteShell>
    </div>
  );
}
