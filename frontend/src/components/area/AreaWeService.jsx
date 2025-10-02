import { useEffect, useState } from "react";
import api from "../../api/api";

export default function AreasWeService() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    api.get("/areas/")
      .then((res) => setAreas(res.data))
      .catch((err) => console.error("Error fetching areas:", err));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#E25C26]">
          Areas We Service
        </h2>
        <p className="text-center text-black text-lg mt-2 max-w-5xl mx-auto">
          Below are some areas we provide electrical services to. But, don’t worry if your area is not listed, we likely service your area too!
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {areas.map((area) => (
            <div
              key={area.id}
              className="border border-gray-200 rounded-md text-md text-black shadow-sm bg-[#D9D9D980] text-center py-3 font-medium hover:bg-[#F65616] hover:text-white transition duration-200"
            >
              {area.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
