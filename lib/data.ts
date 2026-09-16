export const EMAIL = "me@alesix.site"

export const heroWords = ["interfaces", "servers", "things that ship", "the whole stack"]

export const about = `I'm Alex, a fifteen year old developer from Sevilla. I write the [[frontend:frontend]] and I run the [[machine:machine]] it lives on, so when something breaks at three in the morning there is nobody else to call.

Lately most of my time goes into [[go:Go]]: small services, proxies, an AI animator for Minecraft models. Before that, [[plugins:plugins]] for game servers in Java. Everything ends up [[github:on GitHub]].

I like [[boring:boring tools]], flat black interfaces and the kind of animation you only notice the second time.`

export type TermNote = { title: string; body: string; tags: { name: string; icon?: string }[] }

export const terms: Record<string, TermNote> = {
  frontend: {
    title: "Frontend",
    body: "TypeScript and React on Next.js, styled with Tailwind. Nothing exotic, everything typed.",
    tags: [
      { name: "TypeScript", icon: "ts" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind", icon: "tailwind" },
    ],
  },
  machine: {
    title: "The machine",
    body: "Linux boxes I provision and harden myself. Docker for the apps, Nginx in front, Cloudflare at the edge.",
    tags: [
      { name: "Linux", icon: "linux" },
      { name: "Docker", icon: "docker" },
      { name: "Nginx", icon: "nginx" },
      { name: "Cloudflare", icon: "cloudflare" },
    ],
  },
  go: {
    title: "Go",
    body: "Compiled, simple, fast to ship. MCAIA, SCPxy and most of the APIs I write are Go.",
    tags: [{ name: "Go", icon: "go" }, { name: "MCAIA" }, { name: "SCPxy" }],
  },
  plugins: {
    title: "Plugins",
    body: "Java plugins for game servers: restarts with Discord alerts, private messages, the small things a community asks for.",
    tags: [{ name: "Java", icon: "java" }, { name: "HyRestart" }, { name: "HyMSG" }],
  },
  github: {
    title: "GitHub",
    body: "Twenty-odd public repos: Go services, Java plugins, a few web apps and the odd script I was too lazy to keep private.",
    tags: [
      { name: "@AlesixDev" },
      { name: "Go", icon: "go" },
      { name: "Java", icon: "java" },
      { name: "TypeScript", icon: "ts" },
    ],
  },
  boring: {
    title: "Boring tools",
    body: "Things with ten years of documentation and no surprises. I can fix them without reading the docs, which is the point.",
    tags: [
      { name: "Bash", icon: "bash" },
      { name: "Git", icon: "git" },
      { name: "Python", icon: "python" },
    ],
  },
}

export type Project = {
  name: string
  description: string
  tech: string[]
  url: string
  github: string | null
  year: string
}

export const projects: Project[] = [
  {
    name: "GitHub Projects",
    description:
      "A curated showcase of open source GitHub projects. Browse, explore and submit community tools, libraries and frameworks.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    url: "https://projects.alesix.site",
    github: "https://github.com/AlesixDev/github-projects",
    year: "2026",
  },
  {
    name: "MCVote",
    description:
      "A Minecraft server list I work on: discover, vote and review servers, from survival to PvP.",
    tech: ["Next.js", "TypeScript"],
    url: "https://mcvote.org",
    github: null,
    year: "2026",
  },
  {
    name: "Portfolio",
    description: "This site. Built from scratch, no template, no page builder.",
    tech: ["Next.js", "TypeScript", "Motion"],
    url: "https://alesix.site",
    github: null,
    year: "2026",
  },
  {
    name: "Blog",
    description:
      "My personal blog where I post a little bit of everything, usually tutorials and other stuff.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    url: "https://blog.alesix.site",
    github: null,
    year: "2025",
  },
]

export type Repo = {
  name: string
  description: string
  lang: { name: string; icon: string }
  github: string
  year: string
  stars: number
}

export const repos: Repo[] = [
  {
    name: "MCAIA",
    description:
      "Local AI animator for Minecraft models. A prompt becomes keyframes validated against the rig; imports .bbmodel, glTF and OBJ, exports to Blockbench, Bedrock and GeckoLib.",
    lang: { name: "Go", icon: "go" },
    github: "https://github.com/AlesixDev/MCAIA",
    year: "2026",
    stars: 0,
  },
  {
    name: "SCPxy",
    description:
      "Lightweight proxy for SCP: Secret Laboratory servers. Keeps player IPs via passthrough, multiple backends with fallback, per-IP rate limiting and a terminal dashboard.",
    lang: { name: "Go", icon: "go" },
    github: "https://github.com/AlesixDev/SCPxy",
    year: "2026",
    stars: 1,
  },
  {
    name: "HyRestart",
    description:
      "Automatic restarts for Hytale servers, on a schedule or on demand, with warnings and status posted to Discord.",
    lang: { name: "Java", icon: "java" },
    github: "https://github.com/AlesixDev/HyRestart",
    year: "2026",
    stars: 5,
  },
  {
    name: "HyMSG",
    description:
      "Private messages between players on a Hytale server. Small plugin, does one thing.",
    lang: { name: "Java", icon: "java" },
    github: "https://github.com/AlesixDev/HyMSG",
    year: "2026",
    stars: 1,
  },
  {
    name: "server-sort-pterodactyl",
    description:
      "A script that sorts and tidies servers on a Pterodactyl panel, so the list stops being a mess.",
    lang: { name: "Bash", icon: "bash" },
    github: "https://github.com/AlesixDev/server-sort-pterodactyl",
    year: "2026",
    stars: 0,
  },
]

export type Tool = { name: string; icon: string; blurb: string; use: string }
export type ToolCategory = { label: string; note: string; tools: Tool[] }

export const toolCategories: ToolCategory[] = [
  {
    label: "Frontend",
    note: "What I use every day",
    tools: [
      {
        name: "React",
        icon: "react",
        blurb: "The UI library everything else here sits on.",
        use: "Where every interface starts.",
      },
      {
        name: "Next.js",
        icon: "nextjs",
        blurb: "React framework: routing, server rendering, caching.",
        use: "For anything with more than one page.",
      },
      {
        name: "TypeScript",
        icon: "ts",
        blurb: "JavaScript with types, so mistakes show up before users do.",
        use: "Default for anything longer than a script.",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
        blurb: "Utility classes instead of stylesheets I forget to delete.",
        use: "How I style almost everything.",
      },
      {
        name: "Vite",
        icon: "vite",
        blurb: "Fast dev server and bundler for plain React apps.",
        use: "Small tools and dashboards without a backend.",
      },
      {
        name: "Motion",
        icon: "framer",
        blurb: "Animation library for React: springs, gestures, scroll.",
        use: "Whenever something needs to move.",
      },
    ],
  },
  {
    label: "Infrastructure",
    note: "Where the sites actually live",
    tools: [
      {
        name: "Docker",
        icon: "docker",
        blurb: "Containers, so an app runs the same on every box.",
        use: "Every service I deploy.",
      },
      {
        name: "Nginx",
        icon: "nginx",
        blurb: "Reverse proxy and static server in front of the apps.",
        use: "TLS, routing and rate limits.",
      },
      {
        name: "Linux",
        icon: "linux",
        blurb: "The operating system on every machine I manage.",
        use: "Debian on the servers, CachyOS on my desk.",
      },
      {
        name: "Cloudflare",
        icon: "cloudflare",
        blurb: "DNS, edge cache and a shield in front of the origin.",
        use: "In front of every domain I run.",
      },
    ],
  },
  {
    label: "Languages",
    note: "Beyond the browser",
    tools: [
      {
        name: "Go",
        icon: "go",
        blurb: "Compiled, simple, great for small fast services.",
        use: "APIs, backend services and CLI tools, my current focus.",
      },
      {
        name: "Python",
        icon: "python",
        blurb: "For scripts, automation and quick experiments.",
        use: "Backups, scrapers, one-off migrations.",
      },
      {
        name: "Java",
        icon: "java",
        blurb: "Verbose but everywhere, especially in game servers.",
        use: "Game server plugins.",
      },
      {
        name: "Bash",
        icon: "bash",
        blurb: "The shell. Glue for everything on a Linux box.",
        use: "Deploy scripts, cron jobs, server setup.",
      },
      {
        name: "HTML",
        icon: "html",
        blurb: "The document itself. Still matters.",
        use: "Semantic markup so pages read well without CSS.",
      },
      {
        name: "CSS",
        icon: "css3",
        blurb: "Layout, motion and the details Tailwind doesn't cover.",
        use: "The bits Tailwind can't reach.",
      },
    ],
  },
  {
    label: "Workflow",
    note: "Editors and the rest",
    tools: [
      {
        name: "Git",
        icon: "git",
        blurb: "Version control. Every project, from the first commit.",
        use: "Branches for features, tags for releases.",
      },
      {
        name: "GitHub",
        icon: "github",
        blurb: "Where the code lives and the open source goes.",
        use: "Repos, issues and Actions for CI.",
      },
      { name: "VSCode", icon: "vscode", blurb: "Main editor for web work.", use: "Anything web." },
      {
        name: "IntelliJ",
        icon: "intellij",
        blurb: "JetBrains IDE, best in class for Java.",
        use: "The Java side of things.",
      },
      {
        name: "Claude Code",
        icon: "claudeai",
        blurb: "AI pair programmer in the terminal.",
        use: "Boilerplate, refactors and rubber-ducking.",
      },
    ],
  },
]

export type SocialLink = { name: string; handle: string; href: string; icon: string }

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    handle: "@AlesixDev",
    href: "https://github.com/AlesixDev",
    icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  },
  {
    name: "Discord",
    handle: "route.ts",
    href: "https://discord.com/users/route.ts",
    icon: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.8733.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z",
  },
  {
    name: "LinkedIn",
    handle: "protocolo",
    href: "https://www.linkedin.com/in/protocolo/",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "Email",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: "M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.236l-8 4.882-8-4.882V6.4l8 4.882L20 6.4v1.836z",
  },
]
