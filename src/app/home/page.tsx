import CustomerLogos from "@/components/CustomerLogos";
import FeaturedCategories from "@/components/FeaturedCategories";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PartsSearchBar from "@/components/PartsSearchBar";
import TrustBadges from "@/components/TrustBadges";
import WhyChooseUsThree from "@/components/WhyChooseUsThree";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <WhyChooseUsThree />
      <PartsSearchBar />
      <FeaturedCategories />
      <TrustBadges />
      <CustomerLogos />
    </>
  );
}
