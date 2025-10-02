
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import CheckoutPage from "../components/service/CheckoutPage";



const CheckoutMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
<Navbar/>
      <main className="flex-grow">
<CheckoutPage/>
      </main>
   <Footer/>
    </div>
  );
};

export default CheckoutMainPage;
