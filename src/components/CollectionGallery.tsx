import mangalsutraImg from "@/assets/mangalsutra.jpg";
import necklaceImg from "@/assets/necklace.jpg";
import banglesImg from "@/assets/bangles.jpg";
import bridalImg from "@/assets/bridal-necklace.jpg";
import traditionalImg from "@/assets/traditional-maharashtrian.jpg";
import heroImg from "@/assets/hero-jewelry.jpg";

const collections = [
  { image: mangalsutraImg, title: "Mangalsutra", subtitle: "Sacred Bond of Marriage", className: "col-span-1 row-span-1" },
  { image: necklaceImg, title: "Necklaces", subtitle: "Timeless Elegance", className: "col-span-1 row-span-2" },
  { image: banglesImg, title: "Bangles", subtitle: "Circle of Tradition", className: "col-span-1 row-span-1" },
  { image: bridalImg, title: "Bridal Jewelry", subtitle: "For Your Special Day", className: "col-span-1 row-span-1" },
  { image: traditionalImg, title: "Maharashtrian Heritage", subtitle: "Thushi, Kolhapuri Saaj & More", className: "col-span-1 row-span-1" },
  { image: heroImg, title: "Complete Sets", subtitle: "Curated Collections", className: "col-span-1 row-span-1" },
];

const CollectionGallery = () => {
  return (
    <section id="collection" className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-accent text-sm tracking-[0.3em] uppercase text-secondary mb-4">Exquisite</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">Our Collection</h2>
          <div className="section-divider mb-6" />
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Each piece is a masterwork of traditional Maharashtrian design, crafted with devotion and hallmarked for purity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {collections.map((item, i) => (
            <div key={i} className={`gallery-item group rounded-sm cursor-pointer ${i === 1 ? 'sm:row-span-2' : ''}`}>
              <div className={`relative overflow-hidden ${i === 1 ? 'h-full min-h-[400px]' : 'aspect-square'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="font-display text-xl font-semibold text-primary-foreground">{item.title}</h3>
                  <p className="font-accent text-sm text-gold-light mt-1">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionGallery;
