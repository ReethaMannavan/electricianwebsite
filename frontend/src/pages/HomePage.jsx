import CallBanner from "../components/about/CallBanner";
import BrandsSection from "../components/home/BrandSection";
import FAQ from "../components/home/FAQ";
import Footer from "../components/home/Footer";
import HeroSection from "../components/home/HeroSection";
import Navbar from "../components/home/Navbar";
import OurServices from "../components/home/OurServices";
import TestimonialsSection from "../components/home/TestimonialSection";
import ThreeStepProcess from "../components/home/ThreeStepProcess";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
<Navbar/>
      <main className="flex-grow">
 <HeroSection/>
 <OurServices/>
 <WhyChooseUsSection/>
 <ThreeStepProcess/>
 <TestimonialsSection/>
<BrandsSection/>
 
      <div>
        <CallBanner
          text={
            <>
              Get in Touch with 
              Electric Dreams <br /> Electrical Today
            </>
          }
        />
      </div>
<FAQ/>
      </main>
   <Footer/>
    </div>
  );
};

export default HomePage;
