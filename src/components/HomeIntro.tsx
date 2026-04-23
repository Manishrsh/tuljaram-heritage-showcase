const HomeIntro = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-5xl text-center">
        <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-secondary mb-6">
          More Than Jewellery
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-primary leading-tight mb-8">
          A Statement <span className="italic gold-text">of You</span>
        </h2>
        <div className="section-divider mb-10" />
        <p className="font-body text-lg md:text-2xl text-muted-foreground leading-relaxed mb-6">
          At Tuljaram Saraf, we don't just create jewellery — we create expressions of
          identity, celebration, and legacy. Every design is thoughtfully crafted to match
          your lifestyle, occasions, and individuality, ensuring each piece feels as
          personal as it looks beautiful.
        </p>
        <p className="font-body text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-3xl mx-auto">
          Established in 1911 at Chhatrapati Sambhaji Maharaj Chowk, Ichalkaranji,
          Tuljaram Saraf has been a symbol of trust and tradition for generations. Our
          dedication to purity and craftsmanship has made us a preferred choice for
          families over the years.
        </p>
      </div>
    </section>
  );
};

export default HomeIntro;
