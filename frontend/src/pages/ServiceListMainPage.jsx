import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ServiceListPage from "../components/service/ServiceListPage";

const ServiceListMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <ServiceListPage/>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceListMainPage;
