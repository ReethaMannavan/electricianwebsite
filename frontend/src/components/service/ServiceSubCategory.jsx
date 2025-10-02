
// src/pages/ServiceSubcategory.jsx
import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "../../api/api";
import ContactNewLayout from "./ServiceContact";

export default function ServiceSubcategory() {
  const { categoryPath } = useParams(); // use categoryPath from URL
  const [category, setCategory] = useState(null);



 const { subcategorySlug } = useParams();

useEffect(() => {
  setCategory(null);
  const fetchCategory = async () => {
    try {
      const res = await axios.get(`/service-categories/?path=/services/${subcategorySlug}`);
      if (res.data.length > 0) setCategory(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };
  fetchCategory();
}, [subcategorySlug]);


  if (!category) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Banner div */}
    {category.banner && (
  <div className="flex flex-col md:flex-row items-center justify-between bg-[#0056B3CC] p-6 rounded-xl mb-12 shadow ">
    
    {/* Left side (Text) */}
    <div className="w-full md:w-1/2 md:pr-8 text-center md:text-center ml-4">
      <h2 className="text-3xl font-bold text-white">{category.banner.title}</h2>
      <p className="text-white mt-4 text-lg">{category.banner.description}</p>
    </div>

    {/* Right side (Image) */}
    <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
      <img
        src={category.banner.image}
        alt={category.banner.title}
        className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-lg"
      />
    </div>
  </div>
)}


      {/* Grid of services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {category.items.map((item) => (
  <Link
    key={item.id}
    to={`/services-list/${item.id}`}
    className="relative block bg-[#0056B3] rounded-xl shadow hover:shadow-lg transition"
  >
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-48 object-fill rounded-lg mb-4"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
      <p className="text-white mt-2">{item.description}</p>
      <div className="absolute right-2 bottom-16 w-8 h-8 bg-white text-black text-xl flex items-center justify-center rounded-full hover:bg-orange-600 transition">
        →
      </div>
    </div>
  </Link>
))}

      </div>

     <ContactNewLayout/>
    </div>
  );
}
