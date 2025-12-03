import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PartsSearchBar from "@/components/PartsSearchBar";
import Testimonials from "@/components/Testimonials";
import WhyChooseUsTwo from "@/components/WhyChooseUsTwo";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <WhyChooseUsTwo />
      <PartsSearchBar />
      <FeaturedProducts />
      <FeaturedCategories />
      <Testimonials />
      <Footer />
    </>
  );
}
