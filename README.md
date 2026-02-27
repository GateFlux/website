# GateFlux Marketing Website

Production-ready marketing website for GateFlux - a modern apartment and gated community management system.

## Tech Stack

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Vite 5** - Build tool and dev server
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
website/
├── public/              # Static assets
│   └── favicon.svg
├── src/
│   ├── components/      # Reusable UI components
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
│   │   ├── Layout.jsx
│   │   ├── Logo.jsx
│   │   ├── PricingCard.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── SectionHeader.jsx
│   │   └── TestimonialCard.jsx
│   ├── pages/           # Page components
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── FeaturesPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── PricingPage.jsx
│   │   └── SecurityPage.jsx
│   ├── App.jsx          # Root component with routing
│   ├── index.css        # Global styles and Tailwind directives
│   └── main.jsx         # Entry point
├── index.html           # HTML template with SEO meta tags
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Pages

1. **Homepage** (`/`) - Hero, trust badges, problem/solution, features preview, mobile apps, comparison, FAQ, CTA
2. **Features** (`/features`) - Detailed feature categories: Visitor & Security, Community, Financial, Admin Control
3. **Security** (`/security`) - Security features, compliance, infrastructure, access control
4. **Pricing** (`/pricing`) - Three pricing tiers, feature comparison, add-ons, FAQ
5. **About** (`/about`) - Company story, mission/vision, values, team, careers, press
6. **Contact** (`/contact`) - Demo booking form, contact info, enterprise section

## Design System

### Colors

- **Primary (Navy)**: `#0f172a` - Deep navy for text and dark backgrounds
- **Accent (Teal)**: `#0891b2` - Electric teal for CTAs and highlights
- **White**: Clean backgrounds and cards

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold, tight line-height, negative letter-spacing
- **Body**: Regular weight, relaxed line-height

### Components

- **Buttons**: Large, rounded (12-16px), confident styling
- **Cards**: Rounded 16px, soft shadows, subtle borders
- **Sections**: Generous padding (py-16 to py-32)

## SEO

The website includes:

- Semantic HTML structure
- Open Graph meta tags
- Twitter Card meta tags
- Schema.org structured data (SoftwareApplication)
- Proper heading hierarchy
- Accessible link text
- Fast loading (optimized build)

## Conversion Optimization

- Sticky header with CTA
- Floating "Book Demo" button (appears after scroll)
- Multiple CTAs throughout pages
- Contact form with validation
- Trust indicators (stats, badges)
- FAQ sections to address objections

## Customization

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Update navigation in `src/components/Header.jsx`
4. Add footer link if needed in `src/components/Footer.jsx`

### Changing Colors

Edit `tailwind.config.js` to modify the color palette:

```js
colors: {
  primary: { ... },
  accent: { ... },
}
```

### Adding Images

Place images in `public/` directory and reference them with absolute paths:

```jsx
<img src="/images/hero-dashboard.png" alt="Dashboard" />
```

## Deployment

### Build

```bash
npm run build
```

Output will be in the `dist/` directory.

### Deploy

The built files can be deployed to any static hosting:

- Vercel
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting
- GitHub Pages

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=https://api.gateflux.com
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

## License

Proprietary - GateFlux © 2024
