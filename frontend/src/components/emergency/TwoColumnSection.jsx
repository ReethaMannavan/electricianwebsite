import emergency from '../../assets/images/emergency.jpg'

export default function TwoColumnSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* Left Column */}
        <div className="w-full lg:w-3/5 bg-[#0056B3CC] text-white p-8 flex flex-col justify-center">
          <h2 className="text-xl lg:text-2xl font-bold mb-6 text-center">
            Quality Workmanship
          </h2>
          <div className="space-y-4 text-center lg:text-left">
            <p>
              At electrical dreams, we understand that electrical emergencies can happen at any time. Whether it’s a power outage, faulty wiring, sparking outlets, or an electrical hazard, our emergency electricians are ready to respond quickly to restore safety and functionality to your home or business.
              When you call us for an emergency electrical service, our licensed electricians will promptly assess the situation, identify the cause, and provide fast, effective repairs. We follow Australian safety standards and use high-quality equipment to resolve issues safely, preventing further risks or damage.
              Our lifetime workmanship warranty reflects our confidence in the reliability of our services. If you encounter electrical problems related to our repairs, we will be there to resolve them efficiently and professionally. Your safety is our top priority.
              Choose Adelaide Urban Electrical for reliable emergency electrical services and get the help you need—day or night. With our expert team, you can have peace of mind knowing your electrical issues will be resolved quickly and safely.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center lg:justify-start gap-4 mt-6">
            <button className="bg-[#E25C26] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#CD3A00] transition">
              Call Now
            </button>
            <button className="bg-[#E25C26] ml-auto text-white font-semibold py-2 px-6 rounded-full hover:bg-[#CD3A00] transition">
              Send a Message
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-2/5 h-full">
          <img
            src={emergency}
            alt="Right side"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
