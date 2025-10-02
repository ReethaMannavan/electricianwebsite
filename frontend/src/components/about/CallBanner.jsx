import React, { useEffect, useState } from "react";
import axios from "../../api/api";

const CallBanner = ({ text }) => {
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get("/siteconfig/") // use your centralized axios instance
      .then((res) => {
        setPhone(res.data.phone); // same as navbar
      })
      .catch((err) => {
        console.error("CallBanner fetch error:", err);
      });
  }, []);

  return (
    <div className="w-full bg-[#E25C26] text-white py-8 px-6 flex flex-col md:flex-row justify-between items-center rounded-lg my-6">
      <div className="text-2xl font-bold ml-32 text-center">{text}</div>
      {phone && (
        <div className="bg-white text-black font-semibold px-4 py-2 rounded-2xl mt-4 md:mt-0 mr-8">
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
      )}
    </div>
  );
};

export default CallBanner;
