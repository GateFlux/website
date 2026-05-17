# GateFlux Marketing Website

Production-ready marketing website for GateFlux — a modern apartment and gated community management system.

## Tech Stack

- **Next.js** (App Router) — Framework with static export
- **React 18** — UI library
- **Tailwind CSS 4** — Utility-first CSS framework
- **Lucide React** — Icon library
- **Jest 30 + Testing Library** — Unit / component tests

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (static export)
npm run build

# Serve the exported build locally
npm run start

# Lint
npm run lint

# Run tests
npm run test

# Test coverage
npm run test:coverage
```

## Project Structure

```
website/
├── app/                   # Next.js App Router pages
│   ├── layout.js          # Root layout (HTML shell, Header, Footer)
│   ├── globals.css        # Global styles & Tailwind directives
│   ├── page.js            # Homepage (/)
│   ├── sitemap.js         # Dynamic sitemap generator
│   ├── about/             # /about
│   ├── book-demo/         # /book-demo
│   ├── contact/           # /contact
│   ├── cookies/           # /cookies
│   ├── data-deletion/     # /data-deletion
│   ├── features/          # /features
│   ├── modules/           # /modules
│   ├── pricing/           # /pricing
│   ├── privacy/           # /privacy
│   ├── refund-policy/     # /refund-policy
│   ├── security/          # /security
│   ├── sign-up/           # /sign-up
│   ├── signup/            # /signup
│   ├── sla/               # /sla
│   ├── society-signup/    # /society-signup
│   ├── terms/             # /terms
│   ├── verify-account/    # /verify-account
│   ├── verify-email/      # /verify-email
│   └── verify-phone/      # /verify-phone
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── ComparisonTable.jsx
│   │   ├── Container.jsx
│   │   ├── FAQ.jsx
│   │   ├── FeatureCard.jsx
│   │   ├── FloatingCTA.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Input.jsx
│   │   ├── LegalPageLayout.jsx
│   │   ├── Logo.jsx
│   │   ├── PricingCalculator.jsx
│   │   ├── PricingCard.jsx
│   │   ├── SectionHeader.jsx
│   │   ├── SignupLink.jsx
│   │   ├── TestimonialCard.jsx
│   │   └── __tests__/     # Component tests
│   ├── data/              # Static data / fixtures
│   ├── lib/               # Shared library utilities
│   ├── utils/             # Helper functions
│   └── views/             # Page-level view components
├── config/                # Site-wide configuration
├── public/                # Static assets served at /
├── scripts/               # Build / dev helper scripts
├── next.config.js         # Next.js configuration
├── postcss.config.js      # PostCSS (Tailwind)
├── jest.config.js         # Jest configuration
├── jest.setup.js          # Jest global setup
├── eslint.config.mjs      # ESLint flat config
└── package.json
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, trust badges, features preview, comparison, FAQ, CTA |
| `/features` | Feature categories: Visitor & Security, Community, Financial, Admin |
| `/modules` | Full module catalogue |
| `/security` | Security features, compliance, infrastructure, access control |
| `/pricing` | Pricing tiers, feature comparison, add-ons, FAQ |
| `/about` | Company story, mission/vision, values, team |
| `/contact` | Contact info, enterprise section |
| `/book-demo` | Demo booking form |
| `/sign-up`, `/signup`, `/society-signup` | Signup / onboarding flows |
| `/verify-account`, `/verify-email`, `/verify-phone` | Account verification |
| `/terms`, `/privacy`, `/cookies`, `/sla`, `/refund-policy`, `/data-deletion` | Legal pages |

## Design System

### Colors

- **Primary (Navy)**: `#0f172a` — Deep navy for text and dark backgrounds
- **Accent (Teal)**: `#0891b2` — Electric teal for CTAs and highlights
- **White**: Clean backgrounds and cards

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold, tight line-height, negative letter-spacing
- **Body**: Regular weight, relaxed line-height

### Components

- **Buttons**: Large, rounded (12–16 px), confident styling
- **Cards**: Rounded 16 px, soft shadows, subtle borders
- **Sections**: Generous padding (`py-16` to `py-32`)

## SEO

- Next.js Metadata API (`generateMetadata`)
- Dynamic `sitemap.js` generation
- Open Graph & Twitter Card meta tags
- Schema.org structured data
- Semantic HTML with proper heading hierarchy
- Trailing-slash URLs for static hosting compatibility

## Conversion Optimization

- Sticky header with CTA
- Floating "Book Demo" button (appears after scroll)
- Multiple CTAs throughout pages
- Contact form with validation
- Trust indicators (stats, badges)
- FAQ sections to address objections

## Customization

### Adding New Pages

1. Create a new directory under `app/` with a `page.js`
2. Update navigation in `src/components/Header.jsx`
3. Add footer link if needed in `src/components/Footer.jsx`

### Adding Images

Place images in `public/` and reference with absolute paths:

```jsx
<img src="/images/hero-dashboard.png" alt="Dashboard" />
```

## Build & Deployment

```bash
npm run build
```

Output is a fully static export in the `build/` directory (configured via `distDir` in `next.config.js`).

The exported files can be deployed to any static hosting:

- Vercel
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting
- GitHub Pages

### Security Headers (Static Hosting)

Because this project uses static export, production security headers are typically applied by your host/CDN (not by Next.js runtime middleware).

- For hosts that support a `_headers` file (for example Netlify/Cloudflare-style adapters), this repo includes `public/_headers` and it will be copied into `build/_headers`.
- For Nginx, add this to your TLS server block:

```nginx
add_header Strict-Transport-Security "max-age=15552000" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" always;
```

After deploy, verify with SecurityHeaders:

```bash
curl -I https://gateflux.co/
```

### Hostinger / Apache Deployment Note

If your production response headers show `server: hcdn` and `platform: hostinger`, headers must be present at origin and then propagated through Hostinger CDN.

- This repo now includes `public/.htaccess` with the required headers.
- After `npm run build`, confirm `build/.htaccess` exists, and upload it to your production document root (same level as `index.html`).
- In Hostinger hPanel, purge CDN cache after upload.

Expected response after deploy:

```bash
curl -I https://gateflux.co/
```

Should include at least:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```env
NEXT_PUBLIC_API_URL=https://api.gateflux.co
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

## License

Proprietary — GateFlux © 2025
