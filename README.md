# Llum Studio

A fictional high-end lighting e-commerce store built with React, TypeScript and Supabase. Inspired by [In Common With](https://incommonwith.com).

Live site: [llum-studio.vercel.app](https://llum-studio.vercel.app)

## Design Philosophy

Llum Studio was designed with a single intention: to create a calm, visually refined shopping experience that feels considered and unhurried. The interface prioritises clarity and ease — allowing users to browse, explore, and purchase without friction. Transitions between images, sections, and pages are intentionally smooth, reflecting the tactile, craft-driven nature of the products themselves. Every interaction is designed to feel human and intuitive, so the focus remains where it belongs — on the light.

## Features

- Browse 27+ lighting products across 7 collections and 6 categories
- Search products from the navbar
- Filter by category (Chandelier, Pendant, Sconce, Table Lamp, Floor Lamp) or by collection
- Light on/off toggle — simulates viewing products with lights on or off
- User authentication (sign in, sign up)
- Add to cart, update quantity, remove items
- Cart drawer accessible from any page
- Fake checkout flow with order confirmation
- Responsive design across all pages and screen sizes

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Zustand (cart + auth state)
- React Query (data fetching)
- Supabase (database + authentication)
- Vitest + React Testing Library (tests)
- React Router

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/oddnyhalldora21/llum_studio.git
cd llum_studio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root with your Supabase credentials:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Start the development server:
```bash
npm run dev
```

## Running Tests

```bash
npm test
```

All 13 tests pass across 2 test files:
- `src/store/cartStore.test.ts` — 9 cart logic tests
- `src/pages/CheckoutPage.test.ts` — 4 checkout flow tests

## Project Structure
src/
├── assets/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── CartDrawer.tsx
│       └── ScrollToTop.tsx
├── data/
│   └── collectionsData.ts
├── hooks/
│   ├── useProduct.ts
│   └── useProducts.ts
├── pages/
│   ├── HomePage.tsx
│   ├── ShopPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CollectionsPage.tsx
│   ├── CollectionDetailPage.tsx
│   ├── CheckoutPage.tsx
│   ├── OrderConfirmationPage.tsx
│   ├── AboutPage.tsx
│   └── SignInPage.tsx
├── store/
│   ├── cartStore.ts
│   └── authStore.ts
└── lib/
└── supabase.ts

## Deployment

Deployed on Vercel: [llum-studio.vercel.app](https://llum-studio.vercel.app)