

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../api/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import CallBanner from "../about/CallBanner";

export default function ServiceListPage() {
  const { itemId } = useParams(); // subitem ID
  const [item, setItem] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`/service-items/${itemId}/`);
        setItem(res.data);
      } catch (err) {
        console.error("Failed to fetch service item", err);
      }
    };
    fetchItem();
  }, [itemId]);

  if (!item) return null;

  const handleAddToCart = async (entryId) => {
    try {
      await addToCart(entryId, 1);
    } catch (err) {
      // Add-to-cart failed (unauthorized)
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
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `;
      document.head.appendChild(style);
      setTimeout(() => {
        window.location.href = "/account"; // redirect after 3s
      }, 3000);
    }
  };

  return (
    <div className="w-full">
      {/* Orange Banner */}
      {item.banner && (
        <div className="bg-[#CD3A00CC] mt-12 m-4 text-white px-4 py-8 flex items-center justify-center gap-12 shadow-lg">
          <h2 className="text-xl font-bold">{item.banner.title}</h2>
          <p className="max-w-md text-2xl">{item.banner.description}</p>
        </div>
      )}

      {/* Service list entries */}
      <div className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {item.list_entries.map((entry) => (
          <div
            key={entry.id}
            className="flex justify-between items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition relative border border-black"
          >
            {/* Left section */}
            <div>
              <h3 className="text-xl font-semibold">{entry.title}</h3>
              <p className="text-sm text-gray-600">
                ⭐ {entry.reviews} reviews
              </p>
              <p className="text-gray-800 font-semibold mt-1">
                ₹{entry.price} • {entry.duration} mins
              </p>
              <Link
                to={`/service-details/${itemId}/${entry.id}`}
                className="inline-block mt-3 text-[#E25C26] font-medium hover:underline"
              >
                View details 
              </Link>
            </div>

            {/* Right section: image + Add button */}
            <div className="relative flex flex-col items-center">
              <img
                src={entry.image}
                alt={entry.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <button
                className="mt-3 bg-[#E25C26] text-white px-4 py-2 rounded-full shadow hover:bg-[#CD3A00] font-semibold"
                onClick={() => handleAddToCart(entry.id)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <CallBanner
          text={
            <>
              Get in Touch with Electric Dreams <br /> Electrical Today
            </>
          }
        />
      </div>
    </div>
  );
}
