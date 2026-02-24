import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { profile } from "@/content/profile";
import Grainient from "@/components/Grainient";
import { MountAfterLayout } from "@/components/MountAfterLayout";

export default function Home() {
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <MountAfterLayout>
      <div className="relative z-10">
        <SiteShell name={profile.name}>
          <div className="relative h-[85vh] w-full overflow-hidden sm:h-[90vh]">
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
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="text-center space-y-1 sm:space-y-2">
                <h1 className="font-ethnocentric font-light text-3xl leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="block">{firstName}</span>
                  {lastName ? <span className="block">{lastName}</span> : null}
                </h1>
                <p className="font-ethnocentric font-extralight text-sm tracking-normal text-white sm:text-base">
                  {profile.tagline}
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-12 z-10 flex justify-center sm:bottom-16">
              <Link
                href="/about"
                className="pointer-events-auto flex flex-col items-center text-xs font-mono uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12">
                  <span className="animate-bounce text-3xl leading-none sm:text-4xl">
                    ↓
                  </span>
                </span>
              </Link>
            </div>
          </div>
          <div className="min-h-[4rem] sm:min-h-[5rem]" aria-hidden />
        </SiteShell>
      </div>
    </MountAfterLayout>
  );
}
