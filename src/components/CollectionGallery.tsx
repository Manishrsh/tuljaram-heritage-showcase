import mangalsutraImg from "@/assets/mangalsutra.jpg";
import necklaceImg from "@/assets/necklace.jpg";
import banglesImg from "@/assets/bangles.jpg";
import bridalImg from "@/assets/bridal-necklace.jpg";
import maharashtrianImg from "@/assets/dsc9249.jpg";
import heroImg from "@/assets/hero-jewelry.jpg";
import imageOne from "@/assets/reel-photo-1.jpg";
import imageTwo from "@/assets/reel-photo-2.jpg";
import imageThree from "@/assets/reel-photo-3.jpg";
import imageFour from "@/assets/reel-photo-4.jpg";
import imageFive from "@/assets/reel-photo-5.jpg";

const collections = [
  { image: mangalsutraImg, title: "Mangalsutra", subtitle: "Sacred Bond of Marriage", className: "col-span-1 row-span-1" },
  { image: necklaceImg, title: "Necklaces", subtitle: "Timeless Elegance", className: "col-span-1 row-span-2" },
  { image: banglesImg, title: "Bangles", subtitle: "Circle of Tradition", className: "col-span-1 row-span-1" },
  { image: bridalImg, title: "Bridal Jewelry", subtitle: "For Your Special Day", className: "col-span-1 row-span-1" },
  { image: maharashtrianImg, title: "Maharashtrian Heritage", subtitle: "Thushi, Kolhapuri Saaj & More", className: "col-span-1 row-span-1" },
  { image: heroImg, title: "Complete Sets", subtitle: "Curated Collections", className: "col-span-1 row-span-1" },
];

const galleryImages = [
  { src: imageOne, title: "Craft Close-Up", caption: "Detail and finish" },
  { src: imageTwo, title: "Bridal Glow", caption: "Statement styling" },
  { src: imageThree, title: "Traditional Form", caption: "Heritage in motion" },
  { src: imageFour, title: "Showroom Story", caption: "Warm store moments" },
  { src: imageFive, title: "Golden Finish", caption: "Elegant daily wear" },
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

        <div className="mt-20">
          <div className="text-center mb-10">
            <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-secondary mb-4">
              Images
            </p>
            <h3 className="font-display text-2xl md:text-4xl font-light text-primary leading-tight">
              A still gallery of <span className="italic gold-text">moments</span>
            </h3>
            <div className="section-divider mt-8" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <article
                key={image.title}
                className={`gallery-item group relative overflow-hidden rounded-sm ${
                  index === 2 ? "md:row-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${index === 2 ? "aspect-[4/5] md:h-full md:min-h-[28rem]" : "aspect-[4/5]"}`}>
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-center">
                    <h4 className="font-display text-sm md:text-base text-primary-foreground leading-tight">
                      {image.title}
                    </h4>
                    <p className="font-accent text-[10px] tracking-[0.25em] uppercase text-gold-light mt-1">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionGallery;
