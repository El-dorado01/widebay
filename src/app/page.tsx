import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PartsSearchBar from "@/components/PartsSearchBar";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <WhyChooseUs />
      <PartsSearchBar />
      <FeaturedProducts />
      <FeaturedCategories />
      <Testimonials />
      <Footer />
    </>
  );
}
