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
  }
  
  export const collectionsData: Collection[] = [
    {
      name: 'Lido',
      slug: 'lido',
      heroImage: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1600',
      tagline: 'A continuation of our quest to preserve old-world craft — each piece deriving from a conceptual foundation and realized through distinct forms, materials, and craft-based engineering.',
      sections: [
        {
          image: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=1200',
          text: 'The Lido Series represents the coming together of two worlds. A continuation of our quest to preserve old-world craft, Lido fixtures combine classic glassmaking techniques — honed over 700 years on the storied Venetian island of Murano — with a thoroughly contemporary approach to production.',
        },
        {
          image: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=1200',
          text: 'As with all of our handmade lighting, each fixture is one-of-a-kind, showcasing unrepeatable patterns and material irregularities as varied as grains of sand. Rich in color that deepens when illuminated, the series\'s kaleidoscopic surfaces represent the vitality of a craft-based tradition.',
        },
        {
          image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1200',
          text: 'Available in a range of finishes and forms, the series is designed to adapt to commercial or residential spaces of all styles and scales. True to its name — lido translates from Italian to "shore" — the series embodies fluidity: order merging with intuition, familiar structures reimagined with time.',
        },
      ],
    },

    {
        name: 'Saga',
        slug: 'saga',
        heroImage: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=1600',
        tagline: '',
        sections: [],
      },
      {
        name: 'Flora',
        slug: 'flora',
        heroImage: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=1600',
        tagline: '',
        sections: [],
      },
      {
        name: 'Core',
        slug: 'core',
        heroImage: 'https://images.pexels.com/photos/6489103/pexels-photo-6489103.jpeg?auto=compress&cs=tinysrgb&w=1600',
        tagline: '',
        sections: [],
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
    // more collections coming soon
  ]