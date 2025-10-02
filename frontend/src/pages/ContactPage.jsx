
import Contact from "../components/contact/Contact";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";



const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
<Navbar/>
      <main className="flex-grow">
<Contact/>
      </main>
   <Footer/>
    </div>
  );
};

export default ContactPage;
