import React, { useEffect, useState } from "react";
import axios from "../../api/api"; // centralized axios with base URL
import { useInView } from "react-intersection-observer";

const TestimonialsSection = () => {
  const [section, setSection] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;

  // Fetch section + testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("/testimonial-sections/");
        if (res.data.length > 0) setSection(res.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTestimonials();
  }, []);

  if (!section) return null;

  const { title, description, testimonials } = section;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  const handleNext = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  const startIdx = currentPage * cardsPerPage;
  const currentTestimonials = testimonials.slice(startIdx, startIdx + cardsPerPage);

  return (
    <section className="py-12 px-4 bg-[#0056B3]">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="mt-4 text-white">{description}</p>
      </div>

      {/* Testimonials Grid */}
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
          {currentTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Render stars
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < testimonial.stars ? "text-yellow-400" : "text-gray-300"}>
      ★
    </span>
  ));

  return (
  
   
    <div
      ref={ref}
      className={`flex flex-col h-full p-6 bg-white rounded-xl shadow-lg transition-transform duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Star Rating */}
      <div className="flex mb-4">{stars}</div>

      {/* Testimonial Text */}
      <p className="text-black mb-4 flex-grow">{testimonial.testimonial_text}</p>

      {/* Name + Short Text */}
      <div className="flex items-center mt-auto">
        <img
          src={testimonial.profile_image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <p className="font-semibold text-black">{testimonial.name}</p>
          <p className="text-black text-sm">{testimonial.short_text}</p>
        </div>
      </div>
    </div>
 
  );
};

export default TestimonialsSection;
