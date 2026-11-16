import { Star } from "lucide-react";

const TrustSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="font-accent text-sm tracking-[0.3em] uppercase text-secondary mb-4">Trusted</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">Customer Trust</h2>
        <div className="section-divider mb-10" />

        {/* Google Rating */}
        <div className="inline-flex flex-col items-center bg-card rounded-sm p-8 md:p-12 border border-border shadow-sm">
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={28} className={s <= 4 ? "text-gold fill-gold" : "text-gold fill-gold/50"} />
            ))}
          </div>
          <p className="font-display text-4xl md:text-5xl font-bold gold-text mb-2">4.8</p>
          <p className="font-accent text-sm tracking-wider uppercase text-muted-foreground mb-4">Google Rating</p>
          <p className="font-body text-base text-muted-foreground max-w-md">
            Rated among the most trusted jewelers in Ichalkaranji by hundreds of satisfied customers on Google.
          </p>
        </div>

        {/* Trust points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { title: "Purity Guaranteed", desc: "Every gold ornament is BIS hallmarked ensuring 100% purity and transparency." },
            { title: "Generational Trust", desc: "Families have trusted Tuljaram Saraf for their most precious moments across generations." },
            { title: "Fair Pricing", desc: "Transparent making charges and competitive gold rates with no hidden costs." },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-border rounded-sm hover-lift">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
