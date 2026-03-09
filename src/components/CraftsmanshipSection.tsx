import craftsmanshipImg from "@/assets/craftsmanship.jpg";
import { Gem, Shield, Award, Heart } from "lucide-react";

const features = [
  { icon: Gem, title: "Handcrafted Artistry", description: "Every ornament is meticulously handcrafted by skilled artisans preserving centuries-old Maharashtrian techniques." },
  { icon: Shield, title: "BIS Hallmarked", description: "100% certified purity with BIS hallmarking on every piece of gold jewelry we sell." },
  { icon: Award, title: "Heritage Designs", description: "Authentic Maharashtrian patterns — from Thushi to Kolhapuri Saaj — honoring cultural traditions." },
  { icon: Heart, title: "Made with Devotion", description: "Each creation carries the love and dedication of artisans who treat their craft as worship." },
];

const CraftsmanshipSection = () => {
  return (
    <section id="craftsmanship" className="relative overflow-hidden">
      {/* Full background image */}
      <div className="absolute inset-0">
        <img src={craftsmanshipImg} alt="Gold jewelry craftsmanship" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/80" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="font-accent text-sm tracking-[0.3em] uppercase text-gold-light mb-4">Artistry</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">Craftsmanship & Tradition</h2>
            <div className="section-divider mb-6" />
            <p className="font-body text-lg text-primary-foreground/70 max-w-2xl mx-auto">
              Behind every ornament lies the skill of master artisans and the wisdom of generations, creating jewelry that tells your story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, i) => (
              <div key={i} className="text-center hover-lift p-6 rounded-sm border border-gold/20 bg-foreground/20 backdrop-blur-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border border-gold/40">
                  <item.icon size={28} className="text-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold text-primary-foreground mb-3">{item.title}</h3>
                <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
