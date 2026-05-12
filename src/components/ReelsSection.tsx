import { useState } from "react";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import bridalPoster from "@/assets/bridal-necklace.jpg";
import diamondPoster from "@/assets/collection-diamond.jpg";
import polkiPoster from "@/assets/collection-polki.jpg";
import lifestylePoster from "@/assets/lifestyle-modern.jpg";
import craftPoster from "@/assets/craft-hands.jpg";
import weddingPoster from "@/assets/wedding-couple.jpg";
import reelOne from "@/assets/reel-1.mp4";
import reelTwo from "@/assets/reel-2.mp4";
import reelThree from "@/assets/reel-3.mp4";
import reelFour from "@/assets/reel-4.mp4";

const reels = [
  { src: reelOne, poster: bridalPoster, title: "Anaya Bridal Reveal", duration: "0:45" },
  { src: reelTwo, poster: diamondPoster, title: "Heera Diamond Story", duration: "0:30" },
  { src: reelThree, poster: polkiPoster, title: "Mehfil Polki Edit", duration: "0:55" },
  { src: reelFour, poster: lifestylePoster, title: "Everyday Edit", duration: "0:40" },
  { src: reelOne, poster: craftPoster, title: "Inside the Atelier", duration: "1:10" },
  { src: reelTwo, poster: weddingPoster, title: "A Bride's Day", duration: "0:50" },
];

const ReelsSection = () => {
  const [activeReel, setActiveReel] = useState(reels[0]);
  const [open, setOpen] = useState(false);

  const openReel = (reel: typeof reels[number]) => {
    setActiveReel(reel);
    setOpen(true);
  };

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
            Tap any reel to open it in a popup and watch it here without leaving the page.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {reels.map((reel) => (
            <button
              key={`${reel.title}-${reel.duration}`}
              type="button"
              onClick={() => openReel(reel)}
              className="group relative aspect-[9/16] overflow-hidden bg-foreground/5 rounded-sm"
              aria-label={`Play reel: ${reel.title}`}
            >
              <video
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={reel.poster}
              >
                <source src={reel.src} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center group-hover:bg-gold transition-colors">
                  <Play size={20} className="text-foreground ml-0.5" fill="currentColor" />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-center">
                <p className="font-accent text-[10px] tracking-[0.3em] uppercase text-gold-light mb-1">
                  {reel.duration}
                </p>
                <p className="font-display text-sm md:text-base text-primary-foreground leading-tight">
                  {reel.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(92vw,460px)] p-4 md:p-5 bg-background border border-gold/20 rounded-sm">
          <DialogHeader className="sr-only">
            <DialogTitle>{activeReel.title}</DialogTitle>
            <DialogDescription>{activeReel.duration}</DialogDescription>
          </DialogHeader>
          <div className="relative overflow-hidden rounded-sm bg-black aspect-[9/16]">
            <video
              key={activeReel.src}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={activeReel.poster}
            >
              <source src={activeReel.src} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="font-accent text-[10px] tracking-[0.35em] uppercase text-gold-light mb-1">
                Reel Preview
              </p>
              <h3 className="font-display text-xl md:text-2xl text-primary-foreground">
                {activeReel.title}
              </h3>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ReelsSection;
