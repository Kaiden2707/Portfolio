import { ImageCarousel } from "@/components/ImageCarousel";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { PageReveal } from "@/components/PageReveal";
import { CyberFoundationRadial } from "@/components/CyberFoundationRadial";
import GradientText from "@/components/GradientText";
import { profile } from "@/content/profile";

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
            titleScrollFlow
          >
            <div className="grid gap-8 md:grid-cols-12 md:items-start">
              <div className="md:col-span-8">
                <div className="space-y-4 text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
                  <h3 className="text-lg font-semibold sm:text-xl text-foreground dark:text-white">
                    Who I am
                  </h3>
                  {profile.about.slice(0, 1).map((p) => {
                    const normalized = p.replace(/,(?!\s)/g, ", ");
                    const segments = segmentizeQuoted(normalized);
                    return (
                      <p key="who" className="text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
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
                  <h3 className="pt-2 text-lg font-semibold sm:text-xl text-foreground dark:text-white">
                    How I build
                  </h3>
                  {profile.about.slice(1, 3).map((p, i) => {
                    const normalized = p.replace(/,(?!\s)/g, ", ");
                    const segments = segmentizeQuoted(normalized);
                    return (
                      <p key={`how-${i}`} className="text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
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
                  <h3 className="pt-2 text-lg font-semibold sm:text-xl text-foreground dark:text-white">
                    Cyber Security Background
                  </h3>
                  {profile.about.slice(3, 4).map((p) => {
                    const normalized = p.replace(/,(?!\s)/g, ", ");
                    const segments = segmentizeQuoted(normalized);
                    return (
                      <p key="cyber-intro" className="text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
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
                      <p key="cyber-outro" className="mt-3 text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
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
              </div>
            </div>
          </Section>
          <Section id="personal" eyebrow="Outside of code" title="A bit more human" titleScrollFlow>
            <div className="space-y-6 px-1 py-2 text-foreground/90 sm:px-2 sm:py-3 dark:text-white">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1 space-y-6">
                  <p className="text-sm leading-7 sm:text-base">
                    I started coding out of curiosity, but stayed because of the feeling of turning nothing into something real.
                    There’s something addictive about solving a problem and watching an idea come to life.
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span aria-hidden>🧠</span>
                        Why I Build
                      </div>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                        <li>I like creating things from scratch.</li>
                        <li>I enjoy figuring out how things work.</li>
                        <li>I’m obsessed with refining small details until they feel right.</li>
                        <li>When something finally works, it’s a rush.</li>
                      </ul>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span aria-hidden>🌿</span>
                        Outside the Screen
                      </div>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                        <li>Into fitness - I like pushing limits physically the same way I do mentally.</li>
                        <li>Competitive by nature.</li>
                        <li>Gaming for strategy and creativity.</li>
                        <li>I care about aesthetics and clean design.</li>
                      </ul>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span aria-hidden>🚀</span>
                        What Drives Me
                      </div>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                        <li>Becoming insanely skilled at what I do.</li>
                        <li>Building websites for real people.</li>
                        <li>Working remotely and creating freedom through skill.</li>
                        <li>Making cool things that actually get used.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-3 px-4 py-3">
                    <h3 className="flex items-center gap-2 text-lg font-semibold sm:text-xl">
                      <span aria-hidden>🌍</span>
                      Where I’m Headed
                    </h3>
                    <p className="text-base leading-7 sm:text-lg sm:leading-8">
                      I’m not just learning to code, I’m building a skillset that gives me the freedom to create anything I can imagine.
                      My goal isn’t just to work remotely, but to become so skilled that the quality of my work speaks before I do.
                    </p>
                    <p className="text-base leading-7 sm:text-lg sm:leading-8">
                      I want to reach a point where I can take any idea, mine or someone else’s and bring it to life cleanly and confidently.
                      Not chasing trends, but building things that feel intentional, thoughtful, and built to last.
                    </p>
                  </div>
                </div>
                <div className="group w-full sm:flex sm:h-[26rem] sm:w-[19.5rem] sm:shrink-0 sm:items-center sm:justify-center">
                  <ImageCarousel
                    className="w-full sm:w-72 sm:origin-center sm:transform-gpu sm:will-change-transform sm:transition-transform sm:duration-300 sm:ease-out sm:group-hover:scale-[1.06]"
                    images={[{ src: "/personal-image.png", alt: "" }]}
                  />
                </div>
              </div>
            </div>
          </Section>
        </PageReveal>
      </SiteShell>
    </div>
  );
}
