import Image from "next/image";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { TileSpotlight } from "@/components/TileSpotlight";
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
        <div className="min-h-[6rem] sm:min-h-[8rem]" aria-hidden />
        <ScrollFlowWrapper>
          <Section id="about" eyebrow="Intro" title="About" titleScrollFlow>
            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-8">
                <div className="space-y-4 text-sm leading-7 text-foreground/90 sm:text-base">
                  {profile.about.map((p, i) => {
                    const segments = segmentizeQuoted(p);
                    return (
                      <p key={i} className="text-sm leading-7 text-foreground/90 sm:text-base">
                        {segments.map((seg, j) => {
                          const prevTrimmed = segments[j - 1]?.text.trim() ?? "";
                          const currTrimmed = seg.text.trim();
                          const needSpace =
                            j > 0 &&
                            /[a-zA-Z0-9)]$/.test(prevTrimmed) &&
                            /^[a-zA-Z0-9]/.test(currTrimmed);
                          return (
                            <span key={`${i}-${j}`} className="inline">
                              {needSpace ? " " : null}
                              <SplitText
                                text={seg.text}
                                tag="span"
                                {...bodyTextProps}
                                className={
                                  seg.quoted
                                    ? `!inline ${accentClass}`
                                    : "!inline text-foreground/90"
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
                <TileSpotlight className="rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/25 hover:bg-surface-2">
                  <div className="text-sm font-semibold">Education</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted">
                    EDUVOS 2025, Cyber security
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
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
              <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch">
                <TileSpotlight className="rounded-2xl border border-border bg-surface p-5 sm:min-w-0 sm:flex-1">
                  <div className="text-sm font-semibold">What I'm into</div>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    {profile.personal.interests.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb)/0.8)]" />
                        <span className="capitalize">{item}</span>
                      </li>
                    ))}
                  </ul>
                </TileSpotlight>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-surface-2 sm:w-72 sm:shrink-0">
                  <Image
                    src="/personal-image.png"
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 ease-out hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 288px"
                  />
                </div>
              </div>
              <TileSpotlight className="rounded-2xl border border-border bg-surface p-5">
                <div className="text-sm font-semibold">How I like to work</div>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {profile.personal.workStyle}
                </p>
              </TileSpotlight>
            </div>
          </Section>
        </ScrollFlowWrapper>
      </SiteShell>
    </div>
  );
}
