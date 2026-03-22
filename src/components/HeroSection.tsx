import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-jewelry.jpg";
import logoImg from "@/assets/logo.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Traditional Gold Jewelry by Tuljaram Saraf" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <img src={logoImg} alt="Tuljaram Saraf Logo" className="mx-auto h-24 md:h-32 mb-6 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }} />
        <p className="font-accent text-sm md:text-base tracking-[0.4em] uppercase text-gold-light mb-6 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
          Since 1911 • Ichalkaranji
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}>
          Tuljaram Saraf
        </h1>
        <div className="section-divider mb-6 animate-fade-in" style={{ animationDelay: '0.6s', opacity: 0 }} />
        <p className="font-display text-lg md:text-2xl italic text-gold-light mb-4 animate-fade-in" style={{ animationDelay: '0.8s', opacity: 0 }}>
          परंपरा • विश्वास • उत्कृष्टता
        </p>
        <p className="font-body text-base md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '1s', opacity: 0 }}>
          A trusted name in fine jewelry — Gold, Diamond, Kundan, Polki, Jadau, Pearl, Real Stones & Light Weight collections — serving the families of Ichalkaranji with heritage, purity, and timeless craftsmanship.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '1.2s', opacity: 0 }}>
          <Link to="/collection" className="gold-gradient text-foreground font-accent text-sm tracking-widest uppercase px-8 py-4 hover:opacity-90 transition-opacity">
            View Collection
          </Link>
          <Link to="/visit" className="border border-gold text-gold-light font-accent text-sm tracking-widest uppercase px-8 py-4 hover:bg-gold/10 transition-colors">
            Visit Our Store
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
