import Layout from "@/components/Layout";
import { Gem, Shield, Award, Heart } from "lucide-react";
import craftImg from "@/assets/craft-hands.jpg";
import craftsmanshipImg from "@/assets/craftsmanship.jpg";

const features = [
  { icon: Gem, title: "Handcrafted Artistry", description: "Every ornament is meticulously handcrafted by skilled karigars preserving centuries-old Maharashtrian techniques." },
  { icon: Shield, title: "BIS Hallmarked", description: "100% certified purity with BIS hallmarking on every piece of gold jewellery we sell." },
  { icon: Award, title: "Heritage Designs", description: "Authentic Maharashtrian patterns — from Thushi to Kolhapuri Saaj — alongside modern diamond and kundan craftsmanship." },
  { icon: Heart, title: "Made with Devotion", description: "Each creation carries the love and dedication of artisans who treat their craft as worship." },
];

const steps = [
  { n: "01", title: "Sketch", text: "Every design begins as a pencil sketch — born from heritage motifs and your story." },
  { n: "02", title: "Carve", text: "Master karigars carve the wax model by hand, perfecting every curve and detail." },
  { n: "03", title: "Cast", text: "Pure 22kt gold is melted and cast, then polished to reveal its first gleam." },
  { n: "04", title: "Set", text: "Diamonds, polki and uncut stones are set one by one — each given its rightful light." },
  { n: "05", title: "Finish", text: "Hours of finishing, hallmarking and a final blessing before it reaches your hands." },
];

const CraftsmanshipPage = () => {
  return (
    <Layout>
      {/* Hero / intro */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={craftsmanshipImg} alt="Gold jewellery craftsmanship" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>

        <div className="relative z-10 section-padding">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="font-accent text-sm tracking-[0.3em] uppercase text-gold-light mb-4">
                Artistry · Karigari
              </p>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-primary-foreground mb-6">
                Craftsmanship & <span className="italic gold-text">Tradition</span>
              </h1>
              <div className="section-divider mb-6" />
              <p className="font-body text-lg text-primary-foreground/75 max-w-2xl mx-auto">
                Behind every ornament lies the skill of master karigars and the wisdom of
                generations — the quiet, patient art of Karigari that has defined Tuljaram
                Saraf since 1911.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((item, i) => (
                <div key={i} className="text-center hover-lift p-6 rounded-sm border border-gold/20 bg-foreground/20 backdrop-blur-sm">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border border-gold/40">
                    <item.icon size={28} className="text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-primary-foreground mb-3">{item.title}</h3>
                  <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Karigari journey — merged in */}
      <section className="relative bg-foreground text-primary-foreground overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[60vh] lg:min-h-screen overflow-hidden">
            <img
              src={craftImg}
              alt="Master karigar shaping a gold necklace"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-foreground/60" />
          </div>

          <div className="section-padding lg:py-32">
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
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CraftsmanshipPage;
