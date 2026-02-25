/** Simple Icons CDN; iconId = slug from https://simpleicons.org. Colors = brand hex. */
const BASE = "https://cdn.simpleicons.org";

/** Slugs that 404 on cdn.simpleicons.org → use jsDelivr SVG. */
const JSDELIVR_SLUGS = ["css3", "visualstudiocode"] as const;
const JSDELIVR_BASE = "https://cdn.jsdelivr.net/npm/simple-icons@11/icons";

/** Use different slug for CDN (e.g. neon has no icon, use postgresql). */
const SLUG_OVERRIDE: Record<string, string> = { neon: "postgresql" };

export const brandColors: Record<string, string> = {
  javascript: "F7DF1E",
  typescript: "3178C6",
  react: "61DAFB",
  html5: "E34F26",
  css3: "1572B6",
  nextdotjs: "000000",
  tailwindcss: "06B6D4",
  nodedotjs: "339933",
  python: "3776AB",
  git: "F05032",
  vercel: "000000",
  github: "181717",
  pnpm: "F69220",
  visualstudiocode: "007ACC",
  neon: "00E599",
  postgresql: "4169E1",
  gmail: "EA4335",
  instagram: "E4405F",
};

/** Invert in dark mode so logo is visible (dark brand logos + jsDelivr black SVGs). */
export function invertInDark(iconId: string): boolean {
  return (
    ["github", "nextdotjs", "vercel"].includes(iconId) ||
    (JSDELIVR_SLUGS as readonly string[]).includes(iconId)
  );
}

export function techIconUrl(iconId: string, color?: string): string {
  const slug = SLUG_OVERRIDE[iconId] ?? iconId;
  const hex = (color || brandColors[iconId] || brandColors[slug] || "94a3b8").replace(/^#/, "");
  if ((JSDELIVR_SLUGS as readonly string[]).includes(iconId)) {
    return `${JSDELIVR_BASE}/${iconId}.svg`;
  }
  return `${BASE}/${slug}/${hex}`;
}
