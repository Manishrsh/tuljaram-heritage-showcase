import { Link } from "react-router-dom";
import heritageImg from "@/assets/heritage-1911.jpg";

const HeritageStrip = () => {
  return (
    <section className="section-padding bg-cream-dark/40">
      <div className="container mx-auto max-w-7xl grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="gallery-item overflow-hidden">
          <div className="aspect-[5/4] overflow-hidden">
            <img
              src={heritageImg}
              alt="Tuljaram Saraf heritage workshop, Ichalkaranji"
              className="w-full h-full object-cover sepia-[0.2]"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-secondary mb-6">
            Heritage · 1911
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary leading-tight mb-8">
            Four generations of <span className="italic gold-text">trust</span>,
            tradition & timeless craft.
          </h2>
          <div className="w-16 h-px bg-gold mb-6" />
          <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
            From a small saraf shop in Ichalkaranji to a name spoken with pride across
            Maharashtra — our story is woven with the stories of the families we've
            served. Every ornament that leaves our doors carries a century of devotion,
            purity and skill.
          </p>
          <p className="font-body text-base text-muted-foreground/85 leading-relaxed mb-10">
            Our collection ranges from classic Gold and Diamond jewellery to traditional
            Kundan, Polki, Jadau, Pearl, Real Stone and contemporary lightweight
            designs — each crafted to celebrate timeless beauty and cultural richness.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-10">
            {[
              { number: "1911", label: "Established" },
              { number: "100%", label: "BIS Hallmarked" },
              { number: "10K+", label: "Families" },
            ].map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <p className="font-display text-2xl md:text-3xl font-light gold-text mb-1">
                  {s.number}
                </p>
                <p className="font-accent text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/our-story"
            className="inline-block font-accent text-sm tracking-[0.3em] uppercase text-primary border-b border-gold pb-1 hover:text-gold-dark transition-colors"
          >
            Read Our Story
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeritageStrip;
