import React, { useEffect, useState } from "react";
import axios from "../../api/api"; // your centralized axios instance
import { useInView } from "react-intersection-observer";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    axios.get("/faqs/")
      .then(res => setFaqs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section 
      ref={ref} 
      className={`max-w-3xl mx-auto px-4 py-12 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Everything you need to know about our services.
      </p>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div 
            key={faq.id} 
            className="bg-gray-100 rounded-xl p-4 shadow-sm"
          >
            <h3 className="font-semibold text-lg mb-1">
              {faq.question}
            </h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
