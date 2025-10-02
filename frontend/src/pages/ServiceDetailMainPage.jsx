import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ServiceDetailPage from "../components/service/ServiceDetailPage";


const ServiceDetailMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <ServiceDetailPage/>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailMainPage;
