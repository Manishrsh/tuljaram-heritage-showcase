import { Link } from "react-router-dom";
import bridalImg from "@/assets/bridal-necklace.jpg";
import diamondImg from "@/assets/collection-diamond.jpg";
import pearlImg from "@/assets/collection-pearl.jpg";
import maharashtrianImg from "@/assets/dsc9249.jpg";
import polkiImg from "@/assets/collection-polki.jpg";
import maharashtrianImg2 from "@/assets/dsc9316.jpg";
import diamondDscImg from "@/assets/umo9632.jpg";
import diamondDscImgTwo from "@/assets/dsc9406.jpg";
import bridalDscImg from "@/assets/bridal-necklace.jpg";


const categories = [
  { title: "Daily Wear", subtitle: "Light & Lovely", image: diamondDscImg },
  { title: "Elevated Essentials", subtitle: "Diamond Classics", image: diamondDscImgTwo },
  { title: "Heavy Occasion", subtitle: "Polki & Kundan", image: maharashtrianImg2 },
  { title: "Maharashtrian Heritage", subtitle: "Thushi, Saaj & More", image: maharashtrianImg },
  { title: "Bridal Wear", subtitle: "For Your Special Day", image: bridalDscImg },
];

const WearWithLove = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-secondary mb-4">
            Wear me with Love
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary">
            Adorn me with <span className="italic gold-text">grace</span>
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              to="/collection"
              key={cat.title}
              className="group block"
            >
              <div className="gallery-item overflow-hidden mb-4">
                <div className="aspect-[3/4] overflow-hidden bg-cream-dark/30">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-display text-lg md:text-xl text-primary group-hover:text-gold-dark transition-colors">
                  {cat.title}
                </h3>
                <p className="font-accent text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground mt-1">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WearWithLove;
