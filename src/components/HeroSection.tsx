import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-bride-editorial.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative h-[75vh] min-h-[75vh] flex items-center overflow-hidden bg-foreground"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Tuljaram Saraf bridal jewellery editorial"
          className="w-full h-full object-cover object-center scale-105 motion-safe:animate-[fade-in_2s_ease-out]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto max-w-7xl px-6 md:px-12">
          <div className="max-w-2xl text-primary-foreground">
            <p
              className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-gold-light mb-6 animate-fade-in"
              style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
            >
              Tuljaram Saraf · Since 1911
            </p>
            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-8 animate-fade-in"
              style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
            >
              Every piece tells
              <br />
              a <span className="italic font-normal gold-text">story</span> —
              <br />
              make one yours.
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-gold-light/90 not-italic">115 years. Crafted. Trusted. Yours.</span>
            </h1>
            <p
              className="font-body text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-10 max-w-xl animate-fade-in"
              style={{ animationDelay: "0.7s", opacity: 0, animationFillMode: "forwards" }}
            >
              More than jewellery — a statement of you. Crafted at Chhatrapati Sambhaji
              Maharaj Chowk, Ichalkaranji, for over a century.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in"
              style={{ animationDelay: "1s", opacity: 0, animationFillMode: "forwards" }}
            >
              <Link
                to="/collection"
                className="bg-gold text-foreground font-accent text-sm tracking-[0.25em] uppercase px-10 py-4 hover:bg-gold-dark transition-colors text-center"
              >
                Explore Collection
              </Link>
              <Link
                to="/our-story"
                className="border border-gold-light/70 text-gold-light font-accent text-sm tracking-[0.25em] uppercase px-10 py-4 hover:bg-gold/10 transition-colors text-center"
              >
                Our Heritage
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gold-light/80">
          <span className="block w-px h-10 bg-gradient-to-b from-gold-light/80 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
