import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground section-padding pb-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold gold-text mb-4">Tuljaram Saraf</h3>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed mb-4">
              Since 1911 · Ichalkaranji
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors">
                <Instagram size={18} className="text-gold" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors">
                <Facebook size={18} className="text-gold" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Home", to: "/" },
                { label: "Our Story", to: "/our-story" },
                { label: "Collection", to: "/collection" },
                { label: "Craftsmanship", to: "/craftsmanship" },
                { label: "Visit Us", to: "/visit" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="font-body text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-4">Contact Us</h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <MapPin size={16} className="text-gold mt-1 shrink-0" />
                <p className="font-body text-sm text-primary-foreground/60">
                  "Suprabhat", Chhatrapati Sambhaji Maharaj Chowk, Ichalkaranji, Maharashtra – 416115
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={16} className="text-gold shrink-0" />
                <a href="tel:+917588267387" className="font-body text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                  75882 67387
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center space-y-2">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Tuljaram Saraf Jewellers, Ichalkaranji. All rights reserved.
          </p>
          <p className="font-accent text-xs tracking-[0.3em] uppercase text-gold/70">
            Website made by Social Stage
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
