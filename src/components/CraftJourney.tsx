import { Link } from "react-router-dom";
import craftImg from "@/assets/craft-hands.jpg";

const steps = [
  { n: "01", title: "Sketch", text: "Every design begins as a pencil sketch — born from heritage motifs and your story." },
  { n: "02", title: "Carve", text: "Master karigars carve the wax model by hand, perfecting every curve and detail." },
  { n: "03", title: "Cast", text: "Pure 22kt gold is melted and cast, then polished to reveal its first gleam." },
  { n: "04", title: "Set", text: "Diamonds, polki and uncut stones are set one by one — each given its rightful light." },
  { n: "05", title: "Finish", text: "Hours of finishing, hallmarking and a final blessing before it reaches your hands." },
];

const CraftJourney = () => {
  return (
    <section className="relative bg-foreground text-primary-foreground overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Image side */}
        <div className="relative min-h-[60vh] lg:min-h-screen overflow-hidden order-1 lg:order-1">
          <img
            src={craftImg}
            alt="Master karigar shaping a gold necklace"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-foreground/60" />
        </div>

        {/* Text side */}
        <div className="section-padding lg:py-32 order-2 lg:order-2">
          <div className="max-w-xl">
            <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-gold-light mb-6">
              The Karigari
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight mb-8">
              Five steps. <span className="italic gold-text">Countless hours.</span>
              <br /> One masterpiece.
            </h2>
            <div className="w-16 h-px bg-gold mb-10" />

            <ol className="space-y-8">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-6">
                  <span className="font-display text-3xl gold-text leading-none shrink-0 w-12">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-primary-foreground mb-2">
                      {s.title}
                    </h3>
                    <p className="font-body text-base text-primary-foreground/75 leading-relaxed">
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              to="/craftsmanship"
              className="inline-block mt-12 font-accent text-sm tracking-[0.3em] uppercase text-gold-light border-b border-gold pb-1 hover:text-primary-foreground transition-colors"
            >
              Inside the Atelier
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftJourney;
