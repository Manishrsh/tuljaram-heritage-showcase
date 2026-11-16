import { Quote } from "lucide-react";

const reviews = [
  {
    name: "Aishwarya Patil",
    place: "Kolhapur",
    text: "We've been buying from Tuljaram Saraf for three generations. From my aaji's mangalsutra to my own wedding set — every piece feels like it was made just for our family.",
  },
  {
    name: "Rohan & Sneha Kulkarni",
    place: "Ichalkaranji",
    text: "The team designed our entire bridal jewellery from scratch. The detailing on the polki choker is unreal — guests still ask us where it's from.",
  },
  {
    name: "Mrs. Deshmukh",
    place: "Sangli",
    text: "Honest pricing and the warmest service in the region. They explained every certification, every gram. You don't find this kind of trust anywhere else.",
  },
  {
    name: "Pooja Joshi",
    place: "Pune",
    text: "Drove down from Pune just for them. Their lightweight diamond collection is exactly what I'd been searching for — modern, elegant, and beautifully crafted.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-secondary mb-4">
            Words from our families
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary leading-tight">
            A century of <span className="italic gold-text">stories</span>
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="bg-cream-dark/30 p-8 md:p-10 hover-lift relative"
            >
              <Quote className="w-10 h-10 text-gold/40 mb-6" strokeWidth={1.2} />
              <blockquote className="font-body text-lg md:text-xl text-foreground/85 leading-relaxed italic mb-8">
                "{r.text}"
              </blockquote>
              <figcaption>
                <p className="font-display text-lg text-primary">{r.name}</p>
                <p className="font-accent text-xs tracking-[0.3em] uppercase text-muted-foreground mt-1">
                  {r.place}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mt-16 pt-12 border-t border-border">
          <div className="text-center">
            <p className="font-display text-4xl gold-text mb-1">4.8★</p>
            <p className="font-accent text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Google Rating
            </p>
          </div>
          <span className="hidden md:block w-px h-12 bg-border" />
          <div className="text-center">
            <p className="font-display text-4xl gold-text mb-1">10,000+</p>
            <p className="font-accent text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Happy Families
            </p>
          </div>
          <span className="hidden md:block w-px h-12 bg-border" />
          <div className="text-center">
            <p className="font-display text-4xl gold-text mb-1">114</p>
            <p className="font-accent text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Years of Trust
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
