import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api/api";
import toast from "react-hot-toast";

// validation schema
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

const schema = yup.object({
  first_name: yup.string()
    .matches(nameRegex, "Invalid name")
    .required("First name is required"),
  last_name: yup.string()
    .matches(nameRegex, "Invalid name")
    .required("Last name is required"),
  phone: yup.string()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().max(255, "Address too long"),
  message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

export default function ContactNewLayout() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // fetch contact page content
  useEffect(() => {
    api.get("/contact/")
      .then(res => setPageData(res.data))
      .catch(() => setFetchError("Failed to load contact info"));
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/contact/messages/", data);
      toast.success("Message sent successfully!", { duration: 3000 });
      reset();
    } catch (err) {
      setFetchError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-[#E25C26] mt-10">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left side: contact info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Get in Touch</h2>
          <h2 className="text-xl font-bold mb-4 text-white">Contact Electric Dreams</h2>
          {fetchError && <p className="text-red-500">{fetchError}</p>}

          {pageData?.info_blocks?.length ? (
            pageData.info_blocks.map(block => (
              <div key={block.id} className="flex items-center border rounded-xl p-4 shadow-sm bg-white">
                {block.icon && (
                  <img
                    src={block.icon}
                    alt={block.title}
                    className="w-12 h-12 mr-4 object-contain"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{block.title}</h3>
                  {block.subtitle && <p className="text-sm text-[#F65616]">{block.subtitle}</p>}
                  <p className="text-orange-600">{block.detail}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No contact info available</p>
          )}
        </div>

        {/* Right side: contact form */}
        <div className="border rounded-xl p-6 shadow-md bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold">First Name</label>
                <input {...register("first_name")} className="w-full border border-black p-2 rounded" />
                {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold">Last Name</label>
                <input {...register("last_name")} className="w-full border border-black  p-2 rounded" />
                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold">Phone Number</label>
                <input {...register("phone")} className="w-full border border-black p-2 rounded" />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold">Email Address</label>
                <input {...register("email")} className="w-full border border-black  p-2 rounded" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold">Address (optional)</label>
              <input {...register("address")} className="w-full border border-black  p-2 rounded" />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold">How can we help?</label>
              <textarea {...register("message")} className="w-full border border-black  p-2 rounded h-28" />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-[#E25C26] text-white font-semibold rounded-full hover:bg-[#CD3A00] disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
