
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../../api/api";
// import { useCart } from "../context/CartContext";

// export default function ServiceDetailPage() {
//   const { itemId, entryId } = useParams();
//   const [item, setItem] = useState(null);
//   const [phone, setPhone] = useState("");
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchItemAndPhone = async () => {
//       try {
//         const [itemRes, phoneRes] = await Promise.all([
//           axios.get(`/service-items/${itemId}/`),
//           axios.get("/siteconfig/"),
//         ]);
//         setItem(itemRes.data);
//         setPhone(phoneRes.data.phone);
//       } catch (err) {
//         console.error("Failed to fetch service detail or phone", err);
//       }
//     };
//     fetchItemAndPhone();
//   }, [itemId]);

//   if (!item) return null;

//   const entry = item.list_entries.find((e) => e.id === parseInt(entryId));
//   if (!entry) return <p className="text-center py-20">Service not found.</p>;

//   return (
//     <>
//       <p className="text-black mt-10 ml-20 text-lg font-bold">{item.title}</p>
  
//     <div className="max-w-6xl mx-auto py-8 px-4 mt-10 md:flex md:gap-12 border-2 border-black rounded-2xl">
       
//       {/* Left: Image + Details */}
//       <div className="md:flex-1 flex items-center gap-6">
//         <img
//           src={entry.image}
//           alt={entry.title}
//           className="w-28 h-28 object-cover rounded-xl shadow mb-6"
//         />
//         <div>
//    <h1 className="text-3xl font-bold mb-2">{entry.title}</h1>
//         <p className="text-sm text-gray-600 mb-1">⭐ {entry.reviews} reviews</p>
//         <p className="text-gray-800 font-semibold mb-4">
//           ₹{entry.price} 
//         </p>
//         <p className="text-gray-800 font-semibold mb-4">
//          • {entry.duration} 
//         </p>
//         </div>
     
       
//       </div>

//       {/* Right: Cart + Call */}
//       <div className="md:w-[280px] mt-6 md:mt-0 flex flex-col gap-4 mr-8">
//         <button
//           className="w-full bg-[#E25C26] text-white py-3 rounded-[30px] font-semibold hover:bg-[#CD3A00]"
//           onClick={() => addToCart({
//             id: entry.id,
//             title: entry.title,
//             price: entry.price,
//             quantity: 1
//           })}
//         >
//           Add to Cart
//         </button>
//         <div className="text-center text-white bg-[#E25C26] border border-gray-200 rounded-[30px] py-3">
     
//           <span className="font-semibold">{phone}</span>
//         </div>
//       </div>
//     </div>
//       </>
//   );
// }


// src/pages/ServiceDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import ProcessandTechnicians from "./ProcessandTechnicians";
import FAQ from "../home/FAQ";
import TestimonialsSection from "../home/TestimonialSection";

export default function ServiceDetailPage() {
  const { itemId, entryId } = useParams();
  const [item, setItem] = useState(null);
  const [phone, setPhone] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemAndPhone = async () => {
      try {
        const [itemRes, phoneRes] = await Promise.all([
          axios.get(`/service-items/${itemId}/`),
          axios.get("/siteconfig/"),
        ]);
        setItem(itemRes.data);
        setPhone(phoneRes.data.phone);
      } catch (err) {
        console.error("Failed to fetch service detail or phone", err);
      }
    };
    fetchItemAndPhone();
  }, [itemId]);

  if (!item) return null;

  const entry = item.list_entries.find((e) => e.id === parseInt(entryId));
  if (!entry) return <p className="text-center py-20">Service not found.</p>;

  const handleAddToCart = async () => {
    try {
      await addToCart(entry.id, 1);
      toast.success("Added to cart!");
    } catch (err) {
      // Show battery-style toast and redirect
      toast.custom((t) => (
        <div
          className={`bg-[#F65616] text-white px-4 py-3 rounded-md shadow-lg flex flex-col w-80 ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <span className="font-semibold">You are not logged in!</span>
          <span className="text-sm mt-1">Redirecting to login...</span>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded">
            <div
              className="h-2 bg-white rounded"
              style={{
                width: "100%",
                animation: "shrink 3s linear forwards",
              }}
            />
          </div>
        </div>
      ));

      // CSS animation for the shrinking bar
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `;
      document.head.appendChild(style);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/account"); // your login page route
      }, 3000);
    }
  };

  return (
    <>
      <p className="text-black mt-10 ml-20 text-lg font-bold">{item.title}</p>

      <div className="max-w-6xl mx-auto py-8 px-4 mt-10 md:flex md:gap-12 border-2 border-black rounded-2xl">
        {/* Left: Image + Details */}
        <div className="md:flex-1 flex items-start gap-6">
          <img
            src={entry.image}
            alt={entry.title}
            className="w-28 h-28 object-cover rounded-xl shadow"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{entry.title}</h1>
            <p className="text-sm text-gray-600 mb-1">⭐ {entry.reviews} reviews</p>
            <p className="text-gray-800 font-semibold mb-1">₹{entry.price}</p>
            <p className="text-gray-800 font-semibold mb-1">{entry.duration}</p>
          </div>
        </div>

        {/* Right: Cart + Call */}
        <div className="md:w-[280px] mt-6 md:mt-0 flex flex-col gap-4 mr-8">
          <button
            className="w-full bg-[#E25C26] text-white py-3 rounded-[30px] font-semibold hover:bg-[#CD3A00]"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <div className="text-center text-white bg-[#E25C26] border border-gray-200 rounded-[30px] py-3">
            <span className="font-semibold">{phone}</span>
          </div>
        </div>
      </div>

      <ProcessandTechnicians/>
      <FAQ/>
      <TestimonialsSection/>
    </>
  );
}
