import React, { useEffect, useState } from "react";
import axios from "../../api/api";
import { useInView } from "react-intersection-observer";
import CallBanner from "./CallBanner";

const About = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/about/")
      .then((res) => setData(res.data[0]))
      .catch((err) => console.log(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  const Section = ({ imageLeft, image, title, text, extraParagraphGap }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    // Split text into paragraphs
    const paragraphs = text.split("\n").filter((p) => p.trim() !== "");

    return (
      <div
        ref={ref}
        className={`flex flex-col md:flex-row gap-6 my-12 items-center transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {imageLeft && (
          <img
            src={image}
            alt={title}
            className="w-full md:w-1/2 max-h-96 object-cover rounded-lg"
          />
        )}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <div className={extraParagraphGap ? "space-y-1" : "space-y-1"}>
            {paragraphs.map((p, i) => (
              <p key={i} className="leading-normal">
                {p}
              </p> // adjust leading here
            ))}
          </div>
        </div>
        {!imageLeft && (
          <img
            src={image}
            alt={title}
            className="w-full md:w-1/2 max-h-96 object-cover rounded-lg"
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Section 1 */}
        <div className="text-left mb-12">
          <h1 className="text-3xl font-bold text-orange-600 mb-4">
            {data.main_title}
          </h1>
          {data.main_text.split("\n").map((p, i) => (
            <p key={i} className="mb-1 leading-snug">
              {p}
            </p>
          ))}
        </div>

        {/* Section 2 - extra gap between paragraphs */}
        <Section
          imageLeft={true}
          image={data.section2_image}
          title={data.section2_title}
          text={data.section2_text}
          extraParagraphGap={true} // <-- adds extra spacing
        />

        {/* Section 3 */}
        <Section
          imageLeft={false}
          image={data.section3_image}
          title={data.section3_title}
          text={data.section3_text}
        />

        {/* Section 4 */}
        <Section
          imageLeft={true}
          image={data.section4_image}
          title={data.section4_title}
          text={data.section4_text}
        />
      </div>

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
    </>
  );
};

export default About;
