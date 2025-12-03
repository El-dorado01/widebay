import Header from "@/components/Header";
import HeroSearch from "@/components/HeroSearch";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSearch />
      <WhyChooseUs />
      <FeaturedProducts />
      <FeaturedCategories />
      <Testimonials />
      <Footer />
    </>
  );
}
