import { ImageCarousel } from "@/components/ImageCarousel";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { TileSpotlight } from "@/components/TileSpotlight";
import { ScrollFlowBlock } from "@/components/ScrollFlowBlock";
import { ScrollFlowWrapper } from "@/components/ScrollFlowWrapper";
import SplitText from "@/components/SplitText";
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

const bodyTextProps = {
  splitType: "words" as const,
  scrollFlow: true as const,
  from: { opacity: 0, y: 28 },
  to: { opacity: 1, y: 0 },
  ease: "power3.out" as const,
  textAlign: "left" as const,
};

const accentClass =
  "font-bold text-accent [text-shadow:0_0_8px_rgba(var(--accent-rgb),0.7),0_0_16px_rgba(var(--accent-rgb),0.4)]";

const certs = [
  "PenTest+",
  "N+",
  "A+",
  "S+",
  "CySA+",
  "Linux Administration",
  "SecurityX (formerly CASP+)",
  "Wireless Networks and Security",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteShell name={profile.name}>
        <div className="min-h-[2rem] sm:min-h-[3rem]" aria-hidden />
        <ScrollFlowWrapper>
          <Section id="about" eyebrow="Intro" title="About" titleScrollFlow>
            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-8">
                <div className="space-y-4 text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
                  <h3 className="flex items-center gap-2 text-lg font-semibold sm:text-xl text-foreground dark:text-white">
                    <span aria-hidden>📌</span>
                    Who I am
                  </h3>
                  {profile.about.slice(0, 1).map((p) => {
                    const segments = segmentizeQuoted(p);
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
                              <SplitText
                                text={seg.text}
                                tag="span"
                                {...bodyTextProps}
                                className={
                                  seg.quoted
                                    ? `!inline ${accentClass}`
                                    : "!inline text-foreground/90 dark:text-white"
                                }
                              />
                            </span>
                          );
                        })}
                      </p>
                    );
                  })}
                  <h3 className="flex items-center gap-2 pt-2 text-lg font-semibold sm:text-xl text-foreground dark:text-white">
                    <span aria-hidden>👷</span>
                    How I build
                  </h3>
                  {profile.about.slice(1, 2).map((p) => {
                    const segments = segmentizeQuoted(p);
                    return (
                      <p key="how" className="text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
                        {segments.map((seg, j) => {
                          const prevTrimmed = segments[j - 1]?.text.trim() ?? "";
                          const currTrimmed = seg.text.trim();
                          const needSpace =
                            j > 0 &&
                            /[a-zA-Z0-9)]$/.test(prevTrimmed) &&
                            /^[a-zA-Z0-9]/.test(currTrimmed);
                          return (
                            <span key={`how-${j}`} className="inline">
                              {needSpace ? " " : null}
                              <SplitText
                                text={seg.text}
                                tag="span"
                                {...bodyTextProps}
                                className={
                                  seg.quoted
                                    ? `!inline ${accentClass}`
                                    : "!inline text-foreground/90 dark:text-white"
                                }
                              />
                            </span>
                          );
                        })}
                      </p>
                    );
                  })}
                  <h3 className="flex items-center gap-2 pt-2 text-lg font-semibold sm:text-xl text-foreground dark:text-white">
                    <span aria-hidden>🌐</span>
                    <span aria-hidden>🔒</span>
                    Cyber Security
                  </h3>
                  {profile.about.slice(2).map((p, i) => {
                    const segments = segmentizeQuoted(p);
                    return (
                      <p key={`rest-${i}`} className="text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
                        {segments.map((seg, j) => {
                          const prevTrimmed = segments[j - 1]?.text.trim() ?? "";
                          const currTrimmed = seg.text.trim();
                          const needSpace =
                            j > 0 &&
                            /[a-zA-Z0-9)]$/.test(prevTrimmed) &&
                            /^[a-zA-Z0-9]/.test(currTrimmed);
                          return (
                            <span key={`rest-${i}-${j}`} className="inline">
                              {needSpace ? " " : null}
                              <SplitText
                                text={seg.text}
                                tag="span"
                                {...bodyTextProps}
                                className={
                                  seg.quoted
                                    ? `!inline ${accentClass}`
                                    : "!inline text-foreground/90 dark:text-white"
                                }
                              />
                            </span>
                          );
                        })}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="md:col-span-4">
                <TileSpotlight className="rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/25 hover:bg-surface-2 dark:text-white">
                  <div className="text-sm font-semibold">Education</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted dark:text-white">
                    EDUVOS 2025, Cyber security
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-muted dark:text-white">
                    {certs.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </TileSpotlight>
              </div>
            </div>
          </Section>
          <Section id="personal" eyebrow="Outside of code" title="A bit more human" titleScrollFlow>
            <div className="space-y-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1 space-y-6">
                  <ScrollFlowBlock>
                    <p className="text-sm leading-7 text-foreground/90 sm:text-base dark:text-white">
                      I started coding out of curiosity, but stayed because of the feeling of turning nothing into something real.
                      There’s something addictive about solving a problem and watching an idea come to life.
                    </p>
                  </ScrollFlowBlock>
                  <ScrollFlowBlock>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <TileSpotlight className="rounded-2xl border-2 border-accent dark:border-white bg-surface p-4 dark:text-white">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <span aria-hidden>🧠</span>
                          Why I Build
                        </div>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted dark:text-white">
                          <li>I like creating things from scratch.</li>
                          <li>I enjoy figuring out how things work.</li>
                          <li>I’m obsessed with refining small details until they feel right.</li>
                          <li>When something finally works, it’s a rush.</li>
                        </ul>
                      </TileSpotlight>
                      <TileSpotlight className="rounded-2xl border-2 border-accent dark:border-white bg-surface p-4 dark:text-white">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <span aria-hidden>🌿</span>
                          Outside the Screen
                        </div>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted dark:text-white">
                          <li>Into fitness - I like pushing limits physically the same way I do mentally.</li>
                          <li>Competitive by nature.</li>
                          <li>Gaming for strategy and creativity.</li>
                          <li>I care about aesthetics and clean design.</li>
                        </ul>
                      </TileSpotlight>
                      <TileSpotlight className="rounded-2xl border-2 border-accent dark:border-white bg-surface p-4 dark:text-white">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <span aria-hidden>🚀</span>
                          What Drives Me
                        </div>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted dark:text-white">
                          <li>Becoming insanely skilled at what I do.</li>
                          <li>Building websites for real people.</li>
                          <li>Working remotely and creating freedom through skill.</li>
                          <li>Making cool things that actually get used.</li>
                        </ul>
                      </TileSpotlight>
                    </div>
                  </ScrollFlowBlock>
                  <ScrollFlowBlock>
                  <div className="space-y-3 dark:text-white">
                    <h3 className="flex items-center gap-2 text-lg font-semibold sm:text-xl">
                      <span aria-hidden>🌍</span>
                      Where I’m Headed
                    </h3>
                    <p className="text-base leading-7 text-foreground/90 sm:text-lg sm:leading-8">
                      I’m not just learning to code, I’m building a skillset that gives me the freedom to create anything I can imagine.
                      My goal isn’t just to work remotely, but to become so skilled that the quality of my work speaks before I do.
                    </p>
                    <p className="text-base leading-7 text-foreground/90 sm:text-lg sm:leading-8 dark:text-white">
                      I want to reach a point where I can take any idea, mine or someone else’s and bring it to life cleanly and confidently.
                      Not chasing trends, but building things that feel intentional, thoughtful, and built to last.
                    </p>
                  </div>
                  </ScrollFlowBlock>
                </div>
                <ScrollFlowBlock className="w-full sm:w-72 sm:shrink-0">
                  <ImageCarousel
                    images={[
                      { src: "/personal-image.png", alt: "" },
                      { src: "/personal-image-2.png", alt: "" },
                    ]}
                  />
                </ScrollFlowBlock>
              </div>
            </div>
          </Section>
        </ScrollFlowWrapper>
      </SiteShell>
    </div>
  );
}
