const FAQS = [
  {
    q: "Is all your gold BIS hallmarked?",
    a: "Yes. Every gold ornament we create is BIS hallmarked for purity, with full certification provided at the time of purchase.",
  },
  {
    q: "Do you offer custom or bespoke designs?",
    a: "Absolutely. Our master karigars work directly with you to design heirloom pieces — from bridal sets to redesigning your family jewellery.",
  },
  {
    q: "What is your buy-back and exchange policy?",
    a: "We offer transparent, fair buy-back on all our gold jewellery and easy exchange against new purchases. Your trust is our most precious gem.",
  },
  {
    q: "Do you ship outside Ichalkaranji?",
    a: "While our showroom experience is best enjoyed in person, we welcome enquiries on WhatsApp and arrange secure consultations for clients across Maharashtra.",
  },
  {
    q: "What occasions do you cater to?",
    a: "From everyday lightweight pieces to full bridal sets, festive collections, baby jewellery and engagement rings — every milestone has a place at Tuljaram Saraf.",
  },
];

const FaqSection = () => {
  return (
    <section className="section-padding bg-cream-dark/40">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-secondary mb-4">
            Good to Know
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary leading-tight">
            Your <span className="italic gold-text">questions</span>, gently answered
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => (
            <details key={i} className="group py-6 px-2">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-display text-lg md:text-xl text-primary pr-6">
                  {f.q}
                </h3>
                <span className="font-display text-2xl text-gold transition-transform duration-300 group-open:rotate-45 shrink-0">
                  +
                </span>
              </summary>
              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mt-4 pr-10">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
