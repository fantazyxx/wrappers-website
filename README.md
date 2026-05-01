# Currency Bands — B2B Landing Page

Premium conversion-focused B2B landing page for a manufacturer of currency bands (banknote straps / money banderoles). Built for banks, cash centers, and CIT companies across Europe.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — custom navy/gold design system
- **Framer Motion** — scroll-triggered animations, reduced-motion aware
- **next/font** — Inter (primary) + Playfair Display (optional accent)
- **next/image** — optimized images with Unsplash remote patterns

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
├── app/
│   ├── globals.css          # Tailwind base + custom utilities
│   ├── layout.tsx           # Root layout — fonts, metadata, OG tags
│   └── page.tsx             # Home page — assembles all sections
├── components/
│   ├── sections/
│   │   ├── Hero.tsx         # Full-viewport hero with CTAs and trust badges
│   │   ├── Products.tsx     # Tabbed denomination grid (EUR / CZK / UAH)
│   │   ├── WhyChooseUs.tsx  # 5-feature grid on navy background
│   │   ├── HowItWorks.tsx   # 7-step animated production timeline
│   │   ├── Specifications.tsx # Technical spec cards
│   │   ├── CompetitiveEdge.tsx # Side-by-side advantages section
│   │   └── ContactForm.tsx  # Validated form with success state
│   └── ui/
│       ├── Header.tsx       # Sticky header + mobile hamburger menu
│       ├── Footer.tsx       # Minimal footer with links
│       ├── Button.tsx       # Polymorphic button (primary / secondary / ghost)
│       ├── AnimatedSection.tsx # Scroll-triggered Framer Motion wrapper
│       └── SectionHeader.tsx   # Reusable eyebrow + heading + subheading
├── lib/
│   └── animations.ts        # Shared Framer Motion variant presets
├── public/
│   ├── favicon.svg          # SVG favicon (navy background, gold stripes)
│   └── og-image-placeholder.txt
├── next.config.js           # Unsplash remotePatterns configured
└── tailwind.config.ts       # Custom colors: navy (#0A1628), gold (#C9A84C)
```

---

## Customization Checklist

### Images — Replace Placeholders

| Location | File | What to Replace |
|---|---|---|
| Hero | `components/sections/Hero.tsx` | Unsplash URL → actual product photo of currency bands |
| Competitive Edge | `components/sections/CompetitiveEdge.tsx` | Unsplash URL → production facility / product shot |
| OG Image | `public/og-image.png` | Create a 1200×630px brand image and place here |
| Favicon | `public/favicon.svg` | Refine or replace with your logo mark |

### Content & Branding

| What | Where |
|---|---|
| Company name "CurrencyBands" | `components/ui/Header.tsx`, `components/ui/Footer.tsx`, `app/layout.tsx` |
| Contact email `info@dcts.com.ua` | `components/sections/ContactForm.tsx`, `components/ui/Footer.tsx` — marked `// TODO` |
| Website URL `dcts.com.ua` | `components/ui/Footer.tsx` |
| `metadataBase` domain | `app/layout.tsx` — uncomment and set your production URL |
| OG image URL | `app/layout.tsx` — update once `og-image.png` is created |

### Form — Backend Integration

The contact form in `components/sections/ContactForm.tsx` currently simulates a 0.9s delay and shows a success state. To connect to a real backend:

1. Find the `// TODO: Integrate with backend / email service` comment in `handleSubmit`
2. Uncomment the `fetch('/api/contact', ...)` example and create `app/api/contact/route.ts`
3. Or replace with a third-party service:
   - **[Resend](https://resend.com)** — developer-friendly email API
   - **[Formspree](https://formspree.io)** — zero-backend form handling
   - **[SendGrid](https://sendgrid.com)** — enterprise email
   - **AWS SES** — scalable, cost-effective

### SEO

- Update `metadataBase` in `app/layout.tsx` with your production domain
- Add the actual `og-image.png` to `/public/`
- Add `sitemap.xml` and `robots.txt` to `/public/` or use Next.js Metadata API

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `navy` | `#0A1628` | Primary backgrounds, headings, dark UI |
| `navy-light` | `#112240` | Secondary dark backgrounds |
| `navy-dark` | `#060E1A` | Footer background |
| `gold` | `#C9A84C` | Accent, CTAs, highlights |
| `gold-dark` | `#A68835` | Button hover states |
| `gold-light` | `#D4BC78` | Subtle accents |

Font scale adds three fluid display sizes via CSS `clamp()`:
- `text-display-xl` — hero headline (~48–96px)
- `text-display-lg` — section headings (~36–60px)
- `text-display-md` — subsection headings (~28–40px)

---

## Accessibility

- WCAG AA contrast on all text/background combinations
- `prefers-reduced-motion` respected in all Framer Motion animations
- Skip-to-content link at top of layout
- All interactive elements have visible focus rings (gold outline)
- Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`, `<dl>`, `<form>`, labels
- `aria-label`, `role="tablist"`, `role="tab"`, `aria-selected`, `aria-expanded` used throughout
- All decorative elements have `aria-hidden="true"`
- Form errors use `role="alert"` and `aria-invalid`

---

## Performance Notes

- Hero image loads with `priority` (LCP optimization)
- Below-fold images use `loading="lazy"` (default for `next/image`)
- Fonts use `display: swap` to avoid invisible text
- Framer Motion animation variants are defined at module level (no re-creation on render)
- `useInView` uses `once: true` — animations trigger once and stop observing
