import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import ScrollToTop from "./components/scroll/ScrollToTop";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import AuthPage from "./components/login/AuthPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServiceMainPage from "./pages/ServiceMainPage";
import CartModal from "./components/service/CartModal";
import ServiceDetailMainPage from "./pages/ServiceDetailMainPage";
import CheckoutPage from "./components/service/CheckoutPage";
import AreaWeServiceMainPage from "./pages/AreaWeServiceMainPage";
import ServiceListMainPage from "./pages/ServiceListMainPage";
import EmergencyMainPage from "./pages/EmergencyMainPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import LoginPage from "./pages/LoginPage";
import CheckoutMainPage from "./pages/CheckoutMainPage";


function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen font-roboto">
          <main>
            <ScrollToTop />
            <Toaster position="top-center" reverseOrder={false} />
            <CartModal/>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/search" element={<SearchResultsPage/>} />
              <Route path="/about" element={<AboutPage/>} />
              <Route path="/contact" element={<ContactPage/>} />
              <Route path="/emergency" element={<EmergencyMainPage/>} />
              <Route path="/areas" element={<AreaWeServiceMainPage/>} />
              
              <Route path="/services/:subcategorySlug" element={<ServiceMainPage/>} />
              <Route path="/services-list/:itemId" element={<ServiceListMainPage/>} />
              <Route path="/service-details/:itemId/:entryId" element={<ServiceDetailMainPage/>} />
              <Route path="/checkout" element={<CheckoutMainPage/>} />
              <Route path="/account" element={<LoginPage/>} />

            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
