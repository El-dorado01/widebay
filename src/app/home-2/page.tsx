import CustomerLogos from "@/components/CustomerLogos";
import FeaturedCategories from "@/components/FeaturedCategories";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PartsSearchBar from "@/components/PartsSearchBar";
import TrustBadges from "@/components/TrustBadges";
import WhyChooseUsTwo from "@/components/WhyChooseUsTwo";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <WhyChooseUsTwo />
      <PartsSearchBar />
      <FeaturedCategories />
      <TrustBadges />
      <CustomerLogos />
    </>
  );
}
