import { Phone, MessageCircle, Instagram, Facebook, MapPin, Mail } from "lucide-react";
import Layout from "@/components/Layout";

const ContactPage = () => {
  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="font-accent text-sm tracking-[0.3em] uppercase text-secondary mb-4">Get in Touch</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">Contact Us</h1>
            <div className="section-divider mb-6" />
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you. Reach out to us for any inquiries about our jewelry collection or to schedule a visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Call */}
            <a href="tel:+917588267387" className="flex items-center gap-4 p-8 bg-card border border-border rounded-sm hover-lift">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 shrink-0">
                <Phone size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Call Us</h3>
                <p className="font-body text-base text-muted-foreground">75882 67387</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/917588267387" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-8 bg-card border border-border rounded-sm hover-lift">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-festive-green/10 shrink-0">
                <MessageCircle size={24} className="text-festive-green" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">WhatsApp</h3>
                <p className="font-body text-base text-muted-foreground">75882 67387</p>
              </div>
            </a>

            {/* Address */}
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-8 bg-card border border-border rounded-sm hover-lift">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 shrink-0">
                <MapPin size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Address</h3>
                <p className="font-body text-sm text-muted-foreground">
                  "Suprabhat", Chhatrapati Sambhaji Maharaj Chowk, Ichalkaranji – 416115
                </p>
              </div>
            </a>

            {/* Email placeholder */}
            <div className="flex items-center gap-4 p-8 bg-card border border-border rounded-sm hover-lift">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 shrink-0">
                <Mail size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">Email</h3>
                <p className="font-body text-base text-muted-foreground">info@tuljaramsaraf.com</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-16 text-center">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">Follow Us</h3>
            <div className="flex justify-center gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors hover-lift">
                <Instagram size={24} className="text-gold" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors hover-lift">
                <Facebook size={24} className="text-gold" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
