# Kaif Chaudhari — Cybersecurity Portfolio

> **Cybersecurity Analyst | Security Researcher | AI-Driven Defense Builder**

A production-grade personal portfolio website showcasing cybersecurity projects, vulnerability research, AI-driven defense engineering, and security publications.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: GitHub Pages (static export)

## Features

- 🎨 **3-Theme System** — Premium (dark), Corporate (light), Red (terminal)
- 🔧 **Technical Mode Toggle** — Recruiter view / Full technical depth
- ⚡ **Framer Motion animations** — Scroll reveals, hover effects, typewriter
- 📱 **Mobile-first responsive** — Full hamburger nav, stacked layouts
- 🛡 **Security-focused** — Static deployment, CSP headers, no trackers
- 🚀 **Lighthouse 95+ target** — Optimized fonts, images, code splitting

## Project Structure

```
/app            → Next.js App Router pages
/components     → All UI components (11 sections)
/context        → ThemeContext + TechnicalContext
/data           → projects.ts | skills.ts | research.ts
/styles         → globals.css (theme variables)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (static export)
npm run build
```

## Deployment

Push to `main` branch — GitHub Actions automatically builds and deploys to GitHub Pages.

Configure `basePath` in `next.config.ts` if deploying to a subdirectory:

```ts
basePath: "/your-repo-name"  // for username.github.io/repo-name
```

## Sections

1. **Hero** — Typewriter effect, stats, "Scan This Portfolio" button
2. **Value Strip** — 4 credibility highlights
3. **About** — Professional summary + timeline
4. **Domains** — 5 security specialization cards
5. **Projects** — Auto Scan (featured) + Password Checker, with technical mode expansion
6. **Research** — Writeups, malware analysis, CTF breakdowns
7. **Skills** — Categorized grid with proficiency bars
8. **Resume** — Corporate + Technical download buttons
9. **Contact** — Social links + contact form
10. **Footer** — Security notice + trust indicators

---

*Built with security as the foundation, not an afterthought.*
