import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import StorySection from "@/components/StorySection";
import CollectionGallery from "@/components/CollectionGallery";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import ShopExperience from "@/components/ShopExperience";
import TrustSection from "@/components/TrustSection";
import VisitSection from "@/components/VisitSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <StorySection />
      <CollectionGallery />
      <CraftsmanshipSection />
      <ShopExperience />
      <TrustSection />
      <VisitSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
