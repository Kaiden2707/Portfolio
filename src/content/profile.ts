export const profile = {
  name: "Kaiden McIntosh",
  tagline: "Frontend web developer focused on clean, fast interfaces.",
  about: [
    "I am a frontend developer who delivers fast, modern and \"visually appealing\" web experiences. While design is important, I also ensure \"functionality\".",
    "I create real projects while testing ideas, identifying weaknesses and optimizing outcomes.",
    "I focus on maintaining \"open communication\" with my employers to ensure the website \"aligns\" with their \"objectives\" and most importantly the \"customers needs\". My goal when building is clear: Customer focused solutions, clean execution and \"reliable results\".",
    "Understanding how systems can be \"exploited\" and where vulnerabilities appear, changes how I \"approach\" building websites.",
    "Even on frontend websites, I consider the full stack and how all components link together and build with both \"performance\" and \"responsibility\" in mind.",
  ],
  aboutCyberBullets: [
    "Secure data handling",
    "access control",
    "Attack surfaces",
    "System exposure",
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
  skillsIntro: [
    "This is the stack I work in day-to-day.",
    "Whether I'm building a responsive UI, setting up backend systems, or deploying a full project, these are the technologies I rely on. I focus on keeping things clean and practical.",
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
