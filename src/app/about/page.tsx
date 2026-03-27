import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { PageReveal } from "@/components/PageReveal";
import { CyberFoundationRadial } from "@/components/CyberFoundationRadial";
import { HumanStorySection } from "@/components/HumanStorySection";
import { AboutSkillsRadar } from "@/components/AboutSkillsRadar";
import GradientText from "@/components/GradientText";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/seo";

function segmentizeQuoted(text: string): { quoted: boolean; text: string }[] {
  const segments: { quoted: boolean; text: string }[] = [];
  let lastIndex = 0;
  const re = /"([^"]+)"/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plain = text.slice(lastIndex, match.index);
      if (plain) segments.push({ quoted: false, text: plain });
    }
    segments.push({ quoted: true, text: match[1] });
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) {
    const plain = text.slice(lastIndex);
    if (plain) segments.push({ quoted: false, text: plain });
  }
  return segments.filter((s) => s.text.length > 0);
}

const accentClass = "font-bold";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Kaiden McIntosh, including frontend development approach, cybersecurity background, and personal work style.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Kaiden McIntosh",
    description:
      "Learn more about Kaiden McIntosh, including frontend development approach, cybersecurity background, and personal work style.",
    url: `${siteConfig.siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteShell name={profile.name}>
        <div className="min-h-[2rem] sm:min-h-[3rem]" aria-hidden />
        <PageReveal>
          <Section
            id="about"
            eyebrow="Intro"
            title="About"
            headingLevel={1}
          >
            <div className="grid gap-8 md:grid-cols-12 md:items-start">
              <div className="md:col-span-8">
                <div className="space-y-7 text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
                  <h3 className="font-nulshock text-lg font-semibold text-foreground sm:text-xl dark:text-white">
                    Who I am
                  </h3>
                  {profile.about.slice(0, 1).map((p) => {
                    const normalized = p.replace(/,(?!\s)/g, ", ");
                    const segments = segmentizeQuoted(normalized);
                    return (
                      <p key="who" className="whitespace-pre-line text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
                        {segments.map((seg, j) => {
                          const prevTrimmed = segments[j - 1]?.text.trim() ?? "";
                          const currTrimmed = seg.text.trim();
                          const needSpace =
                            j > 0 &&
                            /[a-zA-Z0-9)]$/.test(prevTrimmed) &&
                            /^[a-zA-Z0-9]/.test(currTrimmed);
                          return (
                            <span key={`who-${j}`} className="inline">
                              {needSpace ? " " : null}
                              {seg.quoted ? (
                                <GradientText
                                  colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                                  animationSpeed={2.5}
                                  showBorder={false}
                                  className={accentClass}
                                >
                                  {seg.text}
                                </GradientText>
                              ) : (
                                <span className="text-foreground/90 dark:text-white">{seg.text}</span>
                              )}
                            </span>
                          );
                        })}
                      </p>
                    );
                  })}
                  <h3 className="font-nulshock pt-6 text-lg font-semibold text-foreground sm:text-xl dark:text-white">
                    How I build
                  </h3>
                  {profile.about.slice(2, 3).map((p, i) => {
                    const normalized = p.replace(/,(?!\s)/g, ", ");
                    const segments = segmentizeQuoted(normalized);
                    return (
                      <p key={`how-${i}`} className="whitespace-pre-line text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
                        {segments.map((seg, j) => {
                          const prevTrimmed = segments[j - 1]?.text.trim() ?? "";
                          const currTrimmed = seg.text.trim();
                          const needSpace =
                            j > 0 &&
                            /[a-zA-Z0-9)]$/.test(prevTrimmed) &&
                            /^[a-zA-Z0-9]/.test(currTrimmed);
                          return (
                            <span key={`how-${i}-${j}`} className="inline">
                              {needSpace ? " " : null}
                              {seg.quoted ? (
                                <GradientText
                                  colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                                  animationSpeed={2.5}
                                  showBorder={false}
                                  className={accentClass}
                                >
                                  {seg.text}
                                </GradientText>
                              ) : (
                                <span className="text-foreground/90 dark:text-white">{seg.text}</span>
                              )}
                            </span>
                          );
                        })}
                      </p>
                    );
                  })}
                  <h3 className="font-nulshock pt-6 text-lg font-semibold text-foreground sm:text-xl dark:text-white">
                    Cyber Security Background
                  </h3>
                  {profile.about.slice(3, 4).map((p) => {
                    const normalized = p.replace(/,(?!\s)/g, ", ");
                    const segments = segmentizeQuoted(normalized);
                    return (
                      <p key="cyber-intro" className="whitespace-pre-line text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
                        {segments.map((seg, j) => {
                          const prevTrimmed = segments[j - 1]?.text.trim() ?? "";
                          const currTrimmed = seg.text.trim();
                          const needSpace =
                            j > 0 &&
                            /[a-zA-Z0-9)]$/.test(prevTrimmed) &&
                            /^[a-zA-Z0-9]/.test(currTrimmed);
                          return (
                            <span key={`cyber-intro-${j}`} className="inline">
                              {needSpace ? " " : null}
                              {seg.quoted ? (
                                <GradientText
                                  colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                                  animationSpeed={2.5}
                                  showBorder={false}
                                  className={accentClass}
                                >
                                  {seg.text}
                                </GradientText>
                              ) : (
                                <span className="text-foreground/90 dark:text-white">{seg.text}</span>
                              )}
                            </span>
                          );
                        })}
                      </p>
                    );
                  })}
                  {profile.about.slice(4, 5).map((p) => {
                    const normalized = p.replace(/,(?!\s)/g, ", ");
                    const segments = segmentizeQuoted(normalized);
                    return (
                      <p key="cyber-outro" className="mt-3 whitespace-pre-line text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
                        {segments.map((seg, j) => {
                          const prevTrimmed = segments[j - 1]?.text.trim() ?? "";
                          const currTrimmed = seg.text.trim();
                          const needSpace =
                            j > 0 &&
                            /[a-zA-Z0-9)]$/.test(prevTrimmed) &&
                            /^[a-zA-Z0-9]/.test(currTrimmed);
                          return (
                            <span key={`cyber-outro-${j}`} className="inline">
                              {needSpace ? " " : null}
                              {seg.quoted ? (
                                <GradientText
                                  colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                                  animationSpeed={2.5}
                                  showBorder={false}
                                  className={accentClass}
                                >
                                  {seg.text}
                                </GradientText>
                              ) : (
                                <span className="text-foreground/90 dark:text-white">{seg.text}</span>
                              )}
                            </span>
                          );
                        })}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="md:col-span-4 md:-mr-14 md:pt-2 md:pl-3 lg:-mr-24 lg:pl-6">
                <CyberFoundationRadial />
                <AboutSkillsRadar />
              </div>
            </div>
          </Section>
          <Section id="personal" eyebrow="A bit more human" title="Behind the Code">
            <HumanStorySection />
          </Section>
        </PageReveal>
      </SiteShell>
    </div>
  );
}
