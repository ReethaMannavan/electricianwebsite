import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    api.get("/footer/")
      .then((res) => setFooterData(res.data))
      .catch((err) => console.error("Error fetching footer:", err));
  }, []);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  // Intersection observers for each column
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <footer className="bg-[#E25C26] text-white font-lato py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1 - Logo + Description + Socials */}
        <motion.div
          ref={ref1}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          variants={fadeUp}
          className="space-y-4 unique-footer-col1"
        >
          {footerData?.logo && (
            <img
              src={footerData.logo}
              alt="Company Logo"
              className="w-28 object-contain"
            />
          )}
          <p className="text-sm">{footerData?.description}</p>
          <div className="flex space-x-4">
            {footerData?.instagram_url && (
              <a
                href={footerData.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200"
              >
                <Instagram size={20} />
              </a>
            )}
            {footerData?.google_url && (

<a
  href={footerData.google_url}
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-gray-200"
>
  <SiGoogle size={20} className="text-white" />
</a>


            )}
          </div>
        </motion.div>

        {/* Column 2 - Services */}
        <motion.div
          ref={ref2}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={fadeUp}
          className="space-y-2 unique-footer-col2"
        >
          <h3 className="font-bold mb-2">Services</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/services/commercial-services" className="hover:underline">Lighting</Link></li>
            <li><Link to="/services/commercial-services" className="hover:underline">Private Power Poles</Link></li>
            <li><Link to="/services/commercial-services" className="hover:underline">Smoke Alarms</Link></li>
            <li><Link to="/services/commercial-services" className="hover:underline">EV Chargers</Link></li>
            <li><Link to="/services/residential-services" className="hover:underline">Air Conditioning</Link></li>
            <li><Link to="/services/residential-services" className="hover:underline">Thermographic Imaging</Link></li>
            <li><Link to="/services/commercial-services" className="hover:underline">View All</Link></li>
          </ul>
        </motion.div>

        {/* Column 3 - Company */}
        <motion.div
          ref={ref3}
          initial="hidden"
          animate={inView3 ? "visible" : "hidden"}
          variants={fadeUp}
          className="space-y-2 unique-footer-col3"
        >
          <h3 className="font-bold mb-2">Company</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/areas" className="hover:underline">Service Areas</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/contact" className="hover:underline">Reviews</Link></li>
            <li><Link to="/emergency" className="hover:underline">Resources</Link></li>
            <li><Link to="/contact" className="hover:underline">Sitemap</Link></li>
          </ul>
        </motion.div>

        {/* Column 4 - Get in Touch */}
        <motion.div
          ref={ref4}
          initial="hidden"
          animate={inView4 ? "visible" : "hidden"}
          variants={fadeUp}
          className="space-y-3 unique-footer-col4"
        >
          <h3 className="font-bold mb-2">Get in Touch</h3>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin size={18} />
            <span>{footerData?.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Phone size={18} />
            <span>{footerData?.phone_number}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Mail size={18} />
            <span>{footerData?.email}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
