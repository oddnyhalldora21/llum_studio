function AboutPage() {
  return (
    <div style={{ backgroundColor: '#e8e0d8' }}>

      {/* Hero image */}
      <section className="relative h-screen w-full overflow-hidden -mt-14">
        <img
          src="https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/about_us_photos/hero-about-us-photo.png"
          alt="Llum Studio workshop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <p className="text-center text-lg md:text-2xl font-light leading-relaxed max-w-2xl" style={{ color: '#e8e0d8' }}>
            Llum Studio is a design studio defining a new vocabulary for interiors, in which old-world craft meets at-scale manufacturing.
          </p>
        </div>
      </section>

      {/* Intro text */}
      <section className="px-8 py-12 md:py-20 max-w-5xl">
        <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#5c1a1a' }}>
          Llum Studio is a design studio defining a new vocabulary for interiors, in which old-world craft meets at-scale manufacturing. Founded in 2018 by Elena Voss and Marc Solà, our practice transforms the familiar by bringing endless curiosity, exceptional materials, and unparalleled adaptability to lighting and objects for all spaces.
        </p>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: '#5c1a1a' }}>
          We approach design as an interplay: between tradition and modernity, control and spontaneity, uniformity and variation. With our team of expert craftspeople, artists, and engineers around the world, we explore materials and ideas with rigorous care and hone them to their most effective and compelling conclusions.
        </p>
      </section>

      {/* Two photos */}
      <section className="flex flex-col md:flex-row px-8 gap-4 mb-4">
        <div className="flex-1 overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <img src="https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/about_us_photos/founders-photo.png" alt="Founders" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <img src="https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/about_us_photos/flora-chandelier.png" alt="Flora Chandelier" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Captions */}
      <section className="flex flex-col md:flex-row px-8 gap-4 mb-12 md:mb-20">
        <div className="flex-1 flex gap-8">
          <span className="text-xs" style={{ color: '#5c1a1a' }}>Fig. 1</span>
          <span className="text-xs" style={{ color: '#5c1a1a' }}>Founders Elena Voss and Marc Solà</span>
        </div>
        <div className="flex-1 flex gap-8">
          <span className="text-xs" style={{ color: '#5c1a1a' }}>Fig. 2</span>
          <span className="text-xs" style={{ color: '#5c1a1a' }}>A trio of Flora Chandeliers in the dining room</span>
        </div>
      </section>

      {/* Body text */}
      <section className="px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-20">
        <div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#5c1a1a' }}>
            Elena and Marc's respect for craft and materials extends back as far as their upbringings, and, later, to their training as craftspeople working with wood, metal, ceramics, and glass.
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#5c1a1a' }}>
            Today, this perspective — combined with incessant curiosity — guides our company's collective approach to making. We aim to embrace each material's natural tendencies, letting its innate characteristics influence the forms it ultimately takes. From there, we begin the process of refining, down to the smallest, simplest, and most delightfully surprising details: dimmer switches disguised as decorative flourishes, colors that shift with the flick of a switch.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#5c1a1a' }}>
            In special cases, we've partnered with like-minded peers to create entire collections that represent a shared creative vision and explore our chosen mediums further.
          </p>
        </div>
        <div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#5c1a1a' }}>
            We're fortunate to work with a growing circle of expert craftspeople, artists, and engineers around the world, who play an essential role in bringing our designs to life. Every relationship we've forged is a true partnership, with each person coaxing pieces to their most effective and exquisite conclusion.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#5c1a1a' }}>
            Our own backgrounds in making allow us to take an especially hands-on approach to these partnerships, working alongside collaborators to fine-tune our design and production processes over time.
          </p>
        </div>
      </section>

      {/* Three craft photos */}
      <section className="flex flex-col md:flex-row px-8 gap-4 mb-4">
        <div className="flex-1 overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <img src="https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/about_us_photos/clay-bowl.png" alt="Clay bowl" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <img src="https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/about_us_photos/glass-burning-oven.png" alt="Glass in oven" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <img src="https://ummgqxuzxnmltylxggvq.supabase.co/storage/v1/object/public/llum-studio/about_us_photos/clay-stensil.png" alt="Clay stencil" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Captions row 2 */}
      <section className="flex flex-col md:flex-row px-8 gap-4 mb-12 md:mb-20">
        <div className="flex-1 flex gap-8">
          <span className="text-xs" style={{ color: '#5c1a1a' }}>Fig. 3</span>
          <span className="text-xs" style={{ color: '#5c1a1a' }}>A ceramic shade curing after being shaped</span>
        </div>
        <div className="flex-1 flex gap-8">
          <span className="text-xs" style={{ color: '#5c1a1a' }}>Fig. 4</span>
          <span className="text-xs" style={{ color: '#5c1a1a' }}>A glass shade being heated after fusing</span>
        </div>
        <div className="flex-1 flex gap-8">
          <span className="text-xs" style={{ color: '#5c1a1a' }}>Fig. 5</span>
          <span className="text-xs" style={{ color: '#5c1a1a' }}>Detail of a ceramic mould</span>
        </div>
      </section>

      {/* Contact section */}
      <section className="mx-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 border-t" style={{ borderColor: '#5c1a1a' }}>
        <p className="text-sm leading-relaxed" style={{ color: '#5c1a1a' }}>
          Whether you have a question about an order, a product, or would like more information about what we do, we'd love to hear from you.
        </p>
        <div className="flex flex-wrap gap-6 md:gap-8">
          {['General Inquiries', 'Telephone', 'Instagram'].map(item => (
            <a key={item} href="#" className="text-sm hover:opacity-60 transition-opacity" style={{ color: '#5c1a1a' }}>{item}</a>
          ))}
        </div>
      </section>

    </div>
  )
}

export default AboutPage