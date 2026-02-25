/** Icon IDs match simple-icons slugs (https://simpleicons.org) for cdn.simpleicons.org */

export const frontendBarItems = [
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "react", label: "React" },
  { id: "html5", label: "HTML5" },
  { id: "css3", label: "CSS3" },
  { id: "nextdotjs", label: "Next.js" },
  { id: "tailwindcss", label: "Tailwind CSS" },
] as const;

export const backendBarItems = [
  { id: "nodedotjs", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "git", label: "Git" },
  { id: "tailwindcss", label: "Tailwind CSS" },
  { id: "vercel", label: "Vercel" },
  { id: "github", label: "GitHub" },
  { id: "pnpm", label: "pnpm" },
  { id: "visualstudiocode", label: "VS Code" },
  { id: "neon", label: "Neon" },
  { id: "postgresql", label: "Drizzle" },
] as const;

export const topLanguages = [
  { name: "JavaScript", percent: 45, iconId: "javascript" },
  { name: "Python", percent: 30, iconId: "python" },
  { name: "TypeScript", percent: 15, iconId: "typescript" },
  { name: "HTML", percent: 10, iconId: "html5" },
] as const;
