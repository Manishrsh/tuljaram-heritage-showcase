import Layout from "@/components/Layout";
import { MapPin, Clock, Phone } from "lucide-react";
import showroomImg from "@/assets/showroom-interior.jpg";

const StorePage = () => {
  return (
    <Layout>
      <section className="section-padding bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="font-accent text-sm tracking-[0.3em] uppercase text-secondary mb-4">
              Experience
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-primary mb-6">
              Our <span className="italic gold-text">Store</span>
            </h1>
            <div className="section-divider mb-6" />
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Step into a century of craftsmanship at our flagship showroom in Ichalkaranji —
              where every visit is personal, unhurried, and steeped in heritage.
            </p>
          </div>

          <div className="relative rounded-sm overflow-hidden shadow-lg mb-16">
            <img
              src={showroomImg}
              alt="Tuljaram Saraf Jewellers showroom interior"
              className="w-full h-[320px] md:h-[560px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <h2 className="font-display text-2xl md:text-4xl font-light text-primary-foreground mb-2">
                A Premium Shopping Experience
              </h2>
              <p className="font-body text-base md:text-lg text-primary-foreground/85 max-w-xl">
                Our beautifully designed showroom offers a comfortable, personal experience
                where every customer is treated like family.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start p-6 border border-border rounded-sm bg-background">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 shrink-0">
                <MapPin size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">Address</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  "Suprabhat",<br />
                  Chhatrapati Sambhaji Maharaj Chowk,<br />
                  Ichalkaranji, Maharashtra – 416115
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 border border-border rounded-sm bg-background">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 shrink-0">
                <Clock size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">Store Hours</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  Mon – Sat: 10:00 AM – 9:00 PM<br />
                  Sunday: 10:00 AM – 2:00 PM
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 border border-border rounded-sm bg-background">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 shrink-0">
                <Phone size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">Contact</h3>
                <p className="font-body text-base text-muted-foreground">
                  <a href="tel:+917588267387" className="hover:text-primary transition-colors">
                    +91 75882 67387
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StorePage;
