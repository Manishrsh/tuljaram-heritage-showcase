import { Link } from "react-router-dom";
import luvicaImg from "@/assets/luvica-sparkle.jpg";
import polkiImg from "@/assets/collection-polki.jpg";

const LuvicaSection = () => {
  return (
    <section className="relative bg-foreground text-primary-foreground overflow-hidden">
      {/* decorative gradient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gold blur-[160px]" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary blur-[160px]" />
      </div>

      <div className="container mx-auto max-w-7xl section-padding relative">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={polkiImg}
                alt="Luvica by Tuljaram Saraf — diamond and kundan jewellery"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <img
              src={luvicaImg}
              alt=""
              aria-hidden="true"
              className="absolute -top-8 -right-6 w-24 md:w-32 opacity-90"
              loading="lazy"
            />
          </div>

          <div>
            <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-gold-light mb-6">
              Luvica · By Tuljaram Saraf
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
              Unveiling <span className="italic gold-text">Elegance</span> ✨
            </h2>
            <div className="w-16 h-px bg-gold mb-8" />

            <p className="font-body text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-6">
              Crafted in diamonds, pearls, kundan, and fine stones —{" "}
              <em className="text-gold-light">Luvica</em> blends timeless tradition with
              modern grace.
            </p>
            <p className="font-display italic text-xl md:text-2xl text-gold-light mb-10">
              "Designs so unique, your heart will whisper… this is just the beginning."
            </p>

            <Link
              to="/collection"
              className="inline-block bg-gold text-foreground font-accent text-sm tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold-dark transition-colors"
            >
              Discover Luvica
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuvicaSection;
