export const profile = {
  name: "Kaiden McIntosh",
  tagline: "Frontend web developer focused on clean, fast interfaces.",
  about: [
    "I'm a 20-year-old frontend developer focused on building \"fast\", \"modern\", and \"visually sharp\" web experiences.",
    "I started coding a few months ago and quickly realized I genuinely enjoy figuring things out and building \"real\" projects. I experiment a lot with AI tools like \"Cursor\" to speed up my workflow and push ideas into production faster. Instead of just following tutorials, I prefer to build, test, break things, fix them, and learn through \"doing\".",
    "Alongside development, I've studied \"cybersecurity\", which has shaped how I think about systems and structure. It's made me more aware of how applications work behind the scenes, not just how they look on the surface. I try to build with both performance and responsibility in mind.",
    "I'm still early in my journey, but I'm learning fast and building consistently.",
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
    github: "Kaiden2707",
    instagram: "Kaiden.xo",
    linkedin: "",
  },
  personal: {
    interests: ["gym", "gaming", "music"],
    workStyle:
      "I like to treat small projects as practice labs — trying one idea at a time and layering improvements instead of aiming for perfection on the first pass.",
  },
} as const;
