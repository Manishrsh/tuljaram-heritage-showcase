import showroomImg from "@/assets/showroom-interior.jpg";

const ShowroomShowcase = () => {
  return (
    <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
      <img
        src={showroomImg}
        alt="Tuljaram Saraf showroom interior"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-foreground/55" />

      <div className="relative z-10 text-center text-primary-foreground max-w-3xl px-6">
        <p className="font-accent text-xs md:text-sm tracking-[0.45em] uppercase text-gold-light mb-6">
          Step Inside
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
          A showroom built like a
          <br />
          <span className="italic gold-text">jewel box</span>.
        </h2>
        <div className="section-divider mb-8" />
        <p className="font-body text-lg md:text-xl text-primary-foreground/85 leading-relaxed">
          Crystal chandeliers, hand-carved wood, marble underfoot — and over a thousand
          masterpieces waiting to meet you. Spend an afternoon, sip our chai, and let our
          stylists bring your story to life.
        </p>
      </div>
    </section>
  );
};

export default ShowroomShowcase;
