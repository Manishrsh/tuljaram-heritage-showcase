import Layout from "@/components/Layout";
import { MessageCircle, Instagram, Facebook, MapPin, Mail, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="font-accent text-sm tracking-[0.3em] uppercase text-secondary mb-4">
              Visit & Contact
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-primary mb-6">
              Visit <span className="italic gold-text">Us</span>
            </h1>
            <div className="section-divider mb-6" />
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Step into our Ichalkaranji showroom, or reach out — we'd love to share the
              stories behind every piece.
            </p>
          </div>

          {/* Map + key info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="rounded-sm overflow-hidden shadow-sm border border-border h-[350px] lg:h-[480px]">
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

            <div className="flex flex-col justify-center gap-6">
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

              <a
                href="https://wa.me/917588267387"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-festive-green text-primary-foreground font-accent text-sm tracking-widest uppercase px-8 py-4 rounded-sm hover:opacity-90 transition-opacity w-fit"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <a href="https://wa.me/917588267387" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-card border border-border rounded-sm hover-lift">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-festive-green/10 shrink-0">
                <MessageCircle size={24} className="text-festive-green" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">WhatsApp</h3>
                <p className="font-body text-base text-muted-foreground">+91 75882 67387</p>
              </div>
            </a>

            <a href="mailto:dishantshah2141@gmail.com" className="flex items-center gap-4 p-6 bg-card border border-border rounded-sm hover-lift">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 shrink-0">
                <Mail size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Email</h3>
                <p className="font-body text-base text-muted-foreground">dishantshah2141@gmail.com</p>
              </div>
            </a>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h3 className="font-display text-2xl font-light text-foreground mb-2">
              Follow <span className="italic gold-text">Us</span>
            </h3>
            <p className="font-body text-base text-muted-foreground mb-6">
              For new launches, bridal stories and behind-the-scenes from the atelier.
            </p>
            <div className="flex justify-center gap-6">
              <a href="https://www.instagram.com/tuljaram_saraf?igsh=MWptcmMzYzVxN3UxZg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold/10 transition-colors hover-lift">
                <Instagram size={24} className="text-gold" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61591673752968" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold/10 transition-colors hover-lift">
                <Facebook size={24} className="text-gold" />
              </a>
              <a href="https://wa.me/917588267387" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold/10 transition-colors hover-lift">
                <MessageCircle size={24} className="text-gold" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
