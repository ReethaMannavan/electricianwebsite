import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useInView } from "react-intersection-observer";
import api from "../../api/api"; // centralized axios instance
import TwoColumnSection from "./TwoColumnSection";
import EmergencySignsSection from "./EmergencySignsSection";
import CallBanner from "../about/CallBanner";

// ✅ Yup Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Too short"),
  mobile: yup
    .string()
    .required("Mobile is required")
    .matches(/^[0-9]+$/, "Digits only")
    .min(10, "Too short")
    .max(15, "Too long"),
  email: yup.string().email("Invalid email").required("Email is required"),
  service: yup.string().required("Please select a service"),
});

export default function EmergencyElectrician() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Fetch data
  useEffect(() => {
    api
      .get("/emergency/")
      .then((res) => {
        setPageData(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Submit form
  const onSubmit = async (data) => {
    try {
      await api.post("/emergency/contact/", data);
      setSubmitted(true);
      reset();
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="emergency-wrapper">
      {/* === First Section (Hero) === */}
      <section className="emergency-hero w-full h-[400px] md:h-[500px] relative">
        <img
          src={pageData.hero_image}
          alt="Emergency Hero"
          className="w-full h-full object-cover"
        />
      </section>

      {/* === Second Section === */}
      <section className="emergency-second max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Side */}
        <div
          ref={ref}
          className={`emergency-left transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl font-bold mb-3">{pageData.title}</h2>
          <p className="mb-3 text-gray-700">{pageData.description}</p>
          <p className="mb-2 text-yellow-600 font-semibold">
            ⭐⭐⭐⭐⭐ {pageData.rating} 
          </p>
           <p className="mb-2 text-orange-500 font-semibold">
             Over {pageData.reviews_count} google reviews
          </p>

          <div className="flex flex-row gap-12 items-center">
            {pageData.support_image && (
            <img
              src={pageData.support_image}
              alt="Support"
              className="w-40 h-32 object-cover mb-3"
            />
          )}
          <a
            href={`tel:${pageData.phone_number}`}
            className="inline-block bg-orange-600 text-white px-4 py-2 w-[250px] h-[50px] text-center rounded-lg hover:bg-orange-700"
          >
            Call: {pageData.phone_number}
          </a>
          </div>
          
        </div>

        {/* Right Side (Form) */}
        <div className="emergency-form bg-blue-700 text-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-2">{pageData.form_title}</h3>
          <p className="mb-4 text-sm">{pageData.form_text}</p>

          {submitted && (
            <p className="bg-green-500 text-white p-2 mb-3 rounded">
              ✅ Your request has been sent successfully!
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                className="w-full p-2 rounded text-black"
              />
              {errors.name && (
                <p className="text-red-300 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Mobile"
                {...register("mobile")}
                className="w-full p-2 rounded text-black"
              />
              {errors.mobile && (
                <p className="text-red-300 text-sm">{errors.mobile.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email address"
                {...register("email")}
                className="w-full p-2 rounded text-black"
              />
              {errors.email && (
                <p className="text-red-300 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <select
                {...register("service")}
                className="w-full p-2 rounded text-black"
              >
                <option value="">Select a service</option>
                {/* if using subcategories dynamic */}
                {pageData.subcategories
                  ? pageData.subcategories.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))
                  : ["commercial Services", "Residential Services", "Lighting"].map((s, i) => (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    ))}
              </select>
              {errors.service && (
                <p className="text-red-300 text-sm">{errors.service.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 p-2 rounded text-white font-bold"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* === Third Section (Why Choose Us) === */}
      <div>
        <h1 className="m-4 mx-28 font-bold">Why Choose Our Electrician?</h1>
      </div>

      <section className="emergency-third max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
        {pageData.features && pageData.features.length > 0 ? (
          pageData.features.map((feature, index) => (
            <div
              key={feature.id}
              className={`emergency-card-${
                index + 1
              } bg-white rounded-2xl shadow-lg border border-[#CD3A00] p-6 text-center`}
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-12 h-12 mx-auto mb-4"
              />

              <p className="text-black text-sm">{feature.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No features available.
          </p>
        )}
      </section>
      <TwoColumnSection/>

      <div>
        <CallBanner
          text={
            <>
              Get in Touch with 
              Electric Dreams <br /> Electrical Today
            </>
          }
        />
      </div>
      <EmergencySignsSection/>
    </div>
  );
}
