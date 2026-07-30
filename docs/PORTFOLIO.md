# Amit Kumar — Portfolio Codebase Guide

Everything an agent needs to work on this project without wasting time exploring.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` — no `tailwind.config.js`) |
| Animations | framer-motion v12 (`motion`, `useInView`, `useScroll`, `useTransform`, `AnimatePresence`) |
| Icons | lucide-react v1.27 — **no `Linkedin` export**; use inline SVG (see any component) |
| Font | `next/font/google` → `Inter` (in `layout.tsx`) |
| Images | `next/image` — profile photo at `/public/profile.jpeg` |
| Deploy target | Vercel (static export, auto-detected) |

---

## Project Layout

```
src/
  app/
    layout.tsx          ← root layout: Inter font, Navbar, metadata
    page.tsx            ← assembles all sections in order
    globals.css         ← Tailwind import + all custom CSS classes
  components/
    Navbar.tsx          ← 'use client' — fixed, scroll-aware, mobile hamburger
    Hero.tsx            ← 'use client' — framer-motion fade-up animations
    About.tsx           ← 'use client' — summary, contact rows, highlight cards
    Skills.tsx          ← 'use client' — 8 skill-group cards with tags
    Experience.tsx      ← 'use client' — vertical timeline, current/past dots
    Projects.tsx        ← 'use client' — 2-col grid, highlight badge, hover glow
    Awards.tsx          ← 'use client' — 2-col cards with shimmer hover
    Contact.tsx         ← 'use client' — contact rows + email CTA card
    Footer.tsx          ← Server Component — name, icons, copyright
  lib/
    data.ts             ← SINGLE SOURCE OF TRUTH for all resume content
public/
  profile.jpeg          ← profile photo
docs/
  PORTFOLIO.md          ← this file
```

---

## The Golden Rule: Edit `src/lib/data.ts` for Content

All resume data lives in one file. **Never hard-code content in components.**

### Exported constants

| Export | Type | Purpose |
|---|---|---|
| `profile` | object | name, title, subtitle, tagline, email, phone, location, linkedin, summary |
| `skillGroups` | array | `{ category, icon, skills[] }` — 8 groups |
| `experiences` | array | `{ company, location, period, duration, roles[] }` |
| `projects` | array | `{ name, fullName, period, techStack[], bullets[], highlight }` |
| `education` | object | `{ degree, institution, period }` |
| `awards` | array | `{ title, org, date, description, icon }` |
| `stats` | array | `{ value, label }` — 4 hero stats |

### Role object shape (inside `experiences[].roles[]`)

```ts
{
  title: string
  client: string | null
  current?: boolean        // true = green dot + "Current" badge
  period: string
  techStack: string[]
  project: string | null   // shown as cyan pill above tech stack
  bullets: string[]
}
```

---

## CSS Class Reference (`globals.css`)

| Class | Usage |
|---|---|
| `.gradient-text` | indigo→violet→cyan gradient text (name, stats) |
| `.gradient-text-warm` | pink→orange→yellow gradient (accent use) |
| `.card` | dark surface card with hover lift + border glow |
| `.card-glass` | blurred glass card |
| `.tag` | indigo pill for tech stack items |
| `.tag-cyan` | cyan variant tag |
| `.tag-emerald` | emerald variant tag (used for "Current" badge) |
| `.btn-primary` | gradient filled pill button with shadow |
| `.btn-secondary` | ghost pill button |
| `.section-title` | 2.25rem 800-weight section heading |
| `.section-bar` | gradient underline bar (centered, use after `.section-title`) |
| `.grid-bg` | subtle indigo grid pattern background |
| `.stat-card` | stats tile used in Hero |
| `.skill-card-header` | flex row with bottom border for skill card headings |
| `.timeline-line` | vertical gradient line for experience timeline |
| `.timeline-dot` | base dot class (combine with `.timeline-dot-active` or `.timeline-dot-inactive`) |
| `.timeline-dot-active` | glowing indigo dot (current role) |
| `.timeline-dot-inactive` | muted grey dot (past role) |

---

## Animation Patterns

All animated components are `'use client'`. Use `whileInView` + `viewport={{ once: true }}` for scroll-triggered, and `initial`/`animate` for on-mount.

**framer-motion v12 quirk:** `ease` inside a `Variants` object causes a TypeScript error. Never put `transition` inside a variant value. Instead use the spread helper pattern:

```tsx
// ✅ Correct — spread props directly onto motion element
const fu = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },       // or whileInView for scroll-trigger
  transition: { delay, duration: 0.55, ease: 'easeOut' as const },
})

<motion.div {...fu(0.2)} className="...">

// ✅ Inline whileInView (no variants object needed)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
>

// ❌ Do NOT put transition inside Variants — TypeScript error in v12
const bad = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { ease: 'easeOut' } }, // ← breaks
}
```

---

## Lucide-React Quirk (v1.27)

`Linkedin` is **not exported**. Use this inline SVG instead (already in Hero, Contact, Footer):

```tsx
function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
```

---

## Tailwind v4 Rules

- No `tailwind.config.js` — configuration is in CSS with `@theme` if needed.
- Import is `@import "tailwindcss"` (not `@tailwind base/components/utilities`).
- Arbitrary values like `bg-[#07070e]`, `w-[500px]` work as normal.
- Dynamic class names (e.g. `bg-${color}-500`) are **not safe** — Tailwind v4 purges them. Use `style=` or a lookup object instead.

---

## Dev & Build Commands

```bash
npm run dev      # starts on http://localhost:3000 (Turbopack, hot reload)
npm run build    # production build — must pass before deploying
npm run start    # serves production build on :3000
```

## Vercel Deployment

Push to GitHub and import at vercel.com/new — zero config needed. Or:

```bash
npx vercel       # deploy from CLI
```

No `vercel.json` needed — Next.js is auto-detected.
