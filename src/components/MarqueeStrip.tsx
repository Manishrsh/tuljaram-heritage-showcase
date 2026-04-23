const InstagramStrip = () => {
  return (
    <section className="bg-background py-8 md:py-12 border-y border-border overflow-hidden">
      <div className="relative flex">
        <div className="flex animate-[marquee_40s_linear_infinite] gap-12 whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span className="font-display text-3xl md:text-5xl text-primary italic">
                Heritage
              </span>
              <span className="text-gold text-2xl">✦</span>
              <span className="font-display text-3xl md:text-5xl gold-text">
                Trust
              </span>
              <span className="text-gold text-2xl">✦</span>
              <span className="font-display text-3xl md:text-5xl text-primary italic">
                Craftsmanship
              </span>
              <span className="text-gold text-2xl">✦</span>
              <span className="font-display text-3xl md:text-5xl gold-text">
                Since 1911
              </span>
              <span className="text-gold text-2xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramStrip;
