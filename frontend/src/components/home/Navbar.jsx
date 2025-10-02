
// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "../service/CartModal";
import { useCart } from "../../components/context/CartContext";

export default function Navbar() {
  const [navConfig, setNavConfig] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

const { cart } = useCart();

  // inside Navbar.jsx
const [isCartOpen, setIsCartOpen] = useState(false);
const { setIsOpen } = useCart();
  

  // Get logged-in phone number from localStorage
  const [userPhone, setUserPhone] = useState(localStorage.getItem("user_phone"));

  // Fetch logo, phone, and services
  useEffect(() => {
    async function fetchNavConfig() {
      let base = import.meta.env.VITE_API_URL;
      if (base.endsWith("/")) base = base.slice(0, -1);

      try {
        const siteResp = await fetch(`${base}/siteconfig/`);
        if (!siteResp.ok) throw new Error(`siteconfig fetch failed: ${siteResp.status}`);
        const siteData = await siteResp.json();

        const svcResp = await fetch(`${base}/service-categories/?parent__isnull=true`);
        if (!svcResp.ok) throw new Error(`service-categories fetch failed: ${svcResp.status}`);
        const svcData = await svcResp.json();

        setNavConfig({
          logo_url: siteData.logo,
          phone: siteData.phone,
          services: svcData,
        });
      } catch (err) {
        console.error("Navbar fetch error:", err);
      }
    }

    fetchNavConfig();
  }, []);

  if (!navConfig) return null;

  const { logo_url, phone, services } = navConfig;

  const getLogoSrc = (logo) => {
    if (!logo) return null;
    if (logo.startsWith("http://") || logo.startsWith("https://")) return logo;
    const backendHost = import.meta.env.VITE_API_URL.split("/api")[0];
    return `${backendHost}${logo}`;
  };

  const handleSearchSubmit = (e) => {
   e.preventDefault();
  if (searchQuery.trim()) {
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery(""); // clear input
  } };

  const handleLogout = () => {
    localStorage.clear();
    setUserPhone(null);
    setAccountOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="navbar-root w-full">
      {/* Top Row */}
      <div className="navbar-top-row flex justify-between items-center px-4 py-2 bg-white">
        <div className="navbar-logo-wrapper">
          <Link to="/">
            {logo_url ? (
              <img src={getLogoSrc(logo_url)} alt="Logo" className="navbar-logo-img h-12 object-contain" />
            ) : (
              <span className="navbar-logo-placeholder">Your Logo</span>
            )}
          </Link>
        </div>
        <div className="navbar-top-info flex items-center space-x-4">
          <div className="navbar-phone-badge bg-[#F65616] text-white px-3 py-1 rounded-2xl">
            <span className="navbar-phone-text text-sm font-medium">{phone}</span>
          </div>
          <Link
            to="/contact"
            className="navbar-book-btn px-4 py-2 bg-white border border-[#F65616] text-[#F65616] rounded-2xl hover:bg-[#CD3A00]"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Main / Navigation Row */}
      <div className="navbar-main-row px-4 py-4 bg-[#E25C26] text-md">
        <div className="navbar-main-inner flex items-center justify-between">
          {/* Hamburger for mobile */}
          <button
            className="navbar-hamburger-btn md:hidden p-2 focus:outline-none"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>

          {/* Search Bar (desktop only) */}
          <div className="navbar-search-wrapper hidden md:block flex-1 px-4">
            <form onSubmit={handleSearchSubmit} className="navbar-search-form w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="navbar-search-input w-[350px] border rounded-2xl pl-10 pr-3 py-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>

          {/* Desktop navigation */}
          <nav className="navbar-menu hidden md:flex relative">
            <ul className="navbar-menu-list flex space-x-8 items-center text-md font-semibold">
              <li className="navbar-menu-item"><Link to="/" className="navbar-menu-link text-white">Home</Link></li>

              {/* Services with Mega Menu */}
              <li className="navbar-menu-item relative">
                <button
                  className="navbar-menu-link text-white flex items-center space-x-1 focus:outline-none"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  <span>Services</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Mega menu items */}
                

              

<ul
  className={`navbar-services-dropdown absolute left-[-250px] top-full mt-3 bg-[#CD3A00] shadow-lg ${
    servicesOpen ? "grid grid-cols-3 gap-6 p-6" : "hidden"
  } min-w-[800px] z-50`}
