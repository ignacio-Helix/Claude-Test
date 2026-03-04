import TopBar from './components/TopBar';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import BrandsSection from './components/BrandsSection';
import FeaturedProduct from './components/FeaturedProduct';
import CategoriesSection from './components/CategoriesSection';
import ProductsSection from './components/ProductsSection';
import TrustSection from './components/TrustSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <TopBar />
      <Header />
      <HeroCarousel />
      <BrandsSection />
      <FeaturedProduct />
      <CategoriesSection />
      <ProductsSection />
      <TrustSection />
      <Newsletter />
      <Footer />
    </>
  );
}
