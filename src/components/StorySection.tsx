const timelineData = [
  { year: "Foundation", title: "A Dream Takes Shape", description: "Tuljaram Saraf was established in Ichalkaranji with a vision to bring the finest traditional Maharashtrian jewelry to local families, built on values of trust and purity." },
  { year: "Growth", title: "Earning Community Trust", description: "Word spread about our commitment to hallmarked gold and authentic craftsmanship. Families began choosing Tuljaram Saraf for their most precious occasions — weddings, festivals, and milestones." },
  { year: "Heritage", title: "Generations of Legacy", description: "As the years passed, we became more than a jewelry shop — we became a family tradition. Grandmothers brought their granddaughters to select their bridal sets, continuing a beautiful cycle of trust." },
  { year: "Today", title: "Modern Yet Traditional", description: "Today, Tuljaram Saraf stands proudly at Chhatrapati Sambhaji Maharaj Chowk, blending timeless Maharashtrian designs with contemporary elegance, continuing to serve Ichalkaranji with the same dedication." },
];

const StorySection = () => {
  return (
    <section id="story" className="section-padding bg-card">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="font-accent text-sm tracking-[0.3em] uppercase text-secondary mb-4">Heritage</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">Our Story</h2>
          <div className="section-divider mb-6" />
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            A journey of trust, tradition, and timeless artistry that spans generations in Ichalkaranji.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold/30 md:-translate-x-px" />

          {timelineData.map((item, i) => (
            <div key={i} className={`relative flex flex-col md:flex-row items-start mb-12 last:mb-0 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-gold border-2 border-gold-light -translate-x-1.5 mt-2 z-10" />
              
              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <span className="font-accent text-xs tracking-[0.3em] uppercase text-secondary">{item.year}</span>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mt-1 mb-3">{item.title}</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
