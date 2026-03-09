import shopImg from "@/assets/shop-interior.jpg";

const ShopExperience = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-accent text-sm tracking-[0.3em] uppercase text-secondary mb-4">Experience</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">Our Store</h2>
          <div className="section-divider mb-6" />
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Step into a world of elegance and tradition at our Ichalkaranji showroom.
          </p>
        </div>

        <div className="relative rounded-sm overflow-hidden shadow-lg">
          <img
            src={shopImg}
            alt="Tuljaram Saraf Jewellers showroom interior"
            className="w-full h-[300px] md:h-[500px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
              A Premium Shopping Experience
            </h3>
            <p className="font-body text-base text-primary-foreground/80 max-w-lg">
              Our beautifully designed showroom offers a comfortable, personal experience where every customer is treated like family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopExperience;
