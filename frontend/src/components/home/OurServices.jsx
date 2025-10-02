// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/autoplay";
// import { Autoplay } from "swiper/modules";
// import api from "../../api/api"; // your centralized axios instance

// const OurServices = () => {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await api.get("/homepage-services/");
//         setServices(response.data);
//       } catch (error) {
//         console.error("Error fetching homepage services:", error);
//       }
//     };
//     fetchServices();
//   }, []);

//   return (
//     <section className="ourservices-section py-12 bg-white">
//       {/* Title */}
//       <h2 className="text-center text-2xl font-bold mb-8 text-gray-800">
//         Our services
//       </h2>

//       {/* Carousel */}
//       <div className="max-w-6xl mx-auto px-4">
//         <Swiper
//           modules={[Autoplay]}
//           autoplay={{ delay: 0, disableOnInteraction: false }}
//           speed={2000}
//           loop={true}
//           spaceBetween={30}
//           slidesPerView={3}
//           breakpoints={{
//             640: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//         >
//           {services.map((service) => (
//             <SwiperSlide key={service.id}>
//               <div className="ourservices-card bg-[#0056B3] rounded-2xl overflow-hidden shadow-md h-full flex flex-col">
//                 {/* Image */}
//                 <div className="rounded-2xl overflow-hidden p-4">
//                   <img
//                     src={service.image}
//                     alt={service.title}
//                     className="w-full h-56 object-cover rounded-2xl"
//                   />
//                 </div>
//                 {/* Text */}
//                 <div className="p-4 flex flex-col flex-grow">
//                   <h3 className="text-lg font-semibold text-white mb-2">
//                     {service.title}
//                   </h3>
//                   <p className="text-sm text-gray-100 flex-grow">
//                     {service.description}
//                   </p>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Static Button */}
//       <div className="text-center mt-8">
//         <button className="ourservices-btn bg-[#E25C26] hover:bg-[#CD3A00] text-white font-semibold px-6 py-2 rounded-full shadow-md transition-colors">
//           View Services
//         </button>
//       </div>
//     </section>
//   );
// };

// export default OurServices;


import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import api from "../../api/api"; // your centralized axios instance

const OurServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/homepage-services/");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching homepage services:", error);
      }
    };
    fetchServices();
  }, []);

  // React Slick settings for smooth continuous scroll
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,        // continuous
    speed: 4000,             // adjust for scroll speed
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="ourservices-section py-12 bg-white">
      {/* Title */}
      <h2 className="text-center text-2xl font-bold mb-8 text-gray-800">
        Our services
      </h2>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto px-4">
        <Slider {...settings}>
          {services.map((service) => (
            <div key={service.id} className="px-2"> {/* keep spacing */}
              <div className="ourservices-card bg-[#0056B3] rounded-2xl overflow-hidden shadow-md h-full flex flex-col">
                {/* Image */}
                <div className="rounded-2xl overflow-hidden p-4">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-56 object-cover rounded-2xl"
                  />
                </div>
                {/* Text */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-100 flex-grow">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Static Button */}
      <div className="text-center mt-8">
        <button className="ourservices-btn bg-[#E25C26] hover:bg-[#CD3A00] text-white font-semibold px-6 py-2 rounded-full shadow-md transition-colors">
          View Services
        </button>
      </div>
    </section>
  );
};

export default OurServices;
