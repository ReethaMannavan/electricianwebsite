
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import AuthPage from "../components/login/AuthPage";



const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
<Navbar/>
      <main className="flex-grow">
<AuthPage/>
      </main>
   <Footer/>
    </div>
  );
};

export default LoginPage;
