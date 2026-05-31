# Llum Studio

A fictional high-end lighting e-commerce store built with React, TypeScript and Supabase. Inspired by [In Common With](https://incommonwith.com).

## Features

- Browse 40+ lighting products across 5 categories
- Search products from the navbar
- Filter by category (Chandelier, Pendant, Sconce, Table Lamp, Floor Lamp)
- Light on/off toggle — simulates viewing products with lights on or off
- User authentication (sign in, sign up)
- Add to cart, update quantity, remove items
- Fake checkout flow with order confirmation
- Responsive design

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

All 13 tests should pass across 2 test files:
- `src/store/cartStore.test.ts` — 9 cart logic tests
- `src/pages/CheckoutPage.test.ts` — 4 checkout logic tests

## Deployment

Deployed on Vercel: [coming soon]

## Project Structure
src/
├── components/
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── hooks/
│   └── useProducts.ts
├── pages/
│   ├── HomePage.tsx
│   ├── ShopPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── OrderConfirmationPage.tsx
│   └── SignInPage.tsx
├── store/
│   ├── cartStore.ts
│   └── authStore.ts
└── lib/
└── supabase.ts