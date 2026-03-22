const WelcomeSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="font-accent text-sm tracking-[0.3em] uppercase text-secondary mb-4">Welcome to</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">
          Tuljaram Saraf Jewellers
        </h2>
        <div className="section-divider mb-8" />
        <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
          Nestled in the heart of Ichalkaranji at Chhatrapati Sambhaji Maharaj Chowk, Tuljaram Saraf has been the jeweler of choice for families since 1911. Our commitment to purity, tradition, and exquisite craftsmanship has made us a cornerstone of trust in the community.
        </p>
        <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
          From elegant Gold & Diamond jewelry to exquisite Kundan, Polki, Jadau, Pearl, Real Stones, and Light Weight collections — every ornament we offer carries the warmth of tradition and the sparkle of unmatched artistry.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: "50+", label: "Years of Trust" },
            { number: "10K+", label: "Happy Families" },
            { number: "100%", label: "BIS Hallmarked" },
            { number: "4.8★", label: "Google Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold gold-text mb-2">{stat.number}</p>
              <p className="font-accent text-sm tracking-wider uppercase text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
