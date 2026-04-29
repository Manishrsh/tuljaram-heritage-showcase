import HeroSection from "@/components/HeroSection";
import HomeIntro from "@/components/HomeIntro";
import MarqueeStrip from "@/components/MarqueeStrip";
import SignatureCollections from "@/components/SignatureCollections";
import WearWithLove from "@/components/WearWithLove";
import LuvicaSection from "@/components/LuvicaSection";
import OccasionsSection from "@/components/OccasionsSection";
import HeritageStrip from "@/components/HeritageStrip";
import PromisesSection from "@/components/PromisesSection";
import ReelsSection from "@/components/ReelsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import VisitCta from "@/components/VisitCta";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HomeIntro />
      <LuvicaSection />
      <MarqueeStrip />
      <SignatureCollections />
      <WearWithLove />
      <ReelsSection />
      <OccasionsSection />
      <HeritageStrip />
      <PromisesSection />
      <TestimonialsSection />
      <FaqSection />
      <VisitCta />
    </Layout>
  );
};

export default Index;
