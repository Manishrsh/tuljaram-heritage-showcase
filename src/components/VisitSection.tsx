import { MapPin, Clock, Phone } from "lucide-react";

const VisitSection = () => {
  return (
    <section id="visit" className="section-padding bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-accent text-sm tracking-[0.3em] uppercase text-secondary mb-4">Find Us</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">Visit Our Store</h2>
          <div className="section-divider mb-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-sm overflow-hidden shadow-sm border border-border h-[350px] lg:h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.8!2d74.46!3d16.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQxJzI0LjAiTiA3NMKwMjcnMzYuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tuljaram Saraf location on Google Maps"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 shrink-0">
                <MapPin size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Address</h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  "Suprabhat", Chhatrapati Sambhaji Maharaj Chowk,<br />
                  Ichalkaranji, Maharashtra – 416115, India
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 shrink-0">
                <Clock size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Store Hours</h3>
                <p className="font-body text-base text-muted-foreground">
                  Monday – Saturday: 10:00 AM – 9:00 PM<br />
                  Sunday: 10:00 AM – 2:00 PM
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 shrink-0">
                <Phone size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Contact</h3>
                <p className="font-body text-base text-muted-foreground">
                  <a href="tel:+917588267387" className="hover:text-primary transition-colors">75882 67387</a>
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/917588267387"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-festive-green text-primary-foreground font-accent text-sm tracking-widest uppercase px-8 py-4 rounded-sm hover:opacity-90 transition-opacity w-fit"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitSection;
