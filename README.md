# Amit Kumar — Portfolio

Personal portfolio of **Amit Kumar**, Software Engineer II specialising in SAP BTP, SAP CAP (Java) and cloud-native Spring Boot microservices.

**Live:** https://amitk1420.vercel.app

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- framer-motion for animations, lucide-react for icons
- Deployed on Vercel via GitHub Actions

## Sections

Hero · About · Skills · Experience · Projects · Awards · Appreciation · Contact

All content lives in [`src/lib/data.ts`](src/lib/data.ts) — edit that file to update the site; components never hard-code resume data.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## SEO

- Open Graph / Twitter card metadata in `src/app/layout.tsx`
- schema.org `Person` JSON-LD for rich search results
- `sitemap.xml` and `robots.txt` generated from `src/app/sitemap.ts` and `src/app/robots.ts`

See [`docs/PORTFOLIO.md`](docs/PORTFOLIO.md) for the codebase guide (conventions, CSS classes, animation patterns).
