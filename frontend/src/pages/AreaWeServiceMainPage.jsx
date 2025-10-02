
import CallBanner from "../components/about/CallBanner";
import AreasWeService from "../components/area/AreaWeService";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";



const AreaWeServiceMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
<Navbar/>
      <main className="flex-grow">
<AreasWeService/>
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
      </main>
   <Footer/>
    </div>
  );
};

export default AreaWeServiceMainPage;
