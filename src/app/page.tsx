import Header from "@/components/Header";
import HeroSearch from "@/components/HeroSearch";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedCategories from "@/components/FeaturedCategories";
import TrustBadges from "@/components/TrustBadges";
import CustomerLogos from "@/components/CustomerLogos";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSearch />
      <WhyChooseUs />
      <FeaturedCategories />
      <TrustBadges />
      <CustomerLogos />
    </>
  );
}
