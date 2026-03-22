import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Our Story", to: "/our-story" },
  { label: "Collection", to: "/collection" },
  { label: "Craftsmanship", to: "/craftsmanship" },
  { label: "Our Store", to: "/store" },
  { label: "Trust", to: "/trust" },
  { label: "Visit Us", to: "/visit" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-2 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Tuljaram Saraf Logo" className="h-10 md:h-12" />
          <span className="font-display text-xl md:text-2xl font-bold text-primary tracking-wide">Tuljaram Saraf</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-accent text-xs tracking-widest uppercase transition-colors duration-300 ${
                location.pathname === link.to ? "text-primary font-semibold" : "text-foreground/80 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <div className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`font-accent text-sm tracking-widest uppercase transition-colors ${
                  location.pathname === link.to ? "text-primary font-semibold" : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
