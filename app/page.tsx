import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/sections/Hero';
import Products from '@/components/sections/Products';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import HowItWorks from '@/components/sections/HowItWorks';
import Specifications from '@/components/sections/Specifications';
import CompetitiveEdge from '@/components/sections/CompetitiveEdge';
import ContactForm from '@/components/sections/ContactForm';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Products />
        <WhyChooseUs />
        <HowItWorks />
        <Specifications />
        <CompetitiveEdge />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
