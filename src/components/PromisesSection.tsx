import { Sparkles, ShieldCheck, Gem, HeartHandshake, Award, Scale } from "lucide-react";

const promises = [
  {
    icon: ShieldCheck,
    title: "BIS Hallmarked",
    description: "Every gold ornament is certified for purity by the Bureau of Indian Standards.",
  },
  {
    icon: Gem,
    title: "Certified Diamonds",
    description: "Conflict-free, lab-certified diamonds with full grading transparency.",
  },
  {
    icon: Scale,
    title: "Honest Pricing",
    description: "Transparent making charges and fair buy-back. No hidden surprises, ever.",
  },
  {
    icon: Award,
    title: "Heritage Craft",
    description: "Master karigars whose families have shaped jewellery for generations.",
  },
  {
    icon: HeartHandshake,
    title: "Lifetime Care",
    description: "Free polishing, cleaning and exchange — we stay with you long after the purchase.",
  },
  {
    icon: Sparkles,
    title: "Bespoke Designs",
    description: "Custom creations crafted around your story, occasion and silhouette.",
  },
];

const PromisesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-secondary mb-4">
            The Tuljaram Promise
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary leading-tight">
            Six promises, <span className="italic gold-text">one century</span> of trust
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {promises.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-background p-8 md:p-10 hover-lift group"
              >
                <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl md:text-2xl text-primary mb-3">
                  {p.title}
                </h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromisesSection;