>
  {services.map((subcategory) => (
    <li key={`svc-col-${subcategory.id}`} className="navbar-mega-col">
      {/* Subcategory link - uses backend generated path */}
      <Link
        to={subcategory.path || "#"}
        className="font-semibold text-white mb-2 block hover:text-blue-600 text-lg"
        onClick={() => setServicesOpen(false)}
      >
        {subcategory.name}
      </Link>

      {/* Subitems -> use service-list page */}
      <ul className="space-y-1">
        {subcategory.items?.map((child) => (
          <li key={`svc-item-${child.id}`}>
            <Link
              to={`/services-list/${child.id}`}
              className="block text-white hover:text-blue-600 text-md"
              onClick={() => setServicesOpen(false)}
            >
              {child.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>



              </li>

              <li className="navbar-menu-item"><Link to="/emergency" className="navbar-menu-link text-white">Emergency electrician</Link></li>
              <li className="navbar-menu-item"><Link to="/about" className="navbar-menu-link text-white">About</Link></li>
              <li className="navbar-menu-item"><Link to="/contact" className="navbar-menu-link text-white">Contact</Link></li>
              <li className="navbar-menu-item"><Link to="/areas" className="navbar-menu-link text-white">Areas we services</Link></li>

              {/* Account dropdown */}
              <li className="navbar-menu-item relative">
                <span className="navbar-menu-link text-white cursor-pointer" onClick={() => setAccountOpen(!accountOpen)}>
                  Account ▼
                </span>
                {accountOpen && (
                  <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-md z-50 min-w-[180px]">
                    {userPhone ? (
                      <>
                        <li className="px-4 py-2 text-gray-700">{userPhone}</li>
                        <li>
                          <button
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link to="/account" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setAccountOpen(false)}>
                          Login / Sign Up
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>

         {/* <li className="navbar-menu-item">
  <button
    className="navbar-menu-link text-white"
    onClick={() => setIsOpen(true)}
  >
    Cart
  </button>
</li> */}

<li className="navbar-menu-item relative">
  <button
    className="navbar-menu-link text-white relative"
    onClick={() => setIsOpen(true)}
  >
    Cart
    {cart?.items?.length > 0 && (
      <span className="absolute -top-2 -right-3 bg-white text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
        {cart.items.length}
      </span>
    )}
  </button>
</li>

            </ul>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <nav className="navbar-mobile-menu md:hidden mt-2 bg-white border-t">
            <ul className="navbar-mobile-list flex flex-col">
              <li className="navbar-mobile-item"><Link to="/" className="navbar-mobile-link px-4 py-2" onClick={() => setIsMobileOpen(false)}>Home</Link></li>
              <li className="navbar-mobile-item">
                <span className="navbar-mobile-link px-4 py-2 flex justify-between items-center" onClick={() => setServicesOpen(!servicesOpen)}>
                  Services {servicesOpen ? "▲" : "▼"}
                </span>
                {servicesOpen && (
                  <ul className="navbar-mobile-services-list pl-4">
                    {services.map((subcategory) => (
                      <li key={`svc-col-${subcategory.id}`} className="mb-2">
                        <Link to={subcategory.path || "#"} className="font-semibold block" onClick={() => setIsMobileOpen(false)}>
                          {subcategory.name}
                        </Link>
                        <ul className="pl-2 space-y-1">
                          {subcategory.items?.map((child) => (
                            <li key={`svc-item-${child.id}`}>
                              <Link to={child.path || `${subcategory.path}/${child.id}`} className="block text-sm" onClick={() => setIsMobileOpen(false)}>
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="navbar-mobile-item"><Link to="/emergency" className="navbar-mobile-link px-4 py-2" onClick={() => setIsMobileOpen(false)}>Emergency electrician</Link></li>
              <li className="navbar-mobile-item"><Link to="/about" className="navbar-mobile-link px-4 py-2" onClick={() => setIsMobileOpen(false)}>About</Link></li>
              <li className="navbar-mobile-item"><Link to="/contact" className="navbar-mobile-link px-4 py-2" onClick={() => setIsMobileOpen(false)}>Contact</Link></li>
              <li className="navbar-mobile-item"><Link to="/areas" className="navbar-mobile-link px-4 py-2" onClick={() => setIsMobileOpen(false)}>Areas we services</Link></li>
              <li className="navbar-mobile-item relative">
                <span className="navbar-mobile-link px-4 py-2 flex justify-between items-center cursor-pointer" onClick={() => setAccountOpen(!accountOpen)}>
                  Account {accountOpen ? "▲" : "▼"}
                </span>
                {accountOpen && (
                  <ul className="pl-4 mt-1">
                    {userPhone ? (
                      <>
                        <li className="px-4 py-2">{userPhone}</li>
                        <li>
                          <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded" onClick={handleLogout}>
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link to="/account" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setAccountOpen(false)}>
                          Login / Sign Up
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            
<li className="navbar-menu-item relative">
  <button
    className="navbar-menu-link text-white relative"
    onClick={() => setIsOpen(true)}
  >
    Cart
    {cart?.items?.length > 0 && (
      <span className="absolute -top-2 -right-3 bg-white text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
        {cart.items.length}
      </span>
    )}
  </button>
</li>



            </ul>
          </nav>
        )}
      </div>
     <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

    </header>
  );
}
