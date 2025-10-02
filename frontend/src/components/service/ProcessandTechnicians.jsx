import { ShieldCheck, Wrench, Award } from "lucide-react";
import detail from '../../assets/images/detail.jpg'

export default function ProcessandTechnicians() {
  return (
    <section className="w-full bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Our Process */}
       {/* Left - Our Process */}
<div className="bg-[#0056B3] text-white rounded-2xl shadow-lg p-8">
  <h2 className="text-2xl font-bold mb-6">Our Process</h2>
  <div className="space-y-6 relative">
    {[
      {
        step: "Inspection",
        desc: "We will check the space where you want to install the holder",
      },
      {
        step: "Installation",
        desc: "We will install the holder with care",
      },
      {
        step: "Cleanup",
        desc: "We will clean the area once work is done",
      },
      {
        step: "Warranty activation",
        desc: "The service is covered by a 30-day warranty for any issues after installation",
      },
    ].map((item, index, arr) => (
      <div key={index} className="flex items-start gap-4 relative">
        {/* Number circle */}
        <div className="relative flex flex-col items-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#0056B3] font-bold z-10">
            {index + 1}
          </div>
          {/* Vertical line (not for last item) */}
          {index < arr.length - 1 && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[2px] h-full bg-white/50"></div>
          )}
        </div>

        {/* Text */}
        <div>
          <h3 className="font-semibold">{item.step}</h3>
          <p className="text-sm">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>


        {/* Right - Top Technicians */}
        <div className="bg-[#0056B3] text-white rounded-2xl shadow-lg flex flex-col md:flex-row">
          {/* Left content */}
          <div className="p-8 flex flex-col justify-center flex-1">
            <h2 className="text-2xl font-bold mb-6">Top technicians</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-white" />
                <span>Background verified</span>
              </li>
              <li className="flex items-center gap-3">
                <Wrench className="w-6 h-6 text-white" />
                <span>Trained across all major brands</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-6 h-6 text-white" />
                <span>Certified under skill India programme</span>
              </li>
            </ul>
          </div>

          {/* Right image */}
          <div className="md:w-1/2 w-full">
            <img
              src={detail}
              alt="Technician"
              className="h-full w-full object-cover rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
