export const profile = {
  name: "Kaiden McIntosh",
  tagline: "Frontend web developer focused on clean, fast interfaces.",
  about: [
    "I’m Kaiden McIntosh — a frontend web developer who likes minimalist, dark UIs with a strong focus on polish.",
    "Right now I’m focused on getting comfortable with modern frameworks and building small, sharp projects that feel like real products.",
  ],
  projectsPlanned: [
    {
      name: "Framework Playground",
      status: "Planned",
      description:
        "A small collection of focused UI experiments to learn modern React and Next.js patterns without the noise.",
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      name: "Portfolio v2",
      status: "Planned",
      description:
        "A more advanced version of this site with live project data, theming controls, and deeper case studies.",
      tech: ["Next.js", "React Server Components", "pnpm"],
    },
    {
      name: "Components Lab",
      status: "Planned",
      description:
        "A personal component library where I rebuild common UI pieces with a focus on accessibility and animation.",
      tech: ["React", "Tailwind CSS"],
    },
  ],
  skills: {
    Languages: ["TypeScript", "JavaScript", "HTML", "CSS"],
    Frameworks: ["React", "Next.js", "Tailwind CSS"],
    Tools: ["pnpm", "GitHub", "VS Code", "Node.js"],
  },
  contact: {
    email: "kaidenmcintosh27@gmail.com",
    phone: "0815012030",
    github: "Kaiden_dev",
    instagram: "Kaiden.xo",
    linkedin: "",
  },
  personal: {
    interests: ["gym", "gaming", "music"],
    workStyle:
      "I like to treat small projects as practice labs — trying one idea at a time and layering improvements instead of aiming for perfection on the first pass.",
  },
} as const;
