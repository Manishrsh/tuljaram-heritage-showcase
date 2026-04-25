import { Play } from "lucide-react";
import bridalImg from "@/assets/bridal-necklace.jpg";
import diamondImg from "@/assets/collection-diamond.jpg";
import polkiImg from "@/assets/collection-polki.jpg";
import lifestyleImg from "@/assets/lifestyle-modern.jpg";
import craftImg from "@/assets/craft-hands.jpg";
import weddingImg from "@/assets/wedding-couple.jpg";

const reels = [
  { image: bridalImg, title: "Anaya Bridal Reveal", duration: "0:45" },
  { image: diamondImg, title: "Heera Diamond Story", duration: "0:30" },
  { image: polkiImg, title: "Mehfil Polki Edit", duration: "0:55" },
  { image: lifestyleImg, title: "Everyday Edit", duration: "0:40" },
  { image: craftImg, title: "Inside the Atelier", duration: "1:10" },
  { image: weddingImg, title: "A Bride's Day", duration: "0:50" },
];

const ReelsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-secondary mb-4">
            Reels & Stories
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary leading-tight">
            Watch our jewels <span className="italic gold-text">come alive</span>
          </h2>
          <div className="section-divider mt-8" />
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            A glimpse of brides, bespoke craft and behind-the-scenes moments from the
            Tuljaram Saraf atelier.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {reels.map((r) => (
            <button
              key={r.title}
              type="button"
              className="group relative aspect-[9/16] overflow-hidden bg-foreground/5 rounded-sm"
              aria-label={`Play reel: ${r.title}`}
            >
              <img
                src={r.image}
                alt={r.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center group-hover:bg-gold transition-colors">
                  <Play size={20} className="text-foreground ml-0.5" fill="currentColor" />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-gold-light mb-1">
                  {r.duration}
                </p>
                <p className="font-display text-sm md:text-base text-primary-foreground leading-tight">
                  {r.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;
