import Layout from "@/components/Layout";
import heritageImg from "@/assets/heritage-1911.jpg";
import shopImg from "@/assets/shop-interior.jpg";
import craftImg from "@/assets/craft-hands.jpg";
import bridalImg from "@/assets/model-traditional.jpg";

const chapters = [
  {
    eyebrow: "1911 · The Foundation",
    title: "A Dream Takes Shape",
    body: "Tuljaram Saraf was founded in 1911 at Chhatrapati Sambhaji Maharaj Chowk, Ichalkaranji — born from a simple promise: to bring families the purest gold and the most heartfelt craftsmanship. From a single counter, a legacy began.",
    image: heritageImg,
  },
  {
    eyebrow: "Growth · Earning Trust",
    title: "Earning a Community's Trust",
    body: "As the decades passed, word spread of our hallmarked purity and meticulous craftsmanship. Families chose Tuljaram Saraf for the most sacred occasions — first mangalsutras, bridal trousseaus, festivals, and the quiet moments in between.",
    image: shopImg,
  },
  {
    eyebrow: "Craft · Karigari",
    title: "Generations of Karigari",
    body: "Our master karigars — many trained by their fathers and grandfathers — bring centuries-old techniques to every piece. From hand-carved wax models to delicate kundan setting, every step is a quiet act of devotion.",
    image: craftImg,
  },
  {
    eyebrow: "Today · Modern Yet Rooted",
    title: "A Legacy That Lives On",
    body: "Today, Tuljaram Saraf offers a curated world of gold, diamond, kundan, polki, jadau, pearl, real-stone and lightweight everyday jewellery — blending timeless Maharashtrian heritage with contemporary elegance, for the women of every new generation.",
    image: bridalImg,
  },
];

const OurStoryPage = () => {
  return (
    <Layout>
      <section className="section-padding bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <p className="font-accent text-sm tracking-[0.3em] uppercase text-secondary mb-4">
              Heritage · Since 1911
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-primary mb-6">
              Our <span className="italic gold-text">Story</span>
            </h1>
            <div className="section-divider mb-6" />
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A journey of trust, tradition, and timeless artistry — over a century in the
              making, in the heart of Ichalkaranji.
            </p>
          </div>

          <div className="space-y-20 md:space-y-32">
            {chapters.map((c, i) => (
              <article
                key={c.title}
                className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-accent text-xs tracking-[0.4em] uppercase text-secondary mb-4">
                    {c.eyebrow}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary font-light leading-tight mb-6">
                    {c.title}
                  </h2>
                  <div className="w-16 h-px bg-gold mb-6" />
                  <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OurStoryPage;
