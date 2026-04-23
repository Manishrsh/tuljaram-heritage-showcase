import HeroSection from "@/components/HeroSection";
import HomeIntro from "@/components/HomeIntro";
import SignatureCollections from "@/components/SignatureCollections";
import WearWithLove from "@/components/WearWithLove";
import LuvicaSection from "@/components/LuvicaSection";
import HeritageStrip from "@/components/HeritageStrip";
import TrustSection from "@/components/TrustSection";
import VisitCta from "@/components/VisitCta";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HomeIntro />
      <SignatureCollections />
      <WearWithLove />
      <LuvicaSection />
      <HeritageStrip />
      <TrustSection />
      <VisitCta />
    </Layout>
  );
};

export default Index;
