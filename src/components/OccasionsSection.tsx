import { Link } from "react-router-dom";
import weddingImg from "@/assets/wedding-couple.jpg";
import lifestyleImg from "@/assets/lifestyle-modern.jpg";

const occasions = [
  {
    title: "Weddings",
    blurb:
      "From the matha patti to the mangalsutra, every moment of your saat phere deserves an heirloom that lives on for generations.",
    image: weddingImg,
    cta: "Bridal Studio",
  },
  {
    title: "Everyday",
    blurb:
      "Lightweight chains, diamond solitaires and pearl drops — designed for the woman who wears her elegance to work, brunch and beyond.",
    image: lifestyleImg,
    cta: "Daily Edit",
  },
];

const OccasionsSection = () => {
  return (
    <section className="section-padding bg-cream-dark/40">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-secondary mb-4">
            For Every Occasion
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary leading-tight">
            Jewellery for the moments
            <br />
            <span className="italic gold-text">you'll always remember</span>
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {occasions.map((o) => (
            <article key={o.title} className="group relative overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={o.image}
                  alt={o.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-primary-foreground">
                <h3 className="font-display text-3xl md:text-4xl mb-4">{o.title}</h3>
                <p className="font-body text-base md:text-lg text-primary-foreground/85 mb-6 max-w-md leading-relaxed">
                  {o.blurb}
                </p>
                <Link
                  to="/collection"
                  className="inline-block font-accent text-xs tracking-[0.3em] uppercase text-gold-light border-b border-gold pb-1 hover:text-primary-foreground transition-colors"
                >
                  {o.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionsSection;
