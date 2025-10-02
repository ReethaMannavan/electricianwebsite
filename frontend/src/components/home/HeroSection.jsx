import { useEffect, useState } from "react";
import api from "../../api/api";

const HeroSection = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    api.get("/hero-section/")
      .then((res) => setHero(res.data))
      .catch((err) => console.error("Error fetching hero section:", err));
  }, []);

  if (!hero) return null; // or a loading spinner

  return (
    <section className="relative flex flex-col items-center text-center mt-10 mb-10">
      {/* Image with background blob effect */}
      <div className="relative z-10">
        <img
          src={hero.image}
          alt="Hero"
          className="mx-auto relative z-10 w-[650px]"
        />
        {/* Blue blob background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-full bg-[#0056B3] rounded-[40%] -z-10" />
      </div>

      {/* Text Section */}
      <div className="bg-[#1f1f1f] text-white p-6 md:p-10 rounded-md shadow-lg mt-[-1rem] h-[180px] max-w-4xl mx-auto relative z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-[#E25C26] mb-4">
          {hero.heading}
        </h1>
        <p className="text-base md:text-lg leading-relaxed">
          {hero.description}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
