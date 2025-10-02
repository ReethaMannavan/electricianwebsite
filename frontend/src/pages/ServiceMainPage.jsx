import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ServiceSubcategory from "../components/service/ServiceSubCategory";

const ServiceMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <ServiceSubcategory/>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceMainPage;
