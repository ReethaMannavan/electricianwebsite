
import EmergencyElectrician from "../components/emergency/EmergencyElectrician";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";


const EmergencyMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
<Navbar/>
      <main className="flex-grow">

<EmergencyElectrician/>

      </main>
   <Footer/>
    </div>
  );
};

export default EmergencyMainPage;
