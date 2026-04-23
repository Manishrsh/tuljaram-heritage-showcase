import { Link } from "react-router-dom";
import bridalImg from "@/assets/bridal-necklace.jpg";
import polkiImg from "@/assets/collection-polki.jpg";
import traditionalImg from "@/assets/collection-traditional.jpg";
import diamondImg from "@/assets/collection-diamond.jpg";

const collections = [
  {
    name: "Anaya",
    tagline: "Bridal Heritage",
    description:
      "Be the bride of your dreams adorned in a masterpiece carrying generations of grace. Crafted in the finest gold with exquisite kundan and pearls, Anaya celebrates the bride within you — rooted in tradition, dressed in dreams.",
    image: bridalImg,
  },
  {
    name: "Rajashree",
    tagline: "Maharashtra's Pride",
    description:
      "A regal homage to Maharashtra's timeless splendour. Three intricate layers of pure gold, each celebrating the bride you dreamt of becoming — proudly rooted in the history and legacy of the land.",
    image: traditionalImg,
  },
  {
    name: "Heera",
    tagline: "Modern Diamond",
    description:
      "Where contemporary brilliance meets heritage craftsmanship. Heera's solitaire stories are crafted for the woman who wears her elegance every day — refined, radiant, effortlessly hers.",
    image: diamondImg,
  },
  {
    name: "Mehfil",
    tagline: "Polki & Kundan",
    description:
      "Festive jewels inspired by old-world durbars. Uncut polki, lustrous kundan and delicate pearls come together in pieces that feel as poetic as the occasions they celebrate.",
    image: polkiImg,
  },
];

const SignatureCollections = () => {
  return (
    <section className="bg-cream-dark/40">
      <div className="container mx-auto max-w-7xl section-padding">
        <div className="text-center mb-16">
          <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-secondary mb-4">
            Signature Collections
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary leading-tight">
            Every jewel tells a story,
            <br />
            <span className="italic gold-text">which one will you choose?</span>
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div className="space-y-20 md:space-y-32">
          {collections.map((c, i) => (
            <article
              key={c.name}
              className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="gallery-item overflow-hidden bg-foreground/5">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={c.image}
                    alt={`${c.name} collection by Tuljaram Saraf`}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="px-2 md:px-6">
                <p className="font-accent text-xs tracking-[0.4em] uppercase text-secondary mb-4">
                  {c.tagline}
                </p>
                <h3 className="font-display text-3xl md:text-5xl text-primary mb-6 italic font-light">
                  '{c.name}' <span className="not-italic font-normal text-foreground/70 text-2xl md:text-3xl">by Tuljaram Saraf</span>
                </h3>
                <div className="w-16 h-px bg-gold mb-6" />
                <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                  {c.description}
                </p>
                <Link
                  to="/collection"
                  className="inline-block font-accent text-sm tracking-[0.3em] uppercase text-primary border-b border-gold pb-1 hover:text-gold-dark transition-colors"
                >
                  Discover the Collection
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureCollections;
