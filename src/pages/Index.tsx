import HeroSection from "@/components/HeroSection";
import HomeIntro from "@/components/HomeIntro";
import MarqueeStrip from "@/components/MarqueeStrip";
import SignatureCollections from "@/components/SignatureCollections";
import WearWithLove from "@/components/WearWithLove";
import LuvicaSection from "@/components/LuvicaSection";
import CraftJourney from "@/components/CraftJourney";
import OccasionsSection from "@/components/OccasionsSection";
import HeritageStrip from "@/components/HeritageStrip";
import PromisesSection from "@/components/PromisesSection";
import ShowroomShowcase from "@/components/ShowroomShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import TrustSection from "@/components/TrustSection";
import VisitCta from "@/components/VisitCta";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HomeIntro />
      <MarqueeStrip />
      <SignatureCollections />
      <WearWithLove />
      <LuvicaSection />
      <OccasionsSection />
      <CraftJourney />
      <HeritageStrip />
      <PromisesSection />
      <ShowroomShowcase />
      <TestimonialsSection />
      <TrustSection />
      <FaqSection />
      <VisitCta />
    </Layout>
  );
};

export default Index;
