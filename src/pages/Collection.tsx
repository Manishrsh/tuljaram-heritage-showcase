import Layout from "@/components/Layout";
import bridalImg from "@/assets/bridal-necklace.jpg";
import diamondImg from "@/assets/collection-diamond.jpg";
import polkiImg from "@/assets/collection-polki.jpg";
import traditionalImg from "@/assets/collection-traditional.jpg";
import pearlImg from "@/assets/collection-pearl.jpg";
import mangalsutraImg from "@/assets/mangalsutra.jpg";
import banglesImg from "@/assets/bangles.jpg";
import necklaceImg from "@/assets/necklace.jpg";
import lifestyleImg from "@/assets/lifestyle-modern.jpg";

type Item = { image: string; title: string; subtitle: string };

const sections: { id: string; eyebrow: string; title: string; description: string; items: Item[] }[] = [
  {
    id: "bridal",
    eyebrow: "For Your Special Day",
    title: "Bridal Jewellery",
    description:
      "Curated bridal sets in fine gold, kundan, polki and diamonds — heirlooms designed to be worn, treasured, and one day passed on.",
    items: [
      { image: bridalImg, title: "Anaya Bridal Set", subtitle: "Gold · Kundan · Pearl" },
      { image: polkiImg, title: "Mehfil Polki Choker", subtitle: "Polki · Uncut Diamond" },
      { image: traditionalImg, title: "Rajashree Bridal", subtitle: "Maharashtrian Heritage" },
    ],
  },
  {
    id: "mangalsutra",
    eyebrow: "Sacred Bond",
    title: "Mangalsutra",
    description:
      "From classic black-bead heritage designs to modern minimalist pendants — mangalsutras for every bride, every story.",
    items: [
      { image: mangalsutraImg, title: "Heritage Mangalsutra", subtitle: "Traditional Gold" },
      { image: diamondImg, title: "Diamond Mangalsutra", subtitle: "Modern Minimal" },
      { image: necklaceImg, title: "Layered Mangalsutra", subtitle: "Contemporary Edit" },
    ],
  },
  {
    id: "diamond",
    eyebrow: "Brilliance",
    title: "Diamond Jewellery",
    description:
      "Solitaires, tennis bracelets, diamond chokers and everyday studs — radiant pieces for the woman who shines, every single day.",
    items: [
      { image: diamondImg, title: "Heera Solitaire", subtitle: "Certified Diamond" },
      { image: necklaceImg, title: "Diamond Necklace", subtitle: "Statement Piece" },
      { image: banglesImg, title: "Diamond Bracelet", subtitle: "Everyday Sparkle" },
    ],
  },
  {
    id: "kundan-polki",
    eyebrow: "Old-World Elegance",
    title: "Kundan, Polki & Jadau",
    description:
      "Festive jewels inspired by old-world durbars — uncut polki, lustrous kundan and intricate jadau craftsmanship.",
    items: [
      { image: polkiImg, title: "Polki Choker", subtitle: "Uncut Diamond" },
      { image: bridalImg, title: "Kundan Long Set", subtitle: "Bridal Statement" },
      { image: pearlImg, title: "Jadau Earrings", subtitle: "Heritage Craft" },
    ],
  },
  {
    id: "maharashtrian",
    eyebrow: "Heritage of Maharashtra",
    title: "Maharashtrian Traditional",
    description:
      "Iconic Thushi, Kolhapuri Saaj, Bormaal, Nath and temple jewellery — crafted in pure gold with intricate hand-detailing.",
    items: [
      { image: traditionalImg, title: "Kolhapuri Saaj", subtitle: "Classic Maharashtrian" },
      { image: pearlImg, title: "Nath", subtitle: "The Maharashtrian Bride" },
      { image: mangalsutraImg, title: "Thushi", subtitle: "Pure Gold Heritage" },
    ],
  },
  {
    id: "pearl",
    eyebrow: "Quiet Luxury",
    title: "Pearl & Real Stones",
    description:
      "Pearl-strung haars, ruby and emerald sets, and real-stone earrings — softness, colour and timeless grace.",
    items: [
      { image: pearlImg, title: "Pearl Haar", subtitle: "South Sea Pearl" },
      { image: necklaceImg, title: "Ruby & Emerald Set", subtitle: "Real Stones" },
      { image: bridalImg, title: "Pearl Drop Earrings", subtitle: "Everyday Elegance" },
    ],
  },
  {
    id: "bangles",
    eyebrow: "Circle of Tradition",
    title: "Bangles & Bracelets",
    description:
      "Pure gold bangles, diamond tennis bracelets, kada and dainty everyday stacks — pieces that move with you.",
    items: [
      { image: banglesImg, title: "Gold Bangles", subtitle: "Pure 22kt" },
      { image: diamondImg, title: "Diamond Tennis", subtitle: "Bracelet" },
      { image: necklaceImg, title: "Kada", subtitle: "Statement Bangle" },
    ],
  },
  {
    id: "daily-wear",
    eyebrow: "Lightweight Luxe",
    title: "Daily Wear",
    description:
      "Effortless lightweight gold and diamond jewellery designed for everyday — refined enough for work, elegant for evenings.",
    items: [
      { image: lifestyleImg, title: "Daily Studs", subtitle: "Lightweight Diamond" },
      { image: necklaceImg, title: "Office Pendant", subtitle: "Minimal Gold" },
      { image: banglesImg, title: "Stacking Bangles", subtitle: "Everyday Edit" },
    ],
  },
];

const CollectionPage = () => {
  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="font-accent text-sm tracking-[0.3em] uppercase text-secondary mb-4">
              Exquisite
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-primary mb-6">
              Our <span className="italic gold-text">Collection</span>
            </h1>
            <div className="section-divider mb-6" />
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              From bridal heirlooms to everyday lightweight pieces — gold, diamond, kundan,
              polki, pearl and Maharashtrian traditional jewellery, all under one roof.
            </p>
          </div>

          {/* Quick category links */}
          <nav className="flex flex-wrap justify-center gap-3 md:gap-4 mb-20">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-accent text-xs tracking-[0.3em] uppercase text-foreground/70 border border-gold/30 px-4 py-2 hover:bg-gold/10 hover:text-foreground transition-colors"
              >
                {s.title}
              </a>
            ))}
          </nav>

          <div className="space-y-24 md:space-y-32">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <div className="text-center mb-10">
                  <p className="font-accent text-xs tracking-[0.4em] uppercase text-secondary mb-3">
                    {s.eyebrow}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl text-primary font-light mb-4">
                    {s.title}
                  </h2>
                  <div className="w-16 h-px bg-gold mx-auto mb-5" />
                  <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                    {s.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {s.items.map((item) => (
                    <article key={item.title} className="gallery-item group rounded-sm">
                      <div className="relative overflow-hidden aspect-[4/5]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <h3 className="font-display text-lg text-primary-foreground">
                            {item.title}
                          </h3>
                          <p className="font-accent text-xs tracking-wider text-gold-light mt-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CollectionPage;
