import About from "../components/about/About";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";



const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
<Navbar/>
      <main className="flex-grow">
<About/>
      </main>
   <Footer/>
    </div>
  );
};

export default AboutPage;
