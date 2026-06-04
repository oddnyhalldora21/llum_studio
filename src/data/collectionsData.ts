export type CollectionSection = {
  image: string
  text: string
}

export type Collection = {
  name: string
  slug: string
  heroImage: string
  tagline: string
  sections: CollectionSection[]
  photos?: string[]
}

export const collectionsData: Collection[] = [
  {
    name: 'Lido',
    slug: 'lido',
    heroImage: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/lido-collection-detail/Screenshot%202026-06-04%20at%2016.34.57.png',
    tagline: 'A continuation of our quest to preserve old-world craft — each piece deriving from a conceptual foundation and realized through distinct forms, materials, and craft-based engineering.',
    photos: [
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/lido-collection-detail/Screenshot%202026-06-04%20at%2016.34.40.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/lido-collection-detail/Screenshot%202026-06-04%20at%2016.34.31.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/lido-collection-detail/Screenshot%202026-06-04%20at%2016.34.20.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/lido-collection-detail/Screenshot%202026-06-04%20at%2016.34.10.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/lido-collection-detail/Screenshot%202026-06-04%20at%2016.33.53.png',
    ],
    sections: [
      {
        image: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/lido-collection-detail/Screenshot%202026-06-04%20at%2016.34.40.png',
        text: 'The Lido Series represents the coming together of two worlds. A continuation of our quest to preserve old-world craft, Lido fixtures combine classic glassmaking techniques — honed over 700 years on the storied Venetian island of Murano — with a thoroughly contemporary approach to production.',
      },
      {
        image: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/lido-collection-detail/Screenshot%202026-06-04%20at%2016.34.31.png',
        text: 'As with all of our handmade lighting, each fixture is one-of-a-kind, showcasing unrepeatable patterns and material irregularities as varied as grains of sand. Rich in color that deepens when illuminated, the series\'s kaleidoscopic surfaces represent the vitality of a craft-based tradition.',
      },
      {
        image: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/lido-collection-detail/Screenshot%202026-06-04%20at%2016.34.20.png',
        text: 'Available in a range of finishes and forms, the series is designed to adapt to commercial or residential spaces of all styles and scales. True to its name — lido translates from Italian to "shore" — the series embodies fluidity: order merging with intuition, familiar structures reimagined with time.',
      },
    ],
  },
  {
    name: 'Saga',
    slug: 'saga',
    heroImage:       'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/saga-collection-detail/Screenshot%202026-06-04%20at%2016.38.05.png',
    tagline: 'An expansive take on traditional task lighting. Made up of three modular shapes for endless adaptability, Saga delivers a satisfying sense of order, without a hint of sameness.',
    photos: [
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/saga-collection-detail/Screenshot%202026-06-04%20at%2016.38.35.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/saga-collection-detail/Screenshot%202026-06-04%20at%2016.38.47.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/saga-collection-detail/Screenshot%202026-06-04%20at%2016.38.27.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/saga-collection-detail/Screenshot%202026-06-04%20at%2016.37.48.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/saga-collection-detail/Screenshot%202026-06-04%20at%2016.37.38.png',
    ],
    sections: [
      {
        image: '',
        text: 'A study in inventive design, the Saga Collection offers an expansive take on traditional task lighting. Each light incorporates low-waste aluminum and recycled LDPE diffusers, while their fluted edges and capsule shape impart an architectural presence. Functional but warm, and subtly ornamental, they fit as naturally in living spaces as they do in workplaces.',
      },
      {
        image: '',
        text: 'Saga\'s standout feature lies in its infinitely configurable framework. Comprised of three modular shapes, each available in a range of sizes and finishes, it can be configured to fit any space and context. Long or short, straight or squiggled, Saga makes a simple but striking impression at every scale.',
      },
    ],
  },
  {
    name: 'Flora',
    slug: 'flora',
    heroImage: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/flora-collection-detail/Screenshot%202026-06-04%20at%2016.42.44.png',
    tagline: 'A collaboration between Llum Studio and designer Sophie Lou Jacobsen, the Flora Collection uses classic Venetian glassmaking techniques to honor the ephemeral beauty of a world in bloom.',
    photos: [
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/flora-collection-detail/Screenshot%202026-06-04%20at%2016.42.36.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/flora-collection-detail/Screenshot%202026-06-04%20at%2016.42.26.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/flora-collection-detail/Screenshot%202026-06-04%20at%2016.42.16.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/flora-collection-detail/Screenshot%202026-06-04%20at%2016.41.53.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/flora-collection-detail/Screenshot%202026-06-04%20at%2016.41.46.png',
    ],
    sections: [
      {
        image: '',
        text: 'The collection features hand-blown, mold-blown, and slumped glass fixtures that meld old-world craftsmanship with a contemporary sensibility. The key to Flora\'s most theatrical forms is fazzoletto, a 2nd-century technique repopularized by glass artists like Paolo Venini in 20th-century Venice.',
      },
      {
        image: '',
        text: 'With its romantic silhouettes, available in a spectrum of colors and arrangements, the Flora Collection is a design ecosystem rooted in organic variation. Like the flowers after which they\'re modeled, no two pieces will ever be the same.',
      },
    ],
  },
  {
    name: 'Core',
    slug: 'core',
    heroImage: 'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/cure-collection-detail/Screenshot%202026-06-04%20at%2016.44.53.png',
    tagline: 'The truest essence of our design philosophy. With interchangeable components and the ability to mix and match, each Core series fixture uses related expressions to make its own enduring statement.',
    photos: [
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/cure-collection-detail/Screenshot%202026-06-04%20at%2016.45.41.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/cure-collection-detail/Screenshot%202026-06-04%20at%2016.45.24.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/cure-collection-detail/Screenshot%202026-06-04%20at%2016.45.11.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/cure-collection-detail/Screenshot%202026-06-04%20at%2016.45.02.png',
      'https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/collectionDetail-photos/cure-collection-detail/Screenshot%202026-06-04%20at%2016.44.40.png',
    ],
    sections: [
      {
        image: '',
        text: 'Core is a foundational collection that captures the essence of our design philosophy. It encompasses eight lighting series, each exploring form and modularity in its own way. Inspired by the philosophies and geometries of industrial modernism, the fixtures offer an uncompromised combination of elegance and adaptability.',
      },
      {
        image: '',
        text: 'Years ago, we likened this systems-based approach to the mechanics of a language, wherein each series reinterprets the same design vernacular to a different effect. In its many permutations, Core articulates the infinite possibility in a shared vocabulary.',
      },
    ],
  },
  {
    name: 'Dune',
    slug: 'dune',
    heroImage: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tagline: '',
    sections: [],
  },
  {
    name: 'Strata',
    slug: 'strata',
    heroImage: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tagline: '',
    sections: [],
  },
  {
    name: 'Terra',
    slug: 'terra',
    heroImage: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tagline: '',
    sections: [],
  },
]