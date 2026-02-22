import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { profile } from "@/content/profile";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { TileSpotlight } from "@/components/TileSpotlight";
import Grainient from "@/components/Grainient";

export default function Home() {
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <SiteShell name={profile.name}>
      {/* First page: hero with Grainient background — scroll or arrow to see more */}
      <div className="relative h-[85vh] w-full overflow-hidden sm:h-[90vh]">
        {/* Grainient background — hero only */}
        <div className="absolute inset-0 z-0">
          <Grainient
            color1="#b494ff"
            color2="#0a0a0b"
            color3="#876be6"
            timeSpeed={0.85}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        </div>

        {/* Name + title: JetBrains Mono (code-style) for name and tagline */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center space-y-1 sm:space-y-2">
            <h1 className="font-hero-code font-light text-3xl leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="block">{firstName}</span>
              {lastName ? <span className="block">{lastName}</span> : null}
            </h1>
            <p className="font-hero-code font-extralight text-sm tracking-normal text-white sm:text-base">
              {profile.tagline}
            </p>
          </div>
        </div>

        {/* Scroll prompt — animated arrow only, larger */}
        <div className="pointer-events-none absolute inset-x-0 bottom-12 z-10 flex justify-center sm:bottom-16">
          <a
            href="#about"
            className="pointer-events-auto flex flex-col items-center text-xs font-mono uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12">
              <span className="animate-bounce text-3xl leading-none sm:text-4xl">
                ↓
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Spacer so About section does not touch hero — scroll or arrow to see */}
      <div className="min-h-[4rem] sm:min-h-[5rem]" aria-hidden />

      <Section id="about" eyebrow="Intro" title="About">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="space-y-4 text-sm leading-7 text-foreground/90 sm:text-base">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="md:col-span-4">
            <TileSpotlight className="rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/25 hover:bg-surface-2">
              <div className="text-sm font-semibold">Education</div>
              <p className="mt-2 text-sm text-foreground/90">
                EDUVOS 2025, Cyber security
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li className="flex items-center justify-between">
                  <span>PenTest+</span>
                  <span className="font-mono text-xs text-foreground/80">88</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>N+</span>
                  <span className="font-mono text-xs text-foreground/80">83</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>A+</span>
                  <span className="font-mono text-xs text-foreground/80">65</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>S+</span>
                  <span className="font-mono text-xs text-foreground/80">86</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>CySA+</span>
                  <span className="font-mono text-xs text-foreground/80">78</span>
                </li>
              </ul>
            </TileSpotlight>
          </div>
        </div>
      </Section>

      <Section id="skills" eyebrow="Stack" title="Skills">
        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          <div className="space-y-4">
            {Object.entries(profile.skills).map(([group, items]) => (
              <TileSpotlight
                key={group}
                className="rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/25 hover:bg-surface-2"
              >
                <div className="text-sm font-semibold">{group}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="tile-spotlight inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-foreground/90 shadow-[0_0_0_1px_rgba(var(--accent-rgb)/0.10)] transition hover:border-accent/40 hover:shadow-[0_0_0_1px_rgba(var(--accent-rgb)/0.25),0_0_24px_rgba(var(--accent-rgb)/0.18)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </TileSpotlight>
            ))}
          </div>

          <TileSpotlight className="rounded-2xl border border-border bg-surface p-4 transition hover:border-accent/25 hover:bg-surface-2 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="text-sm font-semibold">Core tooling</div>
              <span className="rounded-full border border-border bg-surface-2 px-2 py-[2px] text-[10px] font-mono uppercase tracking-[0.16em] text-muted">
                focused
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <TileSpotlight className="rounded-xl border border-border bg-surface-2 px-3 py-3">
                <div className="font-semibold">React</div>
                <p className="mt-1 text-[11px] text-muted">
                  Primary UI framework for building interactive views.
                </p>
              </TileSpotlight>
              <TileSpotlight className="rounded-xl border border-border bg-surface-2 px-3 py-3">
                <div className="font-semibold">pnpm</div>
                <p className="mt-1 text-[11px] text-muted">
                  Fast, disk-efficient package manager I use for projects.
                </p>
              </TileSpotlight>
              <TileSpotlight className="rounded-xl border border-border bg-surface-2 px-3 py-3">
                <div className="font-semibold">GitHub</div>
                <p className="mt-1 text-[11px] text-muted">
                  Where I ship small experiments and future projects.
                </p>
              </TileSpotlight>
              <TileSpotlight className="rounded-xl border border-border bg-surface-2 px-3 py-3">
                <div className="font-semibold">VS Code / Cursor</div>
                <p className="mt-1 text-[11px] text-muted">
                  My main editors for writing and refactoring frontend code.
                </p>
              </TileSpotlight>
            </div>
          </TileSpotlight>
        </div>
      </Section>

      <Section id="projects" eyebrow="Next up" title="Planned projects">
        <div className="space-y-4">
          <p className="text-sm leading-7 text-muted sm:text-base">
            I’m treating these as small labs for learning modern frameworks —
            focused places to practice patterns, animation, and layout without
            shipping a huge app on day one.
          </p>
          <div className="grid gap-4 md:grid-cols-1">
            {profile.projectsPlanned.map((project) => (
              <TileSpotlight
                key={project.name}
                className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/30 hover:bg-surface-2"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">
                      {project.name}
                    </h3>
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

      <Section id="personal" eyebrow="Outside of code" title="A bit more human">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
          <TileSpotlight className="rounded-2xl border border-border bg-surface p-5">
            <div className="text-sm font-semibold">What I’m into</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {profile.personal.interests.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb)/0.8)]" />
                  <span className="capitalize">{item}</span>
                </li>
              ))}
            </ul>
          </TileSpotlight>
          <TileSpotlight className="rounded-2xl border border-border bg-surface p-5">
            <div className="text-sm font-semibold">How I like to work</div>
            <p className="mt-3 text-sm leading-7 text-muted">
              {profile.personal.workStyle}
            </p>
          </TileSpotlight>
        </div>
      </Section>

      <Section id="contact" eyebrow="Connect" title="Contact">
        <ContactPanel />
      </Section>
    </SiteShell>
  );
}
