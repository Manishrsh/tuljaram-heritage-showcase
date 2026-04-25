import { Link } from "react-router-dom";
import bridalImg from "@/assets/bridal-necklace.jpg";
import polkiImg from "@/assets/collection-polki.jpg";
import traditionalImg from "@/assets/collection-traditional.jpg";
import diamondImg from "@/assets/collection-diamond.jpg";
import pearlImg from "@/assets/collection-pearl.jpg";
import mangalsutraImg from "@/assets/mangalsutra.jpg";
import banglesImg from "@/assets/bangles.jpg";
import necklaceImg from "@/assets/necklace.jpg";
import lifestyleImg from "@/assets/lifestyle-modern.jpg";

const collections = [
  {
    name: "Heera",
    tagline: "Diamond",
    description:
      "Where contemporary brilliance meets heritage craftsmanship — solitaire stories for the woman who wears her elegance every day.",
    image: diamondImg,
  },
  {
    name: "Mehfil",
    tagline: "Kundan & Polki",
    description:
      "Festive jewels inspired by old-world durbars. Uncut polki, lustrous kundan and delicate pearls in pieces as poetic as the occasions they celebrate.",
    image: polkiImg,
  },
  {
    name: "Rajashree",
    tagline: "Maharashtrian Heritage",
    description:
      "A regal homage to Maharashtra's timeless splendour — Thushi, Kolhapuri Saaj, Bormaal and more, crafted in pure gold with intricate hand-detailing.",
    image: traditionalImg,
  },
  {
    name: "Anaya",
    tagline: "Bridal Heritage",
    description:
      "Be the bride of your dreams adorned in a masterpiece — finest gold with exquisite kundan and pearls, rooted in tradition, dressed in dreams.",
    image: bridalImg,
  },
  {
    name: "Mangalsutra",
    tagline: "Sacred Bond",
    description:
      "From classic black-bead heritage designs to modern minimalist styles — mangalsutras to be worn every day, treasured a lifetime.",
    image: mangalsutraImg,
  },
  {
    name: "Nath & Traditional Sets",
    tagline: "The Maharashtrian Bride",
    description:
      "Iconic Maharashtrian Nath, paired with intricate temple-style necklaces and earrings — designed for the truly traditional bride.",
    image: pearlImg,
  },
  {
    name: "Bangles & Bracelets",
    tagline: "Everyday Grace",
    description:
      "Pure gold bangles, diamond tennis bracelets and dainty everyday stacks — pieces that move with you, beautifully.",
    image: banglesImg,
  },
  {
    name: "Daily Wear",
    tagline: "Lightweight Luxe",
    description:
      "Effortless lightweight gold and diamond jewellery designed for everyday — refined enough for work, elegant enough for evenings.",
    image: lifestyleImg,
  },
  {
    name: "Signature Necklaces",
    tagline: "Statement Pieces",
    description:
      "From minimalist diamond pendants to elaborate jadau chokers — each necklace a curated piece of our atelier's craftsmanship.",
    image: necklaceImg,
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
