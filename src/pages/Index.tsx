import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import ImpactStats from "@/components/ImpactStats";
import MissionSection from "@/components/MissionSection";
import ThreePillars from "@/components/ThreePillars";
import TamilQuote from "@/components/TamilQuote";
import FoundersSection from "@/components/FoundersSection";
import BankDetailsSection from "@/components/BankDetailsSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        {/* Our Purpose */}
        <MissionSection />
        {/* What We Do */}
        <ThreePillars />
        {/* Measurable Impact */}
        <ImpactStats />
        <TamilQuote />
        {/* Who We Are */}
        <FoundersSection />
        {/* Support Our Mission */}
        <BankDetailsSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
