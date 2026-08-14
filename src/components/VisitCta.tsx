import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";

const VisitCta = () => {
  return (
    <section className="relative section-padding bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center relative">
        <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-gold-light mb-6">
          Visit Our Showroom
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-light leading-tight mb-8">
          Step into a century of <span className="italic text-gold">craftsmanship</span>
        </h2>
        <div className="section-divider mb-10" />
        <p className="font-body text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-10 max-w-2xl mx-auto">
          Experience our collection in person at Chhatrapati Sambhaji Maharaj Chowk,
          Ichalkaranji. We'd love to share the stories behind every piece.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
          <a
            href="tel:+919999999999"
            className="flex items-center gap-3 font-accent text-sm tracking-[0.2em] uppercase text-gold-light hover:text-primary-foreground transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
          <span className="hidden sm:block w-px h-6 bg-gold-light/30" />
          <a
            href="https://maps.google.com/?q=Chhatrapati+Sambhaji+Maharaj+Chowk+Ichalkaranji"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-accent text-sm tracking-[0.2em] uppercase text-gold-light hover:text-primary-foreground transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Get Directions
          </a>
        </div>

        <Link
          to="/contact"
          className="inline-block bg-gold text-foreground font-accent text-sm tracking-[0.3em] uppercase px-12 py-4 hover:bg-gold-dark transition-colors"
        >
          Plan Your Visit
        </Link>
      </div>
    </section>
  );
};

export default VisitCta;
