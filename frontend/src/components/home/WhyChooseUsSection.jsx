import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import api from "../../api/api"; // your centralized axios instance

export default function WhyChooseUsSection() {
  const [sectionData, setSectionData] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    api
      .get("/why-choose-us/")
      .then((res) => {
        if (res.data.length > 0) {
          setSectionData(res.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!sectionData) return null;

  return (
    <section ref={ref} className="bg-[#0056B3] overflow-x-hidden mb-10">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-2 -ml-8"
        >
          {sectionData.images.map((img) => (
            <motion.img
              key={img.id}
              src={img.image}
              alt="Why Choose Us"
              className="shadow-md object-cover w-full h-[300px]"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            />
          ))}
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Paragraph */}
          <p className="text-lg text-white mb-8">{sectionData.paragraph}</p>

          {/* Cards */}
          {/* Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {sectionData.cards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + idx * 0.2 }}
                className="bg-white shadow-md p-6 flex flex-col items-start border hover:shadow-lg transition"
              >
                {/* Icon */}
                {/* Icon + Number in one row */}
                <div className="flex items-center gap-3 mb-2">
                  {card.icon && (
                    <img
                      src={card.icon}
                      alt={card.small_description}
                      className="w-10 h-10"
                    />
                  )}
                  <h3 className="text-2xl font-bold text-[#E25C26]">
                    {card.number_title}
                  </h3>
                </div>

                {/* Small description */}
                <span className="text-md font-bold text-black mt-1">
                  {card.small_description}
                </span>

                {/* Content */}
                <p className="text-black mt-2">{card.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
